import {serve} from "inngest/next";

import {sendDailyNewsSummary, sendSignUpEmail} from "@/lib/inngest/functions";
import { inngest } from "@/lib/inngest/client";


export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [sendSignUpEmail, sendDailyNewsSummary],
})