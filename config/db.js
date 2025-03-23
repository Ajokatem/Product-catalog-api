const mongoose = require('mongoose');
require('dotenv').config(); // Ensures dotenv is loaded

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error("MONGO_URI is not defined in .env file");
        }

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 10, // Improves connection handling
            serverSelectionTimeoutMS: 5000, // Timeout for unavailable servers
        });

        console.log('✅ MongoDB Connected Successfully');

        // Debugging mode for development
        if (process.env.NODE_ENV === 'development') {
            mongoose.set('debug', true);
            console.log('🛠️ MongoDB Debugging Enabled');
        }

        // Connection event listeners
        mongoose.connection.on('connected', () => console.log('📡 MongoDB Connection Established'));
        mongoose.connection.on('error', (err) => console.error('❌ MongoDB Error:', err));
        mongoose.connection.on('disconnected', () => console.log('⚠️ MongoDB Disconnected'));

    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;


