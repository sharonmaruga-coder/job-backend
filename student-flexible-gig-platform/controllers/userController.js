const db = require("../config/database");

// Get logged-in user's profile
const getProfile = async (req, res) => {
    try {
        const [users] = await db.execute(
            `SELECT user_id, name, email, phone, role, created_at
             FROM users
             WHERE user_id = ?`,
            [req.user.user_id]
        );

        if (users.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "Profile retrieved successfully",
            user: users[0]
        });

    } catch (error) {
        console.error("Get profile error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    getProfile
};