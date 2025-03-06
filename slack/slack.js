import { IncomingWebhook } from '@slack/webhook';


const url = process.env.SLACK_WEBHOOK_URL;

const webhook = new IncomingWebhook(url);

const sendSlack = async (mailText) => {
    await webhook.send({
        text: mailText,
    });
}

export default { sendSlack }