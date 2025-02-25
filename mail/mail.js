import 'dotenv/config'
import nodemailer from 'nodemailer'

let smtpServer = process.env.SMTP_SERVER;
let smtpPort = process.env.SMTP_PORT;
let smtpTls = process.env.SMTP_TLS;
let smtpUser = process.env.SMTP_USER;
let smtpPassword = process.env.SMTP_PASSWORD;
let receiver = process.env.RECEIVER;


const sendMail = async(mailText) => {
    const transporter = nodemailer.createTransport({
        host: smtpServer,
        port: smtpPort,
        secure: smtpTls,
        auth: {
            user: smtpUser,
            pass: smtpPassword
        }
    });

    const info = await transporter.sendMail({
        from: smtpUser,
        to: receiver,
        subject: "github latest release",
        text: mailText
    });
}
export default { sendMail }