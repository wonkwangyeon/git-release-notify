import 'dotenv/config'
import Parser from 'rss-parser'
import mail from './mail/mail.js'
import slack from './slack/slack.js'

const parser = new Parser({
    headers: { 'User-Agent': 'Mozilla/5.0' }
});

let gitUrl = process.env.GIT_URL
let mailEnabled = process.env.MAIL_ENABLED
let slackEnabled = process.env.SLACK_ENABLED
let gitUrlList = gitUrl.split("\n")
const today = new Date()
const yesterday = new Date(today.setDate(today.getDate() - 1))

let chkSend = false
let mailText = ""
const getLatestRelease = async (url) => {
    try {
        console.log("url : " + url)
        let feed = await parser.parseURL(url + '.atom');

        const pubDate = new Date(feed.items[0].pubDate)

        if (yesterday.getFullYear() == pubDate.getFullYear && yesterday.getMonth() == pubDate.getMonth()
            && yesterday.getDate() == pubDate.getMonth()) {
            mailText += "===================== Latest Release =====================\n"
            mailText += "name: " + feed.items[0].title + "\n"
            mailText += "date: " + feed.items[0].pubDate + "\n"
            mailText += "link: " + feed.items[0].link + "\n"
            chkSend = true
        }
    } catch (e) {
        console.log(e)
    }
}
console.log(gitUrl)
for (let list of gitUrlList) {

    console.log(list.length)
    //await getLatestRelease(list);
}

mailEnabled = (mailEnabled?.toLowerCase?.() === 'true');
if (mailEnabled && chkSend) {
    mail.sendMail(mailText)
}

slackEnabled = (slackEnabled?.toLowerCase?.() === 'true');
if (slackEnabled && chkSend) {
    slack.sendSlack(mailText)
}