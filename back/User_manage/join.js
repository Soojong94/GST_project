const { createPool } = require('../db');
const bcrypt = require('bcrypt');

const pool = createPool();

const handleDuplicateError = (results, user_id, user_nick, next) => {
    if (results[0].user_id === user_id) {
        return next(new Error('Duplicate ID'));
    } else if (results[0].user_nick === user_nick) {
        return next(new Error('Duplicate Nickname'));
    }
};

async function signupUser(req, res, next) {
    const { user_id, user_nick, user_phone, user_pw } = req.body;
    const hashedPassword = await bcrypt.hash(user_pw, 10);

    try {
        const [results] = await pool.query('SELECT * FROM users WHERE user_id = ? OR user_nick = ?', [user_id, user_nick]);

        if (results.length > 0) {
            return handleDuplicateError(results, user_id, user_nick, next);
        } else {
            const newUser = {
                user_id,
                user_nick,
                user_phone,
                user_pw: hashedPassword,
                joined_at: new Date(),
                clan: null,
            };
            await pool.query('INSERT INTO users SET ?', newUser);

            req.session.user = {
                user_id: newUser.user_id,
                user_nick: newUser.user_nick,
                joined_at: newUser.joined_at,
                clan: newUser.clan,
            };
            res.status(200).json({ message: 'Signup Successful' });
        }
    } catch (error) {
        return next(error);
    }
}

module.exports = { signupUser };