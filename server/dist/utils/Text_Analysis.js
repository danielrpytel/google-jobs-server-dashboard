"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const goodKeywords = [
    "Javascript",
    "TypeScript",
    "NodeJS",
    "SQL",
    "Java",
    "Entry",
    "Junior",
    "AWS",
    "C#",
    "Testing",
];
const badKeywords = [
    "2+ years",
    "3+ years",
    "4+ years",
    "5+ years",
    "2 years",
    "3 years",
    "4 years",
    "5 years",
];
const badTitle = ["Senior", "Sr.", "Sr", "II", "III", "Lead"];
function filterAndGradeText(description, title) {
    // Check title for bad keywords;
    const hasBadTitleKeyword = badTitle.some((keyword) => title.toLocaleLowerCase().includes(keyword.toLowerCase()));
    if (hasBadTitleKeyword) {
        return "flagged";
    }
    // Process the description for keywords
    const tokens = description.toLowerCase().split(/\s+/);
    const goodKeywordCount = goodKeywords.filter((keyword) => tokens.includes(keyword.toLowerCase())).length;
    const badKeywordCount = badKeywords.filter((keyword) => tokens.includes(keyword.toLowerCase())).length;
    // Calculate the difference between count of good and bad keywords
    const keywordDifference = goodKeywordCount - badKeywordCount;
    // Decide the category based on the keyword difference
    if (keywordDifference > 0) {
        return "boosted";
    }
    else {
        return "flagged";
    }
}
exports.default = filterAndGradeText;
