import express from "express";
import dotenv from "dotenv";
import {writeLog} from "./utils/fs_logger.js";
import {sendMail} from "./services/nodemailer.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/send-email", async (req, res) => {
	//todo - add validation
	//todo - dynamic transport configs

	const {recipients, subject, html, attachments} = req.body;
	const data = {
		sender: "Zmailer notification service",
		from: {
			name: "Notification",
			address: "notification@intraversesoftware.com"
		},
		to: "",
		bcc: recipients,
		subject,
		html,
		attachments}

	await sendMail(data);
	res.sendStatus(201)
})

app.use((req, res, next) => {
	res.status(200).json({ error: "Route not found" });
});

app.listen(PORT, () => writeLog(`Server started on port ${PORT}`));
