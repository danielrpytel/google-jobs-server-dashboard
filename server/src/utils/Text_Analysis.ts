const goodKeywords: string[] = [
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
const badKeywords: string[] = [
	"2+ years",
	"3+ years",
	"4+ years",
	"5+ years",
	"2 years",
	"3 years",
	"4 years",
	"5 years",
];
const badTitle: string[] = ["Senior", "Sr.", "Sr", "II", "III", "Lead"];

function filterAndGradeText(description: string, title: string): string {
	// Check title for bad keywords;
	const hasBadTitleKeyword: boolean = badTitle.some((keyword) =>
		title.toLocaleLowerCase().includes(keyword.toLowerCase())
	);

	if (hasBadTitleKeyword) {
		return "flagged";
	}

	// Process the description for keywords
	const tokens: string[] = description.toLowerCase().split(/\s+/);

	const goodKeywordCount: number = goodKeywords.filter((keyword) =>
		tokens.includes(keyword.toLowerCase())
	).length;
	const badKeywordCount: number = badKeywords.filter((keyword) =>
		tokens.includes(keyword.toLowerCase())
	).length;

	// Calculate the difference between count of good and bad keywords
	const keywordDifference: number = goodKeywordCount - badKeywordCount;

	// Decide the category based on the keyword difference
	if (keywordDifference > 0) {
		return "boosted";
	} else {
		return "flagged";
	}
}

export default filterAndGradeText;
