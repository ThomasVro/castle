const puppeteer = require('puppeteer');
var fs = require('fs');
var JSON_file = [];
//We create a main in order to launch all the code that is inside
(async function main() {
    try {
        const browser = await puppeteer.launch({ headless: false })
        const page = await browser.newPage()

        await page.goto('https://www.relaischateaux.com/us/destinations/europe/france')

        await page.setViewport({ width: 1440, height: 752 })
        await page.waitForSelector('.hotelQuickView');

        const sections = await page.$$('.hotelQuickView');
        console.log('Récupération des hotels et restaurants');
        console.log(sections.length);

        for (const section of sections) {
            //We put the url's of all the stuffs we need
            const link = await section.$$eval('.mainTitle3 > a ', as => as.map(a => a.href));
            const name = await section.$eval('h3 > a > span', span => span.innerText);
            const restaurant = await section.$eval('span', span => span.innerText);
            var Price = -1;
            if (await section.$('div > div:nth-child(2) > div.priceTag > div > span.price > span.price') !== null) {
                Price = await section.$eval('div > div:nth-child(2) > div.priceTag > div > span.price > span.price', span => span.innerText);
            }
            if (restaurant === "Hotel + Restaurant") {
                console.log("{\"nom\":\"" + name + "\"," + "\"url\":\"" + link + "\"," + "\"genre\":\"" + restaurant + "\"," + "\"prix\":\"" + Price+ "\"}");
                JSON_file.push({ "nom": name, "url": link, "restaurant ": restaurant,"prix":Price })
            }
        }
        //The URL's of all pages are weird, they are dispatched with the following order
        var url_page_ = [2, 4, 5, 6, 7, 7, 8];
        //We go through all the pages 
        for (var i = 0; i < 7; i++) {
            await page.waitForSelector('#destinationResults > #destPagination > .pagination > li:nth-child(' + url_page_[i] + ') > a')
            await page.click('#destinationResults > #destPagination > .pagination > li:nth-child(' + url_page_[i] + ') > a')
            await page.waitFor(2000);
            await page.waitForSelector('.hotelQuickView');

            const sections = await page.$$('.hotelQuickView');
            console.log(sections.length);

            //We repeat the previous operations
            for (const section of sections) {
                const link = await section.$$eval('.mainTitle3 > a ', as => as.map(a => a.href));
                const name = await section.$eval('h3 > a > span', span => span.innerText);
                const restaurant = await section.$eval('span', span => span.innerText);
                var Price = -1;
                if (await section.$('div > div:nth-child(2) > div.priceTag > div > span.price > span.price') !== null) {
                    Price = await section.$eval('div > div:nth-child(2) > div.priceTag > div > span.price > span.price', span => span.innerText);
                }
                if (restaurant === "Hotel + Restaurant") {
                    console.log("{\"nom\":\"" + name + "\"," + "\"url\":\"" + link + "\"," + "\"genre\":\"" + restaurant + "\"," + "\"prix\":\"" + Price+ "\"}");
                    JSON_file.push({ "nom": name, "url": link, "restaurant ": restaurant,"prix":Price })

                }
            }
        }
        // We write the JSON file
        fs.writeFileSync("JSONFiles/restauHotel.json", JSON.stringify(JSON_file));


    }
    catch (e) { console.log("error"); }
})();