const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

// Use bodyParser to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS, etc.)
app.use(express.static('public')); // Create a "public" directory to store your HTML file

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/main.html');  // Serve your homepage file
});

// Handle form submission (POST request to /send-email)
app.post('/send-email', (req, res) => {

    const { name, email, message } = req.body;
    

    // Configure Nodemailer transport
    const transporter = nodemailer.createTransport({
        service: 'outlook', // Replace with your email provider (e.g., Gmail, Outlook)
        auth: {
            user: 'coltonwmartin@outlook.com',  // Replace with your email
            pass: 'Nowayintothesnio5$'    // Replace with your email password
        }
    });

    // Email options
    const mailOptions = {
        from: 'coltonwmartin@outlook.com',
        to: 'coltonwmartin@outlook.com',  // Replace with the email address you want to receive form submissions
        subject: `New Contact Form Submission from ${name}`,
        text: `You have received a new message from ${name} (${email}):\n\n${message}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error); // Log the error for debugging
                return res.status(500).send('Error sending message. Please try again later.');
            }
            console.log('Email sent:', info.response); // Log success
            res.redirect('/');
        });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
