import { inngest } from "@/lib/inngest/clinet";
import { sendSignUpEmail } from "@/lib/inngest/functions";
import {serve} from "inngest/next";



export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [sendSignUpEmail],
})