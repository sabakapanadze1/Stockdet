'use server';

import {getAuth} from "@/lib/better-auth/auth";

import {headers} from "next/headers";
// import { inngest } from "../inngest/clinet";

export const signUpWithEmail = async ({ email, password, fullName, country, investmentGoals, riskTolerance, preferredIndustry }: SignUpFormData) => {
    try {
        const auth = await getAuth();
        const response = await auth.api.signUpEmail({ body: { email, password, name: fullName } })

        // if(response) {
        //     await inngest.send({
        //         name: 'app/user.created',
        //         data: { email, name: fullName, country, investmentGoals, riskTolerance, preferredIndustry }
        //     })
        // }

        return { success: true, data: response }
    } catch (e: unknown) {
        console.log('Sign up failed', e)
        throw e;
    }
}

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
    try {
        const auth = await getAuth();
        const response = await auth.api.signInEmail({ body: { email, password } })

        return { success: true, data: response }
    } catch (e) {
        console.log('Sign in failed', e)
        throw e;
    }
}

export const signOut = async () => {
    try {
        const auth = await getAuth();
        await auth.api.signOut({ headers: await headers() });
    } catch (e) {
        console.log('Sign out failed', e)
        return { success: false, error: 'Sign out failed' }
    }
}