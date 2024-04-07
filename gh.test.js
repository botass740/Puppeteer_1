let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});

afterEach(() => {
  page.close();
});

/*describe("Github page tests", () => {
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    await page.waitForTimeout(1000);
    expect(title2).toMatch("Build");
  });

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    await page.waitForTimeout(1000);
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, { visible: true });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    await page.waitForTimeout(1000);
    expect(actual).toContain("Get started with Team");
  });
});*/

describe("Github page title tests", () => {
  test("The h1 title content'", async () => {
    await page.goto("https://github.com/features/actions");

    const link = await page.$("main div div a");
    await link.click();
    await page.waitForSelector("main h1");
    const title =
      "body > div.logged-out.env-production.page-responsive.overflow-x-hidden > div.application-main > main > div.overflow-x-hidden.overflow-y-hidden > div > div > div > div.col-12.text-center.text-lg-left.mx-auto.mx-lg-0.py-8.position-relative > h1";
    const actual = await page.$eval(title, (link) => link.textContent);
    expect(actual).toMatch("Automate your workflow");
  }, 10000);

  test("The second link attribute", async () => {
    await page.goto("https://github.com/solutions/ci-cd/");

    const links = await page.$$("a");
    expect(links.length).toBeGreaterThanOrEqual(2);

    const secondLink = links[1];
    const actual = await page.evaluate(
      (link) => link.getAttribute("href"),
      secondLink
    );
    expect(actual).toEqual("https://github.com/");
  });

  test("The h1 title content at the sponsor's page", async () => {
    await page.goto("https://github.com/sponsors");

    const link = await page.$("main div div a");
    await link.click();
    await page.waitForSelector("main h1");
    const title1 = await page.title();
    expect(title1).toMatch("GitHub Sponsors");
  }, 10000);
});
