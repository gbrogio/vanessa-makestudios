import { router } from ".";
import nodemailer from "nodemailer";
import { z } from "zod";

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD,
	},
});

const emailSchema = z
	.string({ message: "invalid-type" })
	.email({ message: "invalid-email" });

const mailSchema = z.object({
	to: emailSchema.or(z.array(emailSchema)),
	from: emailSchema,
	subject: z
		.string({ message: "invalid-type" })
		.min(3, { message: "subject-small" })
		.max(100, { message: "subject-overflow" }),
	text: z.string({ message: "invalid-type" }).optional(),
	html: z.string({ message: "invalid-type" }).optional(),
});

router.post("/send-mail", async (req, res) => {
	try {
		const data = mailSchema.parse(req.body);
		await transporter.sendMail({ ...data, replyTo: data.from });
		res.send({ message: "mail-sent" });
	} catch (e) {
		if (!(e instanceof z.ZodError)) {
			console.log(e)
			res.status(500).json({
				error: "mail-send-generic-error",
			});
			return;
		}

		res.status(400).json(e.flatten().fieldErrors);
	}
});
