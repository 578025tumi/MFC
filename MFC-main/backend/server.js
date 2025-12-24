const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Allows your website to talk to this server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --- CONFIGURATION ---
// REPLACE WITH YOUR GMAIL DETAILS
const EMAIL_USER = 'Tumelorakabe@gmail.com'; 
const EMAIL_PASS = 'fypk rods fmsa bmtu'; 

// Configure the Email Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
});

// --- THE ROUTE ---
app.post('/send-email', (req, res) => {
    const { name, phone, enquiry_type } = req.body;

    // Validate data
    if (!name || !phone) {
        return res.status(400).json({ status: 'fail', message: 'Missing fields' });
    }

    // Email Content
    const mailOptions = {
        from: {name},
        to: 'mfcfinancesales@gmail.com', // Where you want to receive the leads
        subject: `📢 NEW MFC AUCTION ENQUIRY: ${name}`,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
                <h2 style="color: #006341;">New Lead Received</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Enquiry Type:</strong> ${enquiry_type}</p>
                <hr>
                <p style="font-size: 12px; color: #666;">Sent from MFC Auction Website</p>
            </div>
        `
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ status: 'error', message: 'Failed to send email' });
        } else {
            console.log('Email sent: ' + info.response);
            return res.status(200).json({ status: 'success', message: 'Email sent successfully' });
        }
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`✅ MFC Backend Server running on http://localhost:${PORT}`);
});
