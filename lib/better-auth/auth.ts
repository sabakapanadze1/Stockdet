import { betterAuth } from "better-auth";
import { mongodbAdapter} from "better-auth/adapters/mongodb";
import { connectToDatabase} from "@/database/mongoose";
import { nextCookies} from "better-auth/next-js";
import { Db } from "mongodb";

let authInstance: ReturnType<typeof betterAuth> | null = null;

export const getAuth = async () => {
    if(authInstance) return authInstance;

    // Check if we're in a build environment
    const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.MONGODB_URI;
    
    if (isBuildTime) {
        // During build time, create auth instance without database
        authInstance = betterAuth({
            secret: process.env.BETTER_AUTH_SECRET || 'fallback-secret-for-build',
            baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
            emailAndPassword: {
                enabled: true,
                disableSignUp: false,
                requireEmailVerification: false,
                minPasswordLength: 8,
                maxPasswordLength: 128,
                autoSignIn: true,
            },
            plugins: [nextCookies()],
        });
    } else {
        // Runtime: connect to database
        const mongoose = await connectToDatabase();
        const db = mongoose.connection.db;

        if(!db) throw new Error('MongoDB connection not found');

        authInstance = betterAuth({
            database: mongodbAdapter(db as Db),
            secret: process.env.BETTER_AUTH_SECRET,
            baseURL: process.env.BETTER_AUTH_URL,
            emailAndPassword: {
                enabled: true,
                disableSignUp: false,
                requireEmailVerification: false,
                minPasswordLength: 8,
                maxPasswordLength: 128,
                autoSignIn: true,
            },
            plugins: [nextCookies()],
        });
    }

    return authInstance;
}