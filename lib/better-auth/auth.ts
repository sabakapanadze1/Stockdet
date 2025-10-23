// import { betterAuth } from "better-auth";
// import { mongodbAdapter} from "better-auth/adapters/mongodb";
// import { connectToDatabase} from "@/database/mongoose";
// import { nextCookies} from "better-auth/next-js";
// import { Db } from "mongodb";

// let authInstance: ReturnType<typeof betterAuth> | null = null;

// export const getAuth = async () => {
//     if(authInstance) return authInstance;

//     const mongoose = await connectToDatabase();
//     const db = mongoose.connection.db;

//     if(!db) throw new Error('MongoDB connection not found');

//     authInstance = betterAuth({
//         database: mongodbAdapter(db as Db),
//         secret: process.env.BETTER_AUTH_SECRET,
//         baseURL: process.env.BETTER_AUTH_URL,
//         emailAndPassword: {
//             enabled: true,
//             disableSignUp: false,
//             requireEmailVerification: false,
//             minPasswordLength: 8,
//             maxPasswordLength: 128,
//             autoSignIn: true,
//         },
//         plugins: [nextCookies()],
//     });

//     return authInstance;
// }

export const auth = await getAuth();

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectToDatabase } from "@/database/mongoose";
import { nextCookies } from "better-auth/next-js";
import type { Db } from "mongodb";

let authInstance: ReturnType<typeof betterAuth> | null = null;

export async function getAuth() {
  if (authInstance) return authInstance;

  const uri = process.env.MONGODB_URI;
  const secret = process.env.BETTER_AUTH_SECRET;
  const baseURL = process.env.BETTER_AUTH_URL;

  if (!uri || !secret || !baseURL) {
    throw new Error("Missing env: MONGODB_URI / BETTER_AUTH_SECRET / BETTER_AUTH_URL");
  }

  const mongoose = await connectToDatabase();
  const db = mongoose.connection.db as Db | undefined;
  if (!db) throw new Error("MongoDB connection not found");

  authInstance = betterAuth({
    database: mongodbAdapter(db),
    secret,
    baseURL,
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

  return authInstance;
}