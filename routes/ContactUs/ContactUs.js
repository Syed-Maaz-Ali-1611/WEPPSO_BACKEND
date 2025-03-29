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
<table class=t12 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t11 style="padding:0 0 15px 0;"><h1 class=t10 style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:800;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:-1.56px;direction:ltr;color:#191919;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px;">Dear ${fullname},</h1></td></tr></table>
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
