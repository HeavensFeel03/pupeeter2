const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const {
	Given,
	When,
	Then,
	Before,
	After,
	setDefaultTimeout,
} = require("cucumber");
const {
	clickElement,
	getText
} = require("../../lib/commands.js");

setDefaultTimeout(60000);

Before(async function() {
	const browser = await puppeteer.launch({
		headless: false,
		slowMo: 50
	});
	const page = await browser.newPage();
	this.browser = browser;
	this.page = page;
});

After(async function() {
	if (this.browser) {
		await this.browser.close();
	}
});

Given("User is on the {string} page", async function(string) {
	return await this.page.goto("https://qamid.tmweb.ru/client/index.php", {
		setTimeout: 60000,
	});
});


When("User chooses convenient time", async function() {
	return await clickElement(
		this.page,
		"body > main > section:nth-child(1) > div:nth-child(2) > ul > li:nth-child(3) > a"
	);
});
When("User books seat", async function() {
	await clickElement(this.page, "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(8) > span:nth-child(3)");
	return await clickElement(this.page, "body > main > section > button");
});

When("User books 2 seats", async function() {
	await clickElement(this.page, "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(6) > span:nth-child(4)");
	await clickElement(this.page, "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(6) > span:nth-child(5)");
	return await clickElement(this.page, "body > main > section > button");
});



When("User books taken seat", async function() {
	return await clickElement(this.page, "body > main > section > button");
});

Then("User can see text {string}", async function(string) {
	const actual = await getText(this.page, ".ticket__check-title");
	const expected = await string;
	expect(actual).contains(expected);
});

Then("Button {string} is disabled", async function(string) {
	const actualAttribtue = await this.page.$eval(
		"button.acceptin-button",
		(link) => link.getAttribute("disabled")
	);
	const actualText = await getText(this.page, "button.acceptin-button");
	expect(actualAttribtue).contain("true");
	expect(actualText).contain(string);
});