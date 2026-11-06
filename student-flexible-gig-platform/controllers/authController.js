const db = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a new user
const register = async (req, res) => {
    try {
        const { name, email, phone, password, role } = req.body;

        // Check required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        // Check if email already exists
        const [existingUser] = await db.execute(
            "SELECT user_id FROM users WHERE email = ?",
            [email]
        );

        if (existingUser.length > 0) {
            return res.status(409).json({
                message: "Email is already registered"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        const [result] = await db.execute(
            `INSERT INTO users 
            (name, email, phone, password, role)
            VALUES (?, ?, ?, ?, ?)`,
            [
                name,
                email,
                phone || null,
                hashedPassword,
                role || "employee"
            ]
        );

        res.status(201).json({
            message: "User registered successfully",
            user_id: result.insertId
        });

    } catch (error) {
        console.error("Registration error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};
// Login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check required fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Find user by email
        const [users] = await db.execute(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const user = users[0];

        // Compare password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

      const token = jwt.sign(
    {
        user_id: user.user_id,
        email: user.email,
        role: user.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1d"
    }
);

res.status(200).json({
    message: "Login successful",
    token,
    user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
    }
});

    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    register,
     login
};