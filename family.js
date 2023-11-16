const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({
        headless: false,
        viewport: { width: 1920, height: 1080 },
    });
    const context = await browser.newContext();

    // Open new page
    const page = await context.newPage();
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Open urls
    let fs = require("fs");
    let urls = fs.readFileSync("urls.json", "utf8");
    urls = JSON.parse(urls)

    for (let url of urls.urls) {
        // goto url
        let family = url + "?code=rw";
        await page.goto(family);

        // Scrape data
        // let title = await page.locator('[class="inline title-n font26 serif"]').innerText();
        // let description = await page.locator('div.text-more').allInnerTexts();
        // let cover_images = page.locator('img.carousel-cell-image', { timeout: 9999 });
    }

    // save data in JSON
    const json = JSON.stringify(total_data);

    // save JSON to disk
    fs.writeFile("output.json", json, 'utf8', function(err) {
        if (err) {
            console.log(err);
        }
    });

    // ---------------------
    await context.close();
    await browser.close();
})();
