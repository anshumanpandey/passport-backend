import { createTransport } from "nodemailer"

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(email: string) {

    // create reusable transporter object using the default SMTP transport
    let transporter = createTransport({
        service: 'gmail',
        auth: {
            user: 'thelox95@gmail.com',
            pass: 'qhvzmcllegwhguje' // naturally, replace both with your real credentials or an application-specific password
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'thelox95@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Please give us your feedback", // Subject line
        text: "Click on this link to send open a form", // plain text body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

}