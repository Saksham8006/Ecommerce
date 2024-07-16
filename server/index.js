const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const express = require('express')
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')


app.use(cors())


const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

const User = require("./models/User");



const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

app.use(express.json())


mongoose.connect(process.env.DATABASE_URI,
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
	.then(() => console.log('MongoDB Atlas connected'))
	.catch((error) => console.error('MongoDB Atlas connection error:', error.message));





//  for Signup
app.post('/register', async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body;

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(409).json({ status: 'error', error: 'Duplicate email' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({
			firstName,
			lastName,
			email,
			password: hashedPassword,
		});

		await newUser.save();

		res.status(200).json({ status: 'ok' });
	} catch (err) {
		console.log("error", err.message)
		res.status(500).json({ status: 'error', error: 'Internal server error' });
	}
});



app.post('/login', async (req, res) => {

	const { email, password } = req.body

	try {
		const user = await User.findOne({ email: email })
		console.log(user)
		if (user) {
			const isPasswordValid = await bcrypt.compare(password, user.password)

			if (isPasswordValid) {
				const token = jwt.sign(
					{
						firstName: user.firstName,
						email: user.email,
					},
					'secret123'
				)

				return res.status(200).json({ status: 'ok', user: token })
			} else {
				return res.status(401).json({ status: 'error', user: false, remarks: "Email or Password is not valid" })
			}
		}
		else {
			return res.status(401).json({ status: 'error', user: false, remarks: "Email or Password is not valid" })

		}

	}
	catch (error) {
		console.log(error.message)
		res.status(500).json({ error: "Server error" })

	}







})






const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
	console.log(`Sever running on port ${PORT}`)
);
