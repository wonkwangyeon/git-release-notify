import 'dotenv/config'
import Parser from 'rss-parser'

const parser = new Parser({
});

let gitUrl = process.env.GIT_URL;
let gitUrlList=gitUrl.split("\n")

const getLatestRelease = async(url) => {
    try {
        console.log(url)
        let feed = await parser.parseURL(url+'.atom');

        //console.log(feed);

        feed.items.forEach(item => {
            console.log("----------------------------------------------------------")
            console.log(item.title)
            console.log(item.pubDate)
            console.log(item.link)
        });


    } catch (e) {
        console.log(e)
    }
}

for (let list of gitUrlList) {
    await getLatestRelease(list);
}