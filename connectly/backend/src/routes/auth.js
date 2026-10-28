const express = require('express');
const bcrypt = require('bcryptjs');
const { sign } = require('../auth');
const { HttpError, str, CITIES, jitter } = require('../util');

module.exports = ({ db, ser, auth }) => {
  const r = express.Router();
  const byEmail = db.prepare('SELECT * FROM users WHERE email = ?');
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  r.post('/auth/register', (req, res) => {
    const name = str(req.body.name, { min: 2, max: 80, name: 'Name' });
    const email = str(req.body.email, { min: 1, max: 160, name: 'Email' }).toLowerCase();
    const password = str(req.body.password, { min: 6, max: 100, name: 'Password' });
    if (!emailRe.test(email)) throw new HttpError(400, 'Please enter a valid email address');
    if (byEmail.get(email)) throw new HttpError(409, 'An account with this email already exists. Please log in.');
    const city = CITIES[req.body.city] ? req.body.city : 'Chennai';
    const [lat, lng] = CITIES[city];
    const info = db
      .prepare('INSERT INTO users (name, email, password_hash, phone, city, lat, lng) VALUES (?,?,?,?,?,?,?)')
      .run(name, email, bcrypt.hashSync(password, 10), str(req.body.phone, { max: 20 }), city, jitter(lat), jitter(lng));
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(info.lastInsertRowid);
    res.status(201).json({ token: sign(user), user: ser.me(user) });
  });

  r.post('/auth/login', (req, res) => {
    const email = str(req.body.email, { min: 1, name: 'Email' }).toLowerCase();
    const user = byEmail.get(email);
    if (!user || !bcrypt.compareSync(String(req.body.password || ''), user.password_hash)) {
      throw new HttpError(401, 'Email or password is incorrect');
    }
    res.json({ token: sign(user), user: ser.me(user) });
  });

  r.get('/me', auth.required, (req, res) => res.json({ user: ser.me(req.user) }));

  r.patch('/me', auth.required, (req, res) => {
    const u = req.user;
    const b = req.body;
    const name = b.name !== undefined ? str(b.name, { min: 2, max: 80, name: 'Name' }) : u.name;
    const city = b.city !== undefined && CITIES[b.city] ? b.city : u.city;
    let { lat, lng } = u;
    if (city !== u.city) [lat, lng] = CITIES[city].map((v) => jitter(v));
    if (typeof b.lat === 'number' && typeof b.lng === 'number') ({ lat, lng } = b);
    db.prepare('UPDATE users SET name=?, phone=?, city=?, lat=?, lng=?, bio=?, interests=?, avatar=? WHERE id=?').run(
      name,
      b.phone !== undefined ? str(b.phone, { max: 20 }) : u.phone,
      city,
      lat,
      lng,
      b.bio !== undefined ? str(b.bio, { max: 300 }) : u.bio,
      b.interests !== undefined ? str(Array.isArray(b.interests) ? b.interests.join(',') : b.interests, { max: 200 }) : u.interests,
      b.avatar !== undefined ? str(b.avatar, { max: 300 }) : u.avatar,
      u.id,
    );
    res.json({ user: ser.me(db.prepare('SELECT * FROM users WHERE id = ?').get(u.id)) });
  });

  r.post('/me/password', auth.required, (req, res) => {
    if (!bcrypt.compareSync(String(req.body.currentPassword || ''), req.user.password_hash)) throw new HttpError(400, 'Current password is incorrect');
    const next = str(req.body.newPassword, { min: 6, max: 100, name: 'New password' });
    db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(bcrypt.hashSync(next, 10), req.user.id);
    res.json({ ok: true });
  });

  // Account deletion (required by app stores).
  r.delete('/me', auth.required, (req, res) => {
    if (!bcrypt.compareSync(String(req.body.password || ''), req.user.password_hash)) throw new HttpError(400, 'Password is incorrect');
    const id = req.user.id;
    db.exec('BEGIN');
    try {
      const mine = '(SELECT id FROM orders WHERE buyer_id = ? OR seller_id = ?)';
      db.prepare(`UPDATE reviews SET order_id = NULL WHERE order_id IN ${mine}`).run(id, id);
      db.prepare('DELETE FROM orders WHERE buyer_id = ? OR seller_id = ?').run(id, id);
      db.prepare('DELETE FROM users WHERE id = ?').run(id);
      db.exec('COMMIT');
    } catch (e) {
      db.exec('ROLLBACK');
      throw e;
    }
    res.json({ ok: true });
  });

  return r;
};
