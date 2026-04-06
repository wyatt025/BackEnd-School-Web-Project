const express = require('express');
const { query } = require('../dbLogic/userDB');
const usersRouter = express.Router();

usersRouter.get("/", async (req, res) => {
    try {
        const result = await query('select * from test_users');
        const rows = result? result.rows : [];
        res.status(200).json(rows);
    } catch (error) {
        res.statusMessage = error;
        res.status(500).json({error: error});
    };
});

usersRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await query(
            `SELECT * FROM test_users WHERE email = $1`,
            [email]
        );

        const user = result?.rows?.[0];

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        if (user.password !== password) {
            return res.status(401).json({
                message: "Wrong password"
            });
        }

        res.status(200).json({
            message: "Login successful",
             user: {
                email: user.email,
                username: user.username
            }         
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = {usersRouter};