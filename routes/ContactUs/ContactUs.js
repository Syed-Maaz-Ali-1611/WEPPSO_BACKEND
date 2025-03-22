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
      html: `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
  <title></title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * {
      box-sizing: border-box;
    }
    body {
      margin: 0;
      padding: 0;
    }
    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: inherit !important;
    }
    #MessageViewBody a {
      color: inherit;
      text-decoration: none;
    }
    p {
      line-height: inherit
    }
    .desktop_hide,
    .desktop_hide table {
      mso-hide: all;
      display: none;
      max-height: 0px;
      overflow: hidden;
    }
    .image_block img+div {
      display: none;
    }
    sup,
    sub {
      font-size: 75%;
      line-height: 0;
    }
    #converted-body .list_block ul,
    #converted-body .list_block ol,
    .body [class~="x_list_block"] ul,
    .body [class~="x_list_block"] ol,
    u+.body .list_block ul,
    u+.body .list_block ol {
      padding-left: 20px;
    }
    @media (max-width:660px) {
      .desktop_hide table.icons-inner,
      .social_block.desktop_hide .social-table {
        display: inline-block !important;
      }
      .icons-inner {
        text-align: center;
      }
      .icons-inner td {
        margin: 0 auto;
      }
      .mobile_hide {
        display: none;
      }
      .row-content {
        width: 100% !important;
      }
      .stack .column {
        width: 100%;
        display: block;
      }
      .mobile_hide {
        min-height: 0;
        max-height: 0;
        max-width: 0;
        overflow: hidden;
        font-size: 0px;
      }
      .desktop_hide,
      .desktop_hide table {
        display: table !important;
        max-height: none !important;
      }
    }
    .row-2 .column-1 .block-13 .button:hover {
      background-color: #fff !important;
      border-bottom: 0 solid transparent !important;
      border-left: 0 solid transparent !important;
      border-right: 0px solid transparent !important;
      border-top: 0 solid transparent !important;
      color: #ff4a17 !important;
    }
  </style>
</head>
<body class="body" style="background-color: #000; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
  <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000;">
    <tbody>
      <tr>
        <td>
          <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
            <tbody>
              <tr>
                <td>
                  <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
                    <tbody>
                      <tr>
                        <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 5px; vertical-align: top;">
                          <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tr>
                              <td class="pad" style="padding-top:40px;width:100%;padding-right:0px;padding-left:0px;">
                                <div class="alignment" align="center" style="line-height:10px">
                                  <div style="max-width: 160px;"><img src="https://weppso.com/wp-content/uploads/2025/03/cropped-weppsologo.png" style="display: block; height: auto; border: 0; width: 100%;" width="160" alt="Alternate text" title="Alternate text" height="auto"></div>
                                </div>
                              </td>
                            </tr>
                          </table>
                          <table class="divider_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tr>
                              <td class="pad" style="padding-left:20px;padding-right:20px;padding-top:40px;">
                                <div class="alignment" align="center">
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                    <tr>
                                      <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 2px solid #FFF;"><span style="word-break: break-word;">&#8202;</span></td>
                                    </tr>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
            <tbody>
              <tr>
                <td>
                  <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
                    <tbody>
                      <tr>
                        <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 5px; vertical-align: top;">
                          <table class="heading_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tr>
                              <td class="pad">
                                <h3 style="margin: 0; color: #ff4a17; direction: ltr; font-family: Georgia, Times, 'Times New Roman', serif; font-size: 19px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 22.8px;"><span class="tinyMce-placeholder" style="word-break: break-word;">Hello ${fullname},<br></span></h3>
                              </td>
                            </tr>
                          </table>
                          <div class="spacer_block block-2" style="height:60px;line-height:60px;font-size:1px;">&#8202;</div>
                          <table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                            <tr>
                              <td class="pad">
                                <div style="color:#fff;direction:ltr;font-family:Georgia, Times, 'Times New Roman', serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                  <p style="margin: 0;">Thank you for contacting WEPPSO. We truly appreciate you taking the time to reach out to us.</p>
                                </div>
                              </td>
                            </tr>
                          </table>
                          <table class="paragraph_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                            <tr>
                              <td class="pad">
                                <div style="color:#fff;direction:ltr;font-family:Georgia, Times, 'Times New Roman', serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                  <p style="margin: 0;">Your message has been received, and our team is already reviewing the details. Rest assured, we will get back to you as soon as possible with the information you need.</p>
                                </div>
                              </td>
                            </tr>
                          </table>
                          <table class="paragraph_block block-5" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                            <tr>
                              <td class="pad">
                                <div style="color:#fff;direction:ltr;font-family:Georgia, Times, 'Times New Roman', serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                  <p style="margin: 0;">Below are the details you provided:</p>
                                </div>
                              </td>
                            </tr>
                          </table>
                          <table class="list_block block-6" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word; color: #fff; direction: ltr; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; letter-spacing: 0px; line-height: 120%; text-align: left; mso-line-height-alt: 19.2px;">
                            <tr>
                              <td class="pad">
                                <div style="margin-left:-20px">
                                  <ul start="1" style="margin-top: 0; margin-bottom: 0; list-style-type: revert;">
                                    <li style="Margin: 0 0 0 0;">Name: ${fullname}</li>
                                    <li style="Margin: 0 0 0 0;">Email: ${email}</li>
                                    <li style="Margin: 0 0 0 0;">
                                      <div>Organization: ${organization}</div>
                                    </li>
                                    <li style="Margin: 0 0 0 0;">
                                      <div>&nbsp;</div>Phone: ${phone}
                                    </li>
                                    <li style="Margin: 0 0 0 0;">Message: ${message}</li>
                                  </ul>
                                </div>
                              </td>
                            </tr>
                          </table>
                          <table class="paragraph_block block-7" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                            <tr>
                              <td class="pad">
                                <div style="color:#fff;direction:ltr;font-family:Georgia, Times, 'Times New Roman', serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                  <p style="margin: 0;">If you have any further questions or additional information to share, please don't hesitate to reply to this email. We’re here to help!</p>
                                </div>
                              </td>
                            </tr>
                          </table>
                          <table class="paragraph_block block-8" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                            <tr>
                              <td class="pad">
                                <div style="color:#fff;direction:ltr;font-family:Georgia, Times, 'Times New Roman', serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                  <p style="margin: 0;">Thank you for choosing WEPPSO. We look forward to assisting you.</p>
                                </div>
                              </td>
                            </tr>
                          </table>
                          <div class="spacer_block block-9" style="height:60px;line-height:60px;font-size:1px;">&#8202;</div>
                          <table class="paragraph_block block-10" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                            <tr>
                              <td class="pad">
                                <div style="color:#fff;direction:ltr;font-family:Georgia, Times, 'Times New Roman', serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                  <p style="margin: 0;">Best regards, &nbsp;</p>
                                </div>
                              </td>
                            </tr>
                          </table>
                          <table class="paragraph_block block-11" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                            <tr>
                              <td class="pad">
                                <div style="color:#fff;direction:ltr;font-family:Georgia, Times, 'Times New Roman', serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                  <p style="margin: 0;">The WEPPSO Team</p>
                                </div>
                              </td>
                            </tr>
                          </table>
                          <div class="spacer_block block-12" style="height:60px;line-height:60px;font-size:1px;">&#8202;</div>
                          <table class="button_block block-13" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tr>
                              <td class="pad">
                                <div class="alignment" align="center"><a href="https://calendly.com/weppso-info" target="_blank" style="color:#ffffff;text-decoration:none;"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="https://calendly.com/weppso-info"  style="height:42px;width:223px;v-text-anchor:middle;" arcsize="10%" fillcolor="#ff4a17">
<v:stroke dashstyle="Solid" weight="0px" color="#ff4a17"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#ffffff;font-family:sans-serif;font-size:16px">
<![endif]--><span class="button" style="background-color: #ff4a17; border-bottom: 0px solid transparent; border-left: 0px solid transparent; border-radius: 4px; border-right: 0px solid transparent; border-top: 0px solid transparent; color: #ffffff; display: inline-block; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 700; mso-border-alt: none; padding-bottom: 5px; padding-top: 5px; padding-left: 20px; padding-right: 20px; text-align: center; width: auto; word-break: keep-all; letter-spacing: normal;"><span style="word-break: break-word; line-height: 32px;">Request a Consultation&nbsp;</span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a></div>
                              </td>
                            </tr>
                          </table>
                          <div class="spacer_block block-14" style="height:60px;line-height:60px;font-size:1px;">&#8202;</div>
                          <table class="divider_block block-15" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tr>
                              <td class="pad">
                                <div class="alignment" align="center">
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                    <tr>
                                      <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #dddddd;"><span style="word-break: break-word;">&#8202;</span></td>
                                    </tr>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
            <tbody>
              <tr>
                <td>
                  <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
                    <tbody>
                      <tr>
                        <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;"></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
            <tbody>
              <tr>
                <td>
                  <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
                    <tbody>
                      <tr>
                        <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
                          <table class="social_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tr>
                              <td class="pad">
                                <div class="alignment" align="center">
                                  <table class="social-table" width="108px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
                                    <tr>
                                      <td style="padding:0 2px 0 2px;"><a href="https://www.facebook.com/share/1Wab5hviiF/?mibextid=wwXIfr" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-dark-gray/facebook@2x.png" width="32" height="auto" alt="Facebook" title="facebook" style="display: block; height: auto; border: 0;"></a></td>
                                      <td style="padding:0 2px 0 2px;"><a href="https://www.instagram.com/weppso_?igsh=cmV3amxkZ2g4Njl0" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-dark-gray/instagram@2x.png" width="32" height="auto" alt="Instagram" title="instagram" style="display: block; height: auto; border: 0;"></a></td>
                                      <td style="padding:0 2px 0 2px;"><a href="https://wa.me/message/JWMHCLS7B6P4F1" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-dark-gray/whatsapp@2x.png" width="32" height="auto" alt="WhatsApp" title="WhatsApp" style="display: block; height: auto; border: 0;"></a></td>
                                    </tr>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
            <tbody>
              <tr>
                <td>
                  <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
                    <tbody>
                      <tr>
                        <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 5px; vertical-align: top;">
                          <table class="divider_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tr>
                              <td class="pad" style="padding-top:40px;">
                                <div class="alignment" align="center">
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                    <tr>
                                      <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #FFF;"><span style="word-break: break-word;">&#8202;</span></td>
                                    </tr>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="row row-6" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
            <tbody>
              <tr>
                <td>
                  <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; background-color: #ffffff; width: 640px; margin: 0 auto;" width="640">
                    <tbody>
                      <tr>
                        <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;">
                          <table class="icons_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center; line-height: 0;">
                            <tr>
                              <td class="pad" style="vertical-align: middle; color: #1e0e4b; font-family: 'Inter', sans-serif; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;"><!--[if vml]><table align="center" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
                                <!--[if !vml]><!-->
                                <table class="icons-inner" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; padding-left: 0px; padding-right: 0px;" cellpadding="0" cellspacing="0" role="presentation"><!--<![endif]-->
                                  <tr>
                                    <td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 6px;"><a href="http://designedwithbeefree.com/" target="_blank" style="text-decoration: none;"><img class="icon" alt="Beefree Logo" src="https://d1oco4z2z1fhwp.cloudfront.net/assets/Beefree-logo.png" height="auto" width="34" align="center" style="display: block; height: auto; margin: 0 auto; border: 0;"></a></td>
                                    <td style="font-family: 'Inter', sans-serif; font-size: 15px; font-weight: undefined; color: #1e0e4b; vertical-align: middle; letter-spacing: undefined; text-align: center; line-height: normal;"><a href="http://designedwithbeefree.com/" target="_blank" style="color: #1e0e4b; text-decoration: none;">Designed with Beefree</a></td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table><!-- End -->
</body>
</html>`,
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