
import { Category } from "@src/types/Category";
import _categories from "../assets/data/categories.json";

const categories = _categories as unknown as Record<Category, string[]>;

export default async function classifyPolicy(
    policy: string
): Promise<Record<Category, string[]>> {
    if (policy.trim() == "")
        throw new Error("Please input policy data to start classificiation");


    const terms: Record<Category, string[]> = {
        [Category.Tracking]: [],
        [Category.DataCollection]: [],
        [Category.ThirdPartySharing]: [],
        [Category.Surveillance]: [],
        [Category.UserContentAndRights]: [],
        [Category.DataRetention]: [],
        [Category.SecurityMeasures]: [],
        [Category.Cookies]: [],
        [Category.DataTransfers]: [],
        [Category.UserProfiling]: [],
        [Category.DataBreachNotification]: []
    };

    for (const [category, headings] of Object.entries(categories)) {
        const headingsInSentence = headings.filter((heading) =>
            policy.includes(heading)
        );

        terms[category] = headingsInSentence;
    }

    return terms;
}