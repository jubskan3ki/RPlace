const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    dateRegistered: {
        type: Date,
        default: Date.now,
    },
    isVerified: { type: Boolean, default: true },
});

// Avant d'enregistrer l'utilisateur, hachez le mot de passe pour des raisons de sécurité.
UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcryptjs.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model('User', UserSchema);
