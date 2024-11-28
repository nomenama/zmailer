import nodemailer from "nodemailer";
import {writeLog} from "../utils/fs_logger.js";

export async function sendMail(mailOptions) {
	const transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOSTNAME,
		port: process.env.SMTP_PORT,
		secure: process.env.SMTP_SECURE,
		auth: {
			user: process.env.SMTP_USERNAME,
			pass: process.env.SMTP_PASSWORD,
		},
	});

	try {
		const { accepted } = await transporter.sendMail(mailOptions);
		accepted.forEach((email) => writeLog(`Email sent to ${email}`));

	} catch (err) {
		writeLog(err, "error")
	}
}
