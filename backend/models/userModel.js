const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            trim: true,
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("User", userSchema);