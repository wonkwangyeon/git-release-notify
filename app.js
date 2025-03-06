import 'dotenv/config'
import Parser from 'rss-parser'
import mail from './mail/mail.js'
import slack from './slack/slack.js'

const parser = new Parser({
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

        let feed = await parser.parseURL(url + '.atom');

        const pubDate = new Date(feed.items[0].pubDate)

       // if (yesterday.getFullYear() == pubDate.getFullYear && yesterday.getMonth() == pubDate.getMonth()
          //  && yesterday.getDate() == pubDate.getMonth()) {
            console.log(feed.items[0].title)
            console.log(feed.items[0].pubDate)
            console.log(feed.items[0].link)
            mailText += "===================== Latest Release =====================\n"
            mailText += "name: " + feed.items[0].title + "\n"
            mailText += "date: " + feed.items[0].pubDate + "\n"
            mailText += "link: " + feed.items[0].link + "\n"
            chkSend = true
        //}
        console.log(mailText);
    } catch (e) {
        console.log(e)
    }
}

for (let list of gitUrlList) {
    await getLatestRelease(list);
}

mailEnabled = (mailEnabled?.toLowerCase?.() === 'true');
if (mailEnabled && chkSend) {
    mail.sendMail(mailText)
}

slackEnabled = (slackEnabled?.toLowerCase?.() === 'true');
if (slackEnabled && chkSend) {
    slack.sendSlack(mailText)
}