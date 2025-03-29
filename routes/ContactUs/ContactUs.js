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
.t153,.t159,.t165,.t92{vertical-align:top!important}.t131{mso-line-height-alt:0px!important;line-height:0!important;display:none!important}.t132{padding-left:30px!important;padding-bottom:40px!important;padding-right:30px!important}.t129{width:353px!important}.t11{padding-bottom:20px!important}.t10{line-height:28px!important;font-size:26px!important;letter-spacing:-1.04px!important}.t179{padding:40px 30px!important}.t170{padding-bottom:36px!important}.t166{text-align:center!important}.t149,.t151,.t155,.t157,.t161,.t163{display:revert!important}.t91,.t93,.t94{display:block!important}.t153,.t159,.t165{width:44px!important}.t93{text-align:left!important}.t91{mso-line-height-alt:15px!important;line-height:15px!important}.t92{display:inline-block!important;width:100%!important;max-width:800px!important}.t89{padding-bottom:15px!important;padding-right:0!important}
}
</style>
<!--[if !mso]>-->
<link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;700;800&amp;display=swap" rel="stylesheet" type="text/css" />
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
<body id=body class=t185 style="min-width:100%;Margin:0px;padding:0px;background-color:#242424;"><div class=t184 style="background-color:#242424;"><table role=presentation width=100% cellpadding=0 cellspacing=0 border=0 align=center><tr><td class=t183 style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#242424;" valign=top align=center>
<!--[if mso]>
<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
<v:fill color=#242424/>
</v:background>
<![endif]-->
<table role=presentation width=100% cellpadding=0 cellspacing=0 border=0 align=center id=innerTable><tr><td><div class=t131 style="mso-line-height-rule:exactly;mso-line-height-alt:45px;line-height:45px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t135 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=600 class=t134 style="background-color:#F8F8F8;width:600px;">
<table class=t133 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t132 style="padding:0 50px 60px 50px;"><table role=presentation width=100% cellpadding=0 cellspacing=0 style="width:100% !important;"><tr><td align=center>
<table class=t8 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t7 style="background-color:#000000;width:620px;">
<table class=t6 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t5 style="padding:40px 40px 40px 40px;"><table role=presentation width=100% cellpadding=0 cellspacing=0 style="width:100% !important;"><tr><td align=center>
<table class=t4 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=300 class=t3 style="width:300px;">
<table class=t2 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t1><div style="font-size:0px;"><img class=t0 style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width=300 height=89.390625 alt="" src="https://weppso.com/wp-content/uploads/2025/03/cropped-weppsologo.png"/></div></td></tr></table>
</td></tr></table>
</td></tr></table></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t9 style="mso-line-height-rule:exactly;mso-line-height-alt:40px;line-height:40px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t14 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t13 style="width:600px;">
<table class=t12 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t11 style="padding:0 0 15px 0;"><h1 class=t10 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:800;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:-1.56px;direction:ltr;color:#191919;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px;">Dear <span style="color:#FF4A17;">${fullname}</span>,</h1></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t19 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t18 style="width:600px;">
<table class=t17 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t16 style="padding:0 0 22px 0;"><p class=t15 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Thank you for contacting WEPPSO! We have successfully received your message and will be reviewing it shortly. Here are the details you provided:</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t24 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t23 style="width:600px;">
<table class=t22 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t21 style="padding:0 0 14px 0;"><p class=t20 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:bold;font-style:normal;font-size:19px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px;">Your Information:</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t100 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t99 style="background-color:#F0F0F0;width:600px;">
<table class=t98 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t97 style="padding:40px 40px 40px 40px;"><div class=t96 style="width:100%;text-align:left;"><div class=t95 style="display:inline-block;"><table class=t94 role=presentation cellpadding=0 cellspacing=0 align=left valign=top>
<tr class=t93><td></td><td class=t92 width=420 valign=top>
<table role=presentation width=100% cellpadding=0 cellspacing=0 class=t90 style="width:100%;"><tr><td class=t89 style="padding:0 5px 0 0;"><table role=presentation width=100% cellpadding=0 cellspacing=0 style="width:100% !important;"><tr><td align=center>
<table class=t88 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=414.99999999999994 class=t87 style="width:800px;">
<table class=t86 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t85><table role=presentation width=100% cellpadding=0 cellspacing=0 style="width:100% !important;"><tr><td align=center>
<table class=t29 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=414.99999999999994 class=t28 style="width:600px;">
<table class=t27 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t26><p class=t25 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:700;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Name:</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t30 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t35 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=414.99999999999994 class=t34 style="width:600px;">
<table class=t33 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t32><p class=t31 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">${fullname}</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t36 style="mso-line-height-rule:exactly;mso-line-height-alt:15px;line-height:15px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t41 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=414.99999999999994 class=t40 style="width:600px;">
<table class=t39 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t38><p class=t37 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:700;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Email:</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t42 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t47 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=414.99999999999994 class=t46 style="width:600px;">
<table class=t45 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t44><p class=t43 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">${email}</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t48 style="mso-line-height-rule:exactly;mso-line-height-alt:15px;line-height:15px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t53 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=414.99999999999994 class=t52 style="width:600px;">
<table class=t51 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t50><p class=t49 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:700;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Organization:</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t54 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t59 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=414.99999999999994 class=t58 style="width:600px;">
<table class=t57 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t56><p class=t55 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">${organization}</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t60 style="mso-line-height-rule:exactly;mso-line-height-alt:15px;line-height:15px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t65 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=414.99999999999994 class=t64 style="width:600px;">
<table class=t63 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t62><p class=t61 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:700;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Phone:</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t66 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t71 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=414.99999999999994 class=t70 style="width:600px;">
<table class=t69 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t68><p class=t67 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">${phone}</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t72 style="mso-line-height-rule:exactly;mso-line-height-alt:15px;line-height:15px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t78 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=414.99999999999994 class=t77 style="width:600px;">
<table class=t76 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t75><p class=t74 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;"><span class=t73 style="margin:0;Margin:0;font-weight:700;mso-line-height-rule:exactly;">Message : </span></p></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t79 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t84 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=414.99999999999994 class=t83 style="width:600px;">
<table class=t82 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t81><p class=t80 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">${message}</p></td></tr></table>
</td></tr></table>
</td></tr></table></td></tr></table>
</td></tr></table>
</td></tr></table></td></tr></table>
<!--[if !mso]>-->
<div class=t91 style="mso-line-height-rule:exactly;font-size:1px;display:none;">&nbsp;&nbsp;</div>
<!--<![endif]-->
</td>
<td></td></tr>
</table></div></div></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t105 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t104 style="width:600px;">
<table class=t103 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t102 style="padding:20px 0 0 0;"><p class=t101 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Rest assured, we are on it! Our team will get back to you as soon as possible with the next steps.</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t106 style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t111 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t110 style="width:600px;">
<table class=t109 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t108><p class=t107 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">If you have any further questions or need immediate assistance, please don’t hesitate to reply to this email.</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t112 style="mso-line-height-rule:exactly;mso-line-height-alt:40px;line-height:40px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t118 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t117 style="width:600px;">
<table class=t116 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t115><p class=t114 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;"><span class=t113 style="margin:0;Margin:0;font-weight:bold;mso-line-height-rule:exactly;">Best regards,</span></p></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t124 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t123 style="width:600px;">
<table class=t122 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t121 style="padding:0 0 14px 0;"><p class=t120 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;"><span class=t119 style="margin:0;Margin:0;font-weight:bold;mso-line-height-rule:exactly;">WEPPSO</span></p></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t126 style="mso-line-height-rule:exactly;mso-line-height-alt:40px;line-height:40px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t130 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=250 class=t129 style="background-color:#181818;overflow:hidden;width:250px;border-radius:44px 44px 44px 44px;">
<table class=t128 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t127 style="text-align:center;line-height:44px;mso-line-height-rule:exactly;mso-text-raise:10px;"><a class=t125 href="https://weppso.com" style="display:block;margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:44px;font-weight:800;font-style:normal;font-size:12px;text-decoration:none;text-transform:uppercase;letter-spacing:2.4px;direction:ltr;color:#F8F8F8;text-align:center;mso-line-height-rule:exactly;mso-text-raise:10px;" target=_blank>VISIT WEBSITE</a></td></tr></table>
</td></tr></table>
</td></tr></table></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t182 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=600 class=t181 style="background-color:#242424;width:600px;">
<table class=t180 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t179 style="padding:48px 50px 48px 50px;"><table role=presentation width=100% cellpadding=0 cellspacing=0 style="width:100% !important;"><tr><td align=center>
<table class=t140 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=200 class=t139 style="width:200px;">
<table class=t138 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t137><div style="font-size:0px;"><img class=t136 style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width=200 height=59.59375 alt="" src="https://weppso.com/wp-content/uploads/2025/03/cropped-weppsologo.png"/></div></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t141 style="mso-line-height-rule:exactly;mso-line-height-alt:20px;line-height:20px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t146 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t145 style="width:600px;">
<table class=t144 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t143><p class=t142 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:800;font-style:normal;font-size:18px;text-decoration:none;text-transform:none;letter-spacing:-0.9px;direction:ltr;color:#757575;text-align:center;mso-line-height-rule:exactly;mso-text-raise:1px;">Want updates through more platforms?</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t147 style="mso-line-height-rule:exactly;mso-line-height-alt:15px;line-height:15px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t173 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t172 style="width:800px;">
<table class=t171 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t170 style="padding:10px 0 20px 0;"><div class=t169 style="width:100%;text-align:center;"><div class=t168 style="display:inline-block;"><table class=t167 role=presentation cellpadding=0 cellspacing=0 align=center valign=top>
<tr class=t166><td></td><td class=t153 width=44 valign=top>
<table role=presentation width=100% cellpadding=0 cellspacing=0 class=t152 style="width:100%;"><tr><td class=t149 style="width:10px;" width=10></td><td class=t150><a href="https://wa.me/message/JWMHCLS7B6P4F1" style="font-size:0px;" target=_blank><img class=t148 style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width=24 height=24 alt="" src="https://ef1d08e1-bc79-4265-a742-189f3525c6a6.b-cdn.net/e/62832557-62a8-4c89-bd4f-8098654c9b1c/1e2b4a1c-4943-4dfa-965f-f730faecc369.png"/></a></td><td class=t151 style="width:10px;" width=10></td></tr></table>
</td><td class=t159 width=44 valign=top>
<table role=presentation width=100% cellpadding=0 cellspacing=0 class=t158 style="width:100%;"><tr><td class=t155 style="width:10px;" width=10></td><td class=t156><a href="https://www.facebook.com/share/1Wab5hviiF/?mibextid=wwXIfr" style="font-size:0px;" target=_blank><img class=t154 style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width=24 height=24 alt="" src="https://ef1d08e1-bc79-4265-a742-189f3525c6a6.b-cdn.net/e/62832557-62a8-4c89-bd4f-8098654c9b1c/76444534-7e48-4a1e-b294-4b6748ffb145.png"/></a></td><td class=t157 style="width:10px;" width=10></td></tr></table>
</td><td class=t165 width=44 valign=top>
<table role=presentation width=100% cellpadding=0 cellspacing=0 class=t164 style="width:100%;"><tr><td class=t161 style="width:10px;" width=10></td><td class=t162><a href="https://www.instagram.com/weppso_?igsh=cmV3amxkZ2g4Njl0" style="font-size:0px;" target=_blank><img class=t160 style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width=24 height=24 alt="" src="https://ef1d08e1-bc79-4265-a742-189f3525c6a6.b-cdn.net/e/62832557-62a8-4c89-bd4f-8098654c9b1c/d1b89322-c452-40bd-ac59-603e27ece976.png"/></a></td><td class=t163 style="width:10px;" width=10></td></tr></table>
</td>
<td></td></tr>
</table></div></div></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t178 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t177 style="width:600px;">
<table class=t176 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t175><p class=t174 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;direction:ltr;color:#888888;text-align:center;mso-line-height-rule:exactly;mso-text-raise:3px;">Karachi , Sindh, Pakistan</p></td></tr></table>
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

    // Extract name from email (part before @)
    const emailName = email.split('@')[0];

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
      subject: "Welcome to Weppso – Your Vision , Our Code", // Subject line
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
.t117{mso-line-height-alt:0px!important;line-height:0!important;display:none!important}.t118{padding-left:30px!important;padding-bottom:40px!important;padding-right:30px!important}.t115{width:353px!important}.t12{padding-bottom:20px!important}.t11{line-height:28px!important;font-size:26px!important;letter-spacing:-1.04px!important}.t165{padding:40px 30px!important}.t156{padding-bottom:36px!important}.t152{text-align:center!important}.t135,.t137,.t141,.t143,.t147,.t149{display:revert!important}.t139,.t145,.t151{vertical-align:top!important;width:44px!important}
}
</style>
<!--[if !mso]>-->
<link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@500;700;800&amp;display=swap" rel="stylesheet" type="text/css" />
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
<body id=body class=t171 style="min-width:100%;Margin:0px;padding:0px;background-color:#242424;"><div class=t170 style="background-color:#242424;"><table role=presentation width=100% cellpadding=0 cellspacing=0 border=0 align=center><tr><td class=t169 style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#242424;" valign=top align=center>
<!--[if mso]>
<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
<v:fill color=#242424/>
</v:background>
<![endif]-->
<table role=presentation width=100% cellpadding=0 cellspacing=0 border=0 align=center id=innerTable><tr><td><div class=t117 style="mso-line-height-rule:exactly;mso-line-height-alt:45px;line-height:45px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t121 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=600 class=t120 style="background-color:#F8F8F8;width:600px;">
<table class=t119 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t118 style="padding:0 50px 60px 50px;"><table role=presentation width=100% cellpadding=0 cellspacing=0 style="width:100% !important;"><tr><td align=center>
<table class=t8 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t7 style="background-color:#000000;width:620px;">
<table class=t6 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t5 style="padding:40px 40px 40px 40px;"><table role=presentation width=100% cellpadding=0 cellspacing=0 style="width:100% !important;"><tr><td align=center>
<table class=t4 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=300 class=t3 style="width:300px;">
<table class=t2 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t1><div style="font-size:0px;"><img class=t0 style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width=300 height=89.390625 alt="" src="https://weppso.com/wp-content/uploads/2025/03/cropped-weppsologo.png"/></div></td></tr></table>
</td></tr></table>
</td></tr></table></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t9 style="mso-line-height-rule:exactly;mso-line-height-alt:40px;line-height:40px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t15 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t14 style="width:600px;">
<table class=t13 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t12 style="padding:0 0 15px 0;"><h1 class=t11 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:800;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:-1.56px;direction:ltr;color:#191919;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px;">Dear <span class=t10 style="margin:0;Margin:0;color:#FF4A17;mso-line-height-rule:exactly;">${emailName}</span>,</h1></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t21 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t20 style="width:600px;">
<table class=t19 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t18 style="padding:0 0 22px 0;"><p class=t17 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Thank you for subscribing to <span class=t16 style="margin:0;Margin:0;color:#FF4A17;mso-line-height-rule:exactly;">W</span>EPPSO! We&#39;re thrilled to have you join our community. At Weppso, we specialize in delivering tailored digital solutions to elevate your business. Our expertise spans Web Development, App Development, and UI/UX Design, all aimed at enhancing your online presence and driving growth.</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t26 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t25 style="width:600px;">
<table class=t24 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t23 style="padding:0 0 22px 0;"><p class=t22 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:800;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Our Core Services:</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t32 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t31 style="width:600px;">
<table class=t30 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t29 style="padding:0 0 22px 15px;"><p class=t28 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;"><span class=t27 style="margin:0;Margin:0;font-weight:700;font-size:15px;color:#FF4A17;mso-line-height-rule:exactly;">* Website Development:</span> We build responsive, SEO-optimized websites that not only boost your brand but also enhance user experience. Our team ensures fast, secure, and scalable web solutions designed to increase traffic and conversions. ​&nbsp;</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t38 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t37 style="width:600px;">
<table class=t36 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t35 style="padding:0 0 22px 15px;"><p class=t34 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;"><span class=t33 style="margin:0;Margin:0;font-weight:700;font-size:15px;color:#FF4A17;mso-line-height-rule:exactly;">* Application Development:</span> Our feature-rich mobile apps for iOS and Android are optimized for App Store SEO. Designed for high engagement and user retention, our apps are intuitive and fast.&nbsp;</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t45 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t44 style="width:600px;">
<table class=t43 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t42 style="padding:0 0 22px 15px;"><p class=t41 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;"><span class=t40 style="margin:0;Margin:0;mso-line-height-rule:exactly;"><span class=t39 style="margin:0;Margin:0;font-weight:700;color:#FF4A17;mso-line-height-rule:exactly;">* Product UI/UX Design:</span></span> We craft visually appealing, user-friendly interfaces that improve functionality and engagement. Our designs deliver seamless navigation, driving customer satisfaction</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t50 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t49 style="width:600px;">
<table class=t48 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t47 style="padding:0 0 22px 0;"><p class=t46 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:800;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Why Choose Weppso?</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t58 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t57 style="width:600px;">
<table class=t56 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t55 style="padding:0 0 22px 15px;"><p class=t54 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;"><span class=t52 style="margin:0;Margin:0;mso-line-height-rule:exactly;"><span class=t51 style="margin:0;Margin:0;font-weight:700;color:#FF4A17;mso-line-height-rule:exactly;">* </span></span><span class=t53 style="margin:0;Margin:0;font-weight:700;font-size:15px;color:#FF4A17;mso-line-height-rule:exactly;">Customized Solutions:</span> We understand that each business is unique. Our solutions are tailored to meet your specific needs, ensuring alignment with your goals.</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t66 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t65 style="width:600px;">
<table class=t64 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t63 style="padding:0 0 22px 15px;"><p class=t62 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;"><span class=t60 style="margin:0;Margin:0;mso-line-height-rule:exactly;"><span class=t59 style="margin:0;Margin:0;font-weight:700;color:#FF4A17;mso-line-height-rule:exactly;">* </span></span><span class=t61 style="margin:0;Margin:0;font-weight:700;font-size:15px;color:#FF4A17;mso-line-height-rule:exactly;">Expert Team:</span> Our team comprises seasoned professionals dedicated to delivering excellence in every project.</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t74 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t73 style="width:600px;">
<table class=t72 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t71 style="padding:0 0 22px 15px;"><p class=t70 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;"><span class=t68 style="margin:0;Margin:0;mso-line-height-rule:exactly;"><span class=t67 style="margin:0;Margin:0;font-weight:700;color:#FF4A17;mso-line-height-rule:exactly;">* </span></span><span class=t69 style="margin:0;Margin:0;font-weight:700;font-size:15px;color:#FF4A17;mso-line-height-rule:exactly;">Proven Track Record:</span> With over 350 happy customers and 200+ completed projects, we have a history of driving success.</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t82 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t81 style="width:600px;">
<table class=t80 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t79 style="padding:0 0 22px 15px;"><p class=t78 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;"><span class=t76 style="margin:0;Margin:0;mso-line-height-rule:exactly;"><span class=t75 style="margin:0;Margin:0;font-weight:700;color:#FF4A17;mso-line-height-rule:exactly;">* </span></span><span class=t77 style="margin:0;Margin:0;font-weight:700;font-size:15px;color:#FF4A17;mso-line-height-rule:exactly;">Award-Winning Services: </span>Our commitment to quality has been recognized with 13+ industry awards.</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t87 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t86 style="width:600px;">
<table class=t85 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t84 style="padding:0 0 22px 0;"><p class=t83 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">We invite you to explore our portfolio to see how we&#39;ve helped businesses like yours achieve digital transformation.</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t95 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t94 style="width:600px;">
<table class=t93 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t92 style="padding:0 0 22px 0;"><p class=t91 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Should you have any questions or need assistance, our team is here to support you at every stage of your digital journey. Feel free to reach out via email at <a class=t89 href="info@weppso.com" style="margin:0;Margin:0;font-weight:700;font-style:normal;text-decoration:none;direction:ltr;color:#333333;mso-line-height-rule:exactly;" target=_blank><span class=t88 style="margin:0;Margin:0;color:#FF4A17;mso-line-height-rule:exactly;">info@weppso.com</span></a> or call us at <span class=t90 style="margin:0;Margin:0;color:#FF4A17;mso-line-height-rule:exactly;">+92 3363344409</span>.</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t100 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t99 style="width:600px;">
<table class=t98 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t97 style="padding:0 0 22px 0;"><p class=t96 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Welcome aboard, and we look forward to contributing to your digital success!</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t105 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t104 style="width:600px;">
<table class=t103 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t102 style="padding:0 0 10px 0;"><p class=t101 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:700;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Best Regards,</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t110 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t109 style="width:600px;">
<table class=t108 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t107 style="padding:0 0 22px 0;"><p class=t106 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:700;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">The Weppso Team</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t112 style="mso-line-height-rule:exactly;mso-line-height-alt:40px;line-height:40px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t116 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=250 class=t115 style="background-color:#181818;overflow:hidden;width:250px;border-radius:44px 44px 44px 44px;">
<table class=t114 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t113 style="text-align:center;line-height:44px;mso-line-height-rule:exactly;mso-text-raise:10px;"><a class=t111 href="https://weppso.com" style="display:block;margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:44px;font-weight:800;font-style:normal;font-size:12px;text-decoration:none;text-transform:uppercase;letter-spacing:2.4px;direction:ltr;color:#F8F8F8;text-align:center;mso-line-height-rule:exactly;mso-text-raise:10px;" target=_blank>VISIT WEBSITE</a></td></tr></table>
</td></tr></table>
</td></tr></table></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t168 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=600 class=t167 style="background-color:#242424;width:600px;">
<table class=t166 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t165 style="padding:48px 50px 48px 50px;"><table role=presentation width=100% cellpadding=0 cellspacing=0 style="width:100% !important;"><tr><td align=center>
<table class=t126 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=200 class=t125 style="width:200px;">
<table class=t124 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t123><div style="font-size:0px;"><img class=t122 style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width=200 height=59.59375 alt="" src="https://weppso.com/wp-content/uploads/2025/03/cropped-weppsologo.png"/></div></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t127 style="mso-line-height-rule:exactly;mso-line-height-alt:20px;line-height:20px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t132 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t131 style="width:600px;">
<table class=t130 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t129><p class=t128 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:800;font-style:normal;font-size:18px;text-decoration:none;text-transform:none;letter-spacing:-0.9px;direction:ltr;color:#757575;text-align:center;mso-line-height-rule:exactly;mso-text-raise:1px;">Want updates through more platforms?</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t133 style="mso-line-height-rule:exactly;mso-line-height-alt:15px;line-height:15px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t159 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t158 style="width:800px;">
<table class=t157 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t156 style="padding:10px 0 20px 0;"><div class=t155 style="width:100%;text-align:center;"><div class=t154 style="display:inline-block;"><table class=t153 role=presentation cellpadding=0 cellspacing=0 align=center valign=top>
<tr class=t152><td></td><td class=t139 width=44 valign=top>
<table role=presentation width=100% cellpadding=0 cellspacing=0 class=t138 style="width:100%;"><tr><td class=t135 style="width:10px;" width=10></td><td class=t136><a href="https://wa.me/message/JWMHCLS7B6P4F1" style="font-size:0px;" target=_blank><img class=t134 style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width=24 height=24 alt="" src="https://9dce4a94-b883-459f-bb84-e72dc530ff4a.b-cdn.net/e/5cfaadb3-2a00-4bdc-8195-2aa04853db0b/0439b030-b58a-43e4-b466-32d333e1bd17.png"/></a></td><td class=t137 style="width:10px;" width=10></td></tr></table>
</td><td class=t145 width=44 valign=top>
<table role=presentation width=100% cellpadding=0 cellspacing=0 class=t144 style="width:100%;"><tr><td class=t141 style="width:10px;" width=10></td><td class=t142><a href="https://www.facebook.com/share/1Wab5hviiF/?mibextid=wwXIfr" style="font-size:0px;" target=_blank><img class=t140 style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width=24 height=24 alt="" src="https://9dce4a94-b883-459f-bb84-e72dc530ff4a.b-cdn.net/e/5cfaadb3-2a00-4bdc-8195-2aa04853db0b/6ac92b2f-a982-4056-8038-507635eda1d2.png"/></a></td><td class=t143 style="width:10px;" width=10></td></tr></table>
</td><td class=t151 width=44 valign=top>
<table role=presentation width=100% cellpadding=0 cellspacing=0 class=t150 style="width:100%;"><tr><td class=t147 style="width:10px;" width=10></td><td class=t148><a href="https://www.instagram.com/weppso_?igsh=cmV3amxkZ2g4Njl0" style="font-size:0px;" target=_blank><img class=t146 style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width=24 height=24 alt="" src="https://9dce4a94-b883-459f-bb84-e72dc530ff4a.b-cdn.net/e/5cfaadb3-2a00-4bdc-8195-2aa04853db0b/0e0ead40-2826-4720-abda-0e04b1cf255c.png"/></a></td><td class=t149 style="width:10px;" width=10></td></tr></table>
</td>
<td></td></tr>
</table></div></div></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t164 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=500 class=t163 style="width:600px;">
<table class=t162 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t161><p class=t160 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;direction:ltr;color:#888888;text-align:center;mso-line-height-rule:exactly;mso-text-raise:3px;">Karachi , Sindh, Pakistan</p></td></tr></table>
</td></tr></table>
</td></tr></table></td></tr></table>
</td></tr></table>
</td></tr></table></td></tr></table></div><div class="gmail-fix" style="display: none; white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div></body>
</html>
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