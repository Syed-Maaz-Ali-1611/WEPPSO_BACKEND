const express = require("express");
const router = express.Router();
const User = require("../../models/ContactUs/ContactUs");
const Subscriber = require("../../models/ContactUs/Subscriber");
const nodemailer = require("nodemailer");
require("dotenv").config();
// Configure nodemailer for cPanel email
const transporter = nodemailer.createTransport({
  host: "mail.weppso.com", 
  port: 587, // Typically 587 for TLS or 465 for SSL
  secure: false, // Set to true if using port 465 (SSL)
  auth: {
    user: process.env.CPANEL_EMAIL, // Your cPanel email
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
    const { fullname, email, organization, phone, message } = req.body;

    if (!fullname || !email || !organization || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const newContact = new User({ fullname, email, organization, phone, message });
    await newContact.save();

    const mailOptions = {
      from: `"WEPPSO" <${process.env.CPANEL_EMAIL}>`,
      to: email,
      subject: "Thank you for contacting WEPPSO!",
      text: `Dear ${fullname},\n\nThank you for reaching out to WEPPSO! We have received your message and will get back to you shortly.\n\nHere are the details you provided:\n\n- Name: ${fullname}\n- Email: ${email}\n- Organization: ${organization}\n- Phone: ${phone}\n- Message: ${message}\n\nIf you have any further questions, feel free to reply to this email.\n\nBest regards,\nThe WEPPSO Team`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://weppso.vercel.app/images/weppsologo.png" alt="WEPPSO Logo" style="max-width: 150px;">
          </div>
          <h2 style="color: #007BFF; text-align: center;">Thank you for contacting WEPPSO!</h2>
          <p>Dear ${fullname},</p>
          <p>Thank you for reaching out to WEPPSO! We have received your message and will get back to you shortly.</p>
          <p>Here are the details you provided:</p>
          <ul style="list-style-type: none; padding: 0;">
            <li><strong>Name:</strong> ${fullname}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Organization:</strong> ${organization}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Message:</strong> ${message}</li>
          </ul>
          <p>If you have any further questions, feel free to reply to this email.</p>
          <p>Best regards,</p>
          <p><strong>The WEPPSO Team</strong></p>x
          <hr>
          <p style="font-size: 12px; color: #777; text-align: center;">This is an automated message. Please do not reply to this email.</p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({
          success: false,
          message: "Failed to send email.",
          error: error.message,
        });
      } else {
        console.log("Email sent successfully:", info.response);
        return res.status(201).json({
          success: true,
          message: "Contact form submitted and email sent successfully!",
          data: newContact,
        });
      }
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

    // Check if the email already exists in the database
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({
        success: false,
        message: "Already Subscribed.",
      });
    }

    // Create a new Subscriber document
    const newSubscriber = new Subscriber({
      email,
    });

    // Save the document to the database
    await newSubscriber.save();
    console.log("Subscriber saved to database:", newSubscriber);

    // Send an email to the user
    const mailOptions = {
      from: `"WEPPSO" <${process.env.CPANEL_EMAIL}>`, // Sender address (your cPanel email)
      to: email, // Recipient address (user's email)
      subject: "Thank you for Subscribing to WEPPSO!", // Subject line
      text: `Dear Subscriber,\n\nThank you for subscribing to WEPPSO! We are excited to have you on board.\n\nYou will now receive updates, news, and exclusive content from us. Stay tuned for exciting announcements!\n\nIf you have any questions or need assistance, feel free to reach out to us at ${process.env.CPANEL_EMAIL}.\n\nBest regards,\nThe WEPPSO Team`, // Plain text body
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://weppso.vercel.app/images/weppsologo.png" alt="WEPPSO Logo" style="max-width: 150px;">
          </div>
          <h2 style="color: #007BFF; text-align: center;">Welcome to WEPPSO!</h2>
          <p>Dear Subscriber,</p>
          <p>Thank you for subscribing to WEPPSO! We are excited to have you on board.</p>
          <p>You will now receive updates, news, and exclusive content from us. Stay tuned for exciting announcements!</p>
          <p>If you have any questions or need assistance, feel free to reach out to us at <a href="mailto:${process.env.CPANEL_EMAIL}">${process.env.CPANEL_EMAIL}</a>.</p>
          <p>Best regards,</p>
          <p><strong>The WEPPSO Team</strong></p>
          <hr>
          <p style="font-size: 12px; color: #777; text-align: center;">You are receiving this email because you subscribed to WEPPSO. If you no longer wish to receive emails, please <a href="#">unsubscribe here</a>.</p>
        </div>
      `, // HTML body (optional)
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({
          success: false,
          message: "Failed to send email.",
          error: error.message,
        });
      } else {
        console.log("Email sent successfully:", info.response);
        return res.status(201).json({
          success: true,
          message: "Subscription successful!",
          data: newSubscriber,
        });
      }
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