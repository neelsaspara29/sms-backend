"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.email_verification_mail = exports.admin_create_mail = exports.forgot_password_mail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
let mail = process.env.MAIL, password = process.env.PASSWORD;
const option = { service: 'gmail',
    auth: {
        user: 'pms.neel@gmail.com',
        pass: 'nwmy wfsy fweu zyml'
    } };
const transPorter = nodemailer_1.default.createTransport(option);
const forgot_password_mail = (user, otp) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const mailOptions = {
                from: mail.MAIL,
                to: user === null || user === void 0 ? void 0 : user.email,
                subject: "Email verification",
                html: `<html lang="en-US">

                                <head>
                                    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
                                    <title>Forgot password</title>
                                    <meta name="description" content="Forgot password.">
                                    <style type="text/css">
                                        a:hover {
                                            text-decoration: underline !important;
                                        }
                                    </style>
                                </head>
                                
                                <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
                                    <!--100% body table-->
                                    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                                        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                                        <tr>
                                            <td>
                                                <table style="background-color: #f2f3f8; max-width:700px;  margin:0 auto;" width="100%" border="0"
                                                    align="center" cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td style="height:80px;">&nbsp;</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="text-align:center;">
                                                            <h1
                                                                style="color:#F43939; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">
                                                                School Management System</h1>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="height:20px;">&nbsp;</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                                                <tr>
                                                                    <td style="height:40px;">&nbsp;</td>
                                                                </tr>
                                                                <tr>
                                                                    <td style="padding:0 35px;">
                                                                        <h1
                                                                            style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">
                                                                            Forgot password</h1>
                                                                        <span
                                                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                                            Hi ${user.firstName}
                                                                            <br>
                                                                            Someone, hopefully you, has requested to reset the password for your
                                                                            account.
                                                                            <br>
                                                                            OTP will expire in 10 minutes.
                                                                            <br>
                                                                            Verification code: ${otp}
                                                                            <br>
                                                                            <br>
                                                                            The School Management Team
                                                                        </p>
                                
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style="height:40px;">&nbsp;</td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    <tr>
                                                        <td style="height:20px;">&nbsp;</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="text-align:center;">
                                                            <strong></strong></p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="height:80px;">&nbsp;</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    <!--/100% body table-->
                                </body>
                                
                        </html>`, // html body
            };
            yield transPorter.sendMail(mailOptions, function (err, data) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(`Email has been sent to ${user.email}, kindly follow the instructions`);
                }
            });
        }
        catch (error) {
            console.log(error);
            reject(error);
        }
    }));
});
exports.forgot_password_mail = forgot_password_mail;
const admin_create_mail = (user, password) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(user, "-----> email");
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const mailOptions = {
                from: mail.MAIL,
                to: user === null || user === void 0 ? void 0 : user.email,
                subject: "Email Confirmation",
                html: `<html lang="en-US">

                <head>
                    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
                    <title>Forgot password</title>
                    <meta name="description" content="Forgot password.">
                    <style type="text/css">
                        a:hover {
                            text-decoration: underline !important;
                        }
                    </style>
                </head>
                
                <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
                    <!--100% body table-->
                    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                        <tr>
                            <td>
                                <table style="background-color: #f2f3f8; max-width:700px;  margin:0 auto;" width="100%" border="0"
                                    align="center" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td style="height:80px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align:center;">
                                            <h1
                                                style="color:#F43939; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">
                                                School Management System</h1>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:20px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                                <tr>
                                                    <td style="height:40px;">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td style="padding:0 35px;">
                                                        <h1
                                                            style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">
                                                            Welcome to Your Admin Role</h1>
                                                        <span
                                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                            Hi ${user.firstName}
                                                            <br>
                                                          
                                                            I hope this message finds you well. We are pleased to inform you that you have been granted administrative privileges in School Management System. As an administrator, you will have access to advanced functionalities and management features that are essential for maintaining and enhancing the system.
                                                            <br>
                                                          <br>
<h3
                                                            style="color:#1e1e2d; font-weight:500; margin:0;font-size:25px;font-family:'Rubik',sans-serif;">
                                                            Credentials</h3>
                                                            <br>
                                                            Email : ${user === null || user === void 0 ? void 0 : user.email}
                                                      
                                                            
                                                            <br>
                                                            Password : ${password}
                                                      <br>
                                                      <br>
                                                            The School Management Team
                                                        </p>
                
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="height:40px;">&nbsp;</td>
                                                </tr>
                                            </table>
                                        </td>
                                    <tr>
                                        <td style="height:20px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align:center;">
                                            <strong></strong></p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:80px;">&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <!--/100% body table-->
                </body>
                
        </html>`, // html body
            };
            yield transPorter.sendMail(mailOptions, function (err, data) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(`Email has been sent to ${user.email}, kindly follow the instructions`);
                }
            });
        }
        catch (error) {
            console.log(error);
            reject(error);
        }
    }));
});
exports.admin_create_mail = admin_create_mail;
const email_verification_mail = (user, otp) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const mailOptions = {
                from: mail.MAIL,
                to: user.email,
                subject: "Email verification",
                html: `<html lang="en-US">
    
                <head>
                    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
                    <title>Email Verification</title>
                    <meta name="description" content="Email Verification.">
                    <style type="text/css">
                        a:hover {
                            text-decoration: underline !important;
                        }
                    </style>
                </head>
    
                <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
                    <!--100% body table-->
                    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                        <tr>
                            <td>
                                <table style="background-color: #f2f3f8; max-width:700px;  margin:0 auto;" width="100%" border="0"
                                    align="center" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td style="height:80px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align:center;">
                                            <h1
                                                style="color:#F43939; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">
                                                Satdham App</h1>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:20px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                                <tr>
                                                    <td style="height:40px;">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td style="padding:0 35px;">
                                                        <h1
                                                            style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">
                                                            Email Verification</h1>
                                                        <span
                                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                            Hi ${(user.firstName != null ? user.firstName : 'dear')} ${(user.lastName != null ? user.lastName : '')}, 
                                                            <br>
                                                            Someone, hopefully you, has requested to new account in Satdham app
                                                            <br>
                                                            OTP will expire in 10 minutes.
                                                            <br>
                                                            Verification code: ${otp}
                                                            <br>
                                                            <br>
                                                            The Satdham App Team
                                                        </p>
    
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="height:40px;">&nbsp;</td>
                                                </tr>
                                            </table>
                                        </td>
                                    <tr>
                                        <td style="height:20px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align:center;">
                                            <strong></strong></p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:80px;">&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <!--/100% body table-->
                </body>
    
                </html>`, // html body
            };
            yield transPorter.sendMail(mailOptions, function (err, data) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(`Email has been sent to ${user.email}, kindly follow the instructions`);
                }
            });
        }
        catch (error) {
            console.log(error);
            reject(error);
        }
    }));
});
exports.email_verification_mail = email_verification_mail;
//# sourceMappingURL=mail.js.map