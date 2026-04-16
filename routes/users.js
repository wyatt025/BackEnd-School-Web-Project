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
            `SELECT * FROM test_users WHERE email = $1 and password = $2`,
            [email, password]
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
                email: user.email
            }         
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

usersRouter.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, dob, gender, email, password } = req.body;

        const role = "user"; // default role

        await query(
            "INSERT INTO test_users (firstname, lastname, dob, gender, email, password, role) VALUES($1, $2, $3, $4, $5, $6, $7)",
            [firstName, lastName, dob, gender, email, password, role]
        );

        res.status(200).json({ message: "User created successful"});
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
});

module.exports = {usersRouter};