const express = require("express");
const router = express.Router();
const User = require("../../models/ContactUs/ContactUs");
const Subscriber = require("../../models/ContactUs/Subscriber");

const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables from .env file

// Configure nodemailer for cPanel email
const transporter = nodemailer.createTransport({
  host: "mail.weppso.com", // Replace with your cPanel mail server (e.g., mail.yourdomain.com)
  port: 587, // Typically 587 for TLS or 465 for SSL
  secure: false, // Set to true if using port 465 (SSL)
  auth: {
    user: process.env.CPANEL_EMAIL, // Your cPanel email (e.g., info@weppso.com)
    pass: process.env.CPANEL_EMAIL_PASSWORD, // Your cPanel email password
  },
  tls: {
    rejectUnauthorized: false, // Bypass SSL certificate validation (if needed)
  },
  debug: true, // Enable debug output
});

// POST API to save contact form data
router.post("/contact-us", async (req, res) => {
  try {
    // Extract data from the request body
    const { fullname, email, organization, phone, message } = req.body;

    // Validate required fields
    if (!fullname || !email || !organization || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Create a new ContactUs document
    const newContact = new User({
      fullname,
      email,
      organization,
      phone,
      message,
    });

    // Save the document to the database
    await newContact.save();

    // Send an email to the user
    const mailOptions = {
      from: `"WEPPSO" <${process.env.CPANEL_EMAIL}>`, // Sender address (your cPanel email)
      to: email, // Recipient address (user's email)
      subject: "Thank you for contacting WEPPSO!", // Subject line
      text: `Dear ${fullname},\n\nThank you for reaching out to WEPPSO! We have received your message and will get back to you shortly.\n\nHere are the details you provided:\n\n- Name: ${fullname}\n- Email: ${email}\n- Organization: ${organization}\n- Phone: ${phone}\n- Message: ${message}\n\nIf you have any further questions, feel free to reply to this email.\n\nBest regards,\nThe WEPPSO Team`, // Plain text body
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #007BFF;">Thank you for contacting WEPPSO!</h2>
          <p>Dear ${fullname},</p>
          <p>Thank you for reaching out to WEPPSO! We have received your message and will get back to you shortly.</p>
          <p>Here are the details you provided:</p>
          <ul>
            <li><strong>Name:</strong> ${fullname}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Organization:</strong> ${organization}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Message:</strong> ${message}</li>
          </ul>
          <p>If you have any further questions, feel free to reply to this email.</p>
          <p>Best regards,</p>
          <p><strong>The WEPPSO Team</strong></p>
          <hr>
          <p style="font-size: 12px; color: #777;">This is an automated message. Please do not reply to this email.</p>
        </div>
      `, // HTML body (optional)
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Contact form submitted successfully!",
      data: newContact,
    });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
});


router.post("/subscription", async (req, res) => {
  try {
    // Extract data from the request body
    const { email } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    // Create a new Subscriber document
    const newSubscriber = new Subscriber({
      email,
    });

    // Save the document to the database
    await newSubscriber.save();

    // Send an email to the user
    const mailOptions = {
      from: `"WEPPSO" <${process.env.CPANEL_EMAIL}>`, // Sender address (your cPanel email)
      to: email, // Recipient address (user's email)
      subject: "Thank you for Subscribing to WEPPSO!", // Subject line
      text: `Dear Subscriber,\n\nThank you for subscribing to WEPPSO! We are excited to have you on board.\n\nYou will now receive updates, news, and exclusive content from us. Stay tuned for exciting announcements!\n\nIf you have any questions or need assistance, feel free to reach out to us at ${process.env.CPANEL_EMAIL}.\n\nBest regards,\nThe WEPPSO Team`, // Plain text body
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #007BFF;">Welcome to WEPPSO!</h2>
          <p>Dear Subscriber,</p>
          <p>Thank you for subscribing to WEPPSO! We are excited to have you on board.</p>
          <p>You will now receive updates, news, and exclusive content from us. Stay tuned for exciting announcements!</p>
          <p>If you have any questions or need assistance, feel free to reach out to us at <a href="mailto:${process.env.CPANEL_EMAIL}">${process.env.CPANEL_EMAIL}</a>.</p>
          <p>Best regards,</p>
          <p><strong>The WEPPSO Team</strong></p>
          <hr>
          <p style="font-size: 12px; color: #777;">You are receiving this email because you subscribed to WEPPSO. If you no longer wish to receive emails, please <a href="#">unsubscribe here</a>.</p>
        </div>
      `, // HTML body (optional)
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Subscription successful!",
      data: newSubscriber,
    });
  } catch (error) {
    console.error("Error submitting subscription form:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
});

module.exports = router;