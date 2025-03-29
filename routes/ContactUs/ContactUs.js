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

    const newContact = new User({
      fullname,
      email,
      organization,
      phone,
      message,
    });
    await newContact.save();

    const mailOptions = {
      from: `"WEPPSO" <${process.env.CPANEL_EMAIL}>`,
      to: email,
      subject: "Thank you for contacting WEPPSO!",
      html: `
       <!--
* This email was built using Tabular.
* For more information, visit https://tabular.email
-->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
<title></title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<!--[if !mso]>-->
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<!--<![endif]-->
<meta name="x-apple-disable-message-reformatting" content="" />
<meta content="target-densitydpi=device-dpi" name="viewport" />
<meta content="true" name="HandheldFriendly" />
<meta content="width=device-width" name="viewport" />
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
<style type="text/css">
table {
border-collapse: separate;
table-layout: fixed;
mso-table-lspace: 0pt;
mso-table-rspace: 0pt
}
table td {
border-collapse: collapse
}
.ExternalClass {
width: 100%
}
.ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
line-height: 100%
}
body, a, li, p, h1, h2, h3 {
-ms-text-size-adjust: 100%;
-webkit-text-size-adjust: 100%;
}
html {
-webkit-text-size-adjust: none !important
}
body, #innerTable {
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale
}
#innerTable img+div {
display: none;
display: none !important
}
img {
Margin: 0;
padding: 0;
-ms-interpolation-mode: bicubic
}
h1, h2, h3, p, a {
line-height: inherit;
overflow-wrap: normal;
white-space: normal;
word-break: break-word
}
a {
text-decoration: none
}
h1, h2, h3, p {
min-width: 100%!important;
width: 100%!important;
max-width: 100%!important;
display: inline-block!important;
border: 0;
padding: 0;
margin: 0
}
a[x-apple-data-detectors] {
color: inherit !important;
text-decoration: none !important;
font-size: inherit !important;
font-family: inherit !important;
font-weight: inherit !important;
line-height: inherit !important
}
u + #body a {
color: inherit;
text-decoration: none;
font-size: inherit;
font-family: inherit;
font-weight: inherit;
line-height: inherit;
}
a[href^="mailto"],
a[href^="tel"],
a[href^="sms"] {
color: inherit;
text-decoration: none
}
</style>
<style type="text/css">
@media (min-width: 481px) {
.hd { display: none!important }
}
</style>
<style type="text/css">
@media (max-width: 480px) {
.hm { display: none!important }
}
</style>
<style type="text/css">
@media (max-width: 480px) {
.t141,.t147,.t153,.t53,.t80{vertical-align:top!important}.t119{mso-line-height-alt:0px!important;line-height:0!important;display:none!important}.t120{padding-left:30px!important;padding-bottom:40px!important;padding-right:30px!important}.t117{width:353px!important}.t11{padding-bottom:20px!important}.t10{line-height:28px!important;font-size:26px!important;letter-spacing:-1.04px!important}.t167{padding:40px 30px!important}.t158{padding-bottom:36px!important}.t154{text-align:center!important}.t137,.t139,.t143,.t145,.t149,.t151{display:revert!important}.t52,.t81,.t82{display:block!important}.t141,.t147,.t153{width:44px!important}.t81{text-align:left!important}.t52{mso-line-height-alt:15px!important;line-height:15px!important}.t53,.t80{display:inline-block!important;width:100%!important;max-width:800px!important}.t50{padding-bottom:15px!important;padding-right:0!important}.t78{padding-left:0!important}
}
</style>
<!--[if !mso]>-->
<link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;800&amp;display=swap" rel="stylesheet" type="text/css" />
<!--<![endif]-->
<!--[if mso]>
<xml>
<o:OfficeDocumentSettings>
<o:AllowPNG/>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
<![endif]-->
</head>
<body id=body class=t173 style="min-width:100%;Margin:0px;padding:0px;background-color:#242424;"><div class=t172 style="background-color:#242424;"><table role=presentation width=100% cellpadding=0 cellspacing=0 border=0 align=center><tr><td class=t171 style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#242424;" valign=top align=center>
<!--[if mso]>
<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
<v:fill color=#242424/>
</v:background>
<![endif]-->
<table role=presentation width=100% cellpadding=0 cellspacing=0 border=0 align=center id=innerTable><tr><td><div class=t119 style="mso-line-height-rule:exactly;mso-line-height-alt:45px;line-height:45px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t123 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=600 class=t122 style="background-color:#F8F8F8;width:600px;">
<table class=t121 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t120 style="padding:0 50px 60px 50px;"><table role=presentation width=100% cellpadding=0 cellspacing=0 style="width:100% !important;"><tr><td align=center>
<table class=t8 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t7 style="background-color:#000000;width:620px;">
<table class=t6 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t5 style="padding:40px 40px 40px 40px;"><table role=presentation width=100% cellpadding=0 cellspacing=0 style="width:100% !important;"><tr><td align=center>
<table class=t4 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=300 class=t3 style="width:300px;">
<table class=t2 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t1><div style="font-size:0px;"><img class=t0 style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width=300 height=89.390625 alt="" src="https://weppso.com/wp-content/uploads/2025/03/cropped-weppsologo.png"/></div></td></tr></table>
</td></tr></table>
</td></tr></table></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t9 style="mso-line-height-rule:exactly;mso-line-height-alt:40px;line-height:40px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t14 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t13 style="width:600px;">
<table class=t12 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t11 style="padding:0 0 15px 0;"><h1 class=t10 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:800;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:-1.56px;direction:ltr;color:#191919;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px;">Dear ${fullname},</h1></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t19 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t18 style="width:600px;">
<table class=t17 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t16 style="padding:0 0 22px 0;"><p class=t15 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Thank you for contacting WEPPSO! We have successfully received your message and will be reviewing it shortly. Here are the details you provided:</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t25 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t24 style="width:600px;">
<table class=t23 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t22 style="padding:0 0 14px 0;"><p class=t21 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;"><span class=t20 style="margin:0;Margin:0;font-weight:bold;mso-line-height-rule:exactly;">Your Information:</span></p></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t88 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t87 style="background-color:#F0F0F0;width:600px;">
<table class=t86 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t85 style="padding:40px 40px 40px 40px;"><div class=t84 style="width:100%;text-align:left;"><div class=t83 style="display:inline-block;"><table class=t82 role=presentation cellpadding=0 cellspacing=0 align=left valign=top>
<tr class=t81><td></td><td class=t53 width=210 valign=top>
<table role=presentation width=100% cellpadding=0 cellspacing=0 class=t51 style="width:100%;"><tr><td class=t50 style="padding:0 5px 0 0;"><table role=presentation width=100% cellpadding=0 cellspacing=0 style="width:100% !important;"><tr><td align=center>
<table class=t49 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=204.99999999999997 class=t48 style="width:800px;">
<table class=t47 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t46><table role=presentation width=100% cellpadding=0 cellspacing=0 style="width:100% !important;"><tr><td align=center>
<table class=t30 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=204.99999999999997 class=t29 style="width:600px;">
<table class=t28 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t27><p class=t26 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">Name:</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t35 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=204.99999999999997 class=t34 style="width:600px;">
<table class=t33 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t32><p class=t31 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">Email:</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t40 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=204.99999999999997 class=t39 style="width:600px;">
<table class=t38 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t37><p class=t36 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">Organization:</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t45 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=204.99999999999997 class=t44 style="width:600px;">
<table class=t43 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t42><p class=t41 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">Phone:</p></td></tr></table>
</td></tr></table>
</td></tr></table></td></tr></table>
</td></tr></table>
</td></tr></table></td></tr></table>
<!--[if !mso]>-->
<div class=t52 style="mso-line-height-rule:exactly;font-size:1px;display:none;">&nbsp;&nbsp;</div>
<!--<![endif]-->
</td><td class=t80 width=210 valign=top>
<table role=presentation width=100% cellpadding=0 cellspacing=0 class=t79 style="width:100%;"><tr><td class=t78 style="padding:0 0 0 5px;"><table role=presentation width=100% cellpadding=0 cellspacing=0 style="width:100% !important;"><tr><td align=center>
<table class=t77 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=204.99999999999997 class=t76 style="width:800px;">
<table class=t75 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t74><table role=presentation width=100% cellpadding=0 cellspacing=0 style="width:100% !important;"><tr><td align=center>
<table class=t58 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=204.99999999999997 class=t57 style="width:600px;">
<table class=t56 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t55><p class=t54 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">${fullname}</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t63 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=204.99999999999997 class=t62 style="width:600px;">
<table class=t61 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t60><p class=t59 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">${email}</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t68 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=204.99999999999997 class=t67 style="width:600px;">
<table class=t66 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t65><p class=t64 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">${phone}</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t73 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=204.99999999999997 class=t72 style="width:600px;">
<table class=t71 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t70><p class=t69 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">${message}</p></td></tr></table>
</td></tr></table>
</td></tr></table></td></tr></table>
</td></tr></table>
</td></tr></table></td></tr></table>
</td>
<td></td></tr>
</table></div></div></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t93 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t92 style="width:600px;">
<table class=t91 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t90 style="padding:20px 0 0 0;"><p class=t89 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Rest assured, we are on it! Our team will get back to you as soon as possible with the next steps.</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t94 style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t99 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t98 style="width:600px;">
<table class=t97 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t96><p class=t95 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">If you have any further questions or need immediate assistance, please don’t hesitate to reply to this email.</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t100 style="mso-line-height-rule:exactly;mso-line-height-alt:40px;line-height:40px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t106 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t105 style="width:600px;">
<table class=t104 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t103><p class=t102 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;"><span class=t101 style="margin:0;Margin:0;font-weight:bold;mso-line-height-rule:exactly;">Best regards,</span></p></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t112 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t111 style="width:600px;">
<table class=t110 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t109 style="padding:0 0 14px 0;"><p class=t108 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;"><span class=t107 style="margin:0;Margin:0;font-weight:bold;mso-line-height-rule:exactly;">WEPPSO</span></p></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t114 style="mso-line-height-rule:exactly;mso-line-height-alt:40px;line-height:40px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t118 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=250 class=t117 style="background-color:#181818;overflow:hidden;width:250px;border-radius:44px 44px 44px 44px;">
<table class=t116 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t115 style="text-align:center;line-height:44px;mso-line-height-rule:exactly;mso-text-raise:10px;"><a class=t113 href="https://weppso.com" style="display:block;margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:44px;font-weight:800;font-style:normal;font-size:12px;text-decoration:none;text-transform:uppercase;letter-spacing:2.4px;direction:ltr;color:#F8F8F8;text-align:center;mso-line-height-rule:exactly;mso-text-raise:10px;" target=_blank>VISIT WEBSITE</a></td></tr></table>
</td></tr></table>
</td></tr></table></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t170 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=600 class=t169 style="background-color:#242424;width:600px;">
<table class=t168 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t167 style="padding:48px 50px 48px 50px;"><table role=presentation width=100% cellpadding=0 cellspacing=0 style="width:100% !important;"><tr><td align=center>
<table class=t128 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=200 class=t127 style="width:200px;">
<table class=t126 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t125><div style="font-size:0px;"><img class=t124 style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width=200 height=59.59375 alt="" src="https://weppso.com/wp-content/uploads/2025/03/cropped-weppsologo.png"/></div></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t129 style="mso-line-height-rule:exactly;mso-line-height-alt:20px;line-height:20px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t134 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t133 style="width:600px;">
<table class=t132 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t131><p class=t130 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:800;font-style:normal;font-size:18px;text-decoration:none;text-transform:none;letter-spacing:-0.9px;direction:ltr;color:#757575;text-align:center;mso-line-height-rule:exactly;mso-text-raise:1px;">Want updates through more platforms?</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t135 style="mso-line-height-rule:exactly;mso-line-height-alt:15px;line-height:15px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t161 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t160 style="width:800px;">
<table class=t159 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t158 style="padding:10px 0 20px 0;"><div class=t157 style="width:100%;text-align:center;"><div class=t156 style="display:inline-block;"><table class=t155 role=presentation cellpadding=0 cellspacing=0 align=center valign=top>
<tr class=t154><td></td><td class=t141 width=44 valign=top>
<table role=presentation width=100% cellpadding=0 cellspacing=0 class=t140 style="width:100%;"><tr><td class=t137 style="width:10px;" width=10></td><td class=t138><a href="https://wa.me/message/JWMHCLS7B6P4F1" style="font-size:0px;" target=_blank><img class=t136 style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width=24 height=24 alt="" src="https://ef1d08e1-bc79-4265-a742-189f3525c6a6.b-cdn.net/e/62832557-62a8-4c89-bd4f-8098654c9b1c/1e2b4a1c-4943-4dfa-965f-f730faecc369.png"/></a></td><td class=t139 style="width:10px;" width=10></td></tr></table>
</td><td class=t147 width=44 valign=top>
<table role=presentation width=100% cellpadding=0 cellspacing=0 class=t146 style="width:100%;"><tr><td class=t143 style="width:10px;" width=10></td><td class=t144><a href="https://www.facebook.com/share/1Wab5hviiF/?mibextid=wwXIfr" style="font-size:0px;" target=_blank><img class=t142 style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width=24 height=24 alt="" src="https://ef1d08e1-bc79-4265-a742-189f3525c6a6.b-cdn.net/e/62832557-62a8-4c89-bd4f-8098654c9b1c/76444534-7e48-4a1e-b294-4b6748ffb145.png"/></a></td><td class=t145 style="width:10px;" width=10></td></tr></table>
</td><td class=t153 width=44 valign=top>
<table role=presentation width=100% cellpadding=0 cellspacing=0 class=t152 style="width:100%;"><tr><td class=t149 style="width:10px;" width=10></td><td class=t150><a href="https://www.instagram.com/weppso_?igsh=cmV3amxkZ2g4Njl0" style="font-size:0px;" target=_blank><img class=t148 style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width=24 height=24 alt="" src="https://ef1d08e1-bc79-4265-a742-189f3525c6a6.b-cdn.net/e/62832557-62a8-4c89-bd4f-8098654c9b1c/d1b89322-c452-40bd-ac59-603e27ece976.png"/></a></td><td class=t151 style="width:10px;" width=10></td></tr></table>
</td>
<td></td></tr>
</table></div></div></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t166 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t165 style="width:600px;">
<table class=t164 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t163><p class=t162 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;direction:ltr;color:#888888;text-align:center;mso-line-height-rule:exactly;mso-text-raise:3px;">Karachi , Sindh, Pakistan</p></td></tr></table>
</td></tr></table>
</td></tr></table></td></tr></table>
</td></tr></table>
</td></tr></table></td></tr></table></div><div class="gmail-fix" style="display: none; white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div></body>
</html>
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
