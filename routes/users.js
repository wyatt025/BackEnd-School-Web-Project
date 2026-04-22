const express = require('express');
const { query } = require('../dbLogic/userDB');
const usersRouter = express.Router();
// const user = require('../models/user_model');

usersRouter.get("/", async (req, res) => {
    try {
        const result = await query('select * from test_users');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

usersRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await query(
            `SELECT * FROM test_users WHERE email = $1 AND password = $2`,
            [email, password]
        );

        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                email: user.email,
                fullname: `${user.firstname} ${user.lastname}`, 
                gender: user.gender,
                birthday: user.dob,
                username: user.username
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


usersRouter.get("/profile/:id", async (req, res) => {
    try {
        const userId = parseInt(req.params.id);

        const result = await query(
            `SELECT firstname, lastname, email, gender, dob FROM test_users WHERE id = $1`,
            [userId]
        );

        const user = result.rows[0];

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            username: `${user.firstname} ${user.lastname}`, 
            email: user.email,
            gender: user.gender || "Not set",
            birthday: user.dob || "Not set"
        });

    } catch (error) {
        console.error("PROFILE ERROR:", error);
        res.status(500).json({ error: error.message });
    }
});

usersRouter.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, dob, gender,userName ,email, password } = req.body;

        const role = "user";

        await query(
            `INSERT INTO test_users 
            (firstname, lastname, dob, gender, username, email, password, role) 
            VALUES ($1, $2, $3, $4, $5, $6, $7,$8)`,
            [firstName, lastName, dob, gender, userName, email, password, role]        
        );

        res.status(200).json({ message: "User created successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = { usersRouter };