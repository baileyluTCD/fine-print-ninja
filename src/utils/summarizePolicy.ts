import { summarizeText } from "text-summarizerly";

export default async function summarizePolicy(policy: string): Promise<string> {
    return summarizeText(policy);
}