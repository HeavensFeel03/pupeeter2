const {
	clickElement,
	putText,
	getText
} = require("./lib/commands.js");
let page;

beforeEach(async () => {
	page = await browser.newPage();
	await page.goto("https://qamid.tmweb.ru/client/index.php");
});

afterEach(() => {
	page.close();
});


describe("Reserve Tests", () => {
	test("Reserve 1 seat", async () => {
		await clickElement(page, "body > main > section:nth-child(1) > div:nth-child(2) > ul > li:nth-child(3) > a");
		await page.waitForTimeout(1000);
		await clickElement(page, "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(8) > span:nth-child(3)");
		await page.waitForTimeout(1000);
		await clickElement(page, "body > main > section > button");
		await page.waitForTimeout(1000);
		const actual = await getText(page, "body > main > section > div > button");
		expect(actual).toContain("Получить код бронирования");

	}, 15000);

	test("Reserve 2 seats", async () => {
		await clickElement(page, "body > main > section:nth-child(1) > div:nth-child(2) > ul > li:nth-child(3) > a");
		await page.waitForTimeout(1000);
		await clickElement(page, "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(6) > span:nth-child(4)");
		await page.waitForTimeout(1000);
		await clickElement(page, "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(6) > span:nth-child(5)");
		await page.waitForTimeout(1000);
		await clickElement(page, "body > main > section > button");
		await page.waitForTimeout(1000);
		const actual = await getText(page, "body > main > section > div > button");
		expect(actual).toContain("Получить код бронирования");
	}, 15000);

	test("Reserve 1 seat for occupied", async () => {
		await clickElement(page, "body > main > section:nth-child(1) > div:nth-child(2) > ul > li:nth-child(3) > a");
		await page.waitForTimeout(1000);
		await clickElement(page, ".buying-scheme__chair_taken");
		await page.waitForTimeout(1000);
		const actual = await page.$eval(".acceptin-button", (link) =>
			link.getAttribute("disabled")
		);
		expect(actual).toEqual("true");

	}, 15000);

}, 100000);