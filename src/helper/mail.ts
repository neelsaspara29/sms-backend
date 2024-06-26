"use strict"
import nodemailer from 'nodemailer';


let mail: any = process.env.MAIL,
    password = process.env.PASSWORD

const option: any = {service: 'gmail',
auth: {
  user: 'pms.neel@gmail.com',
  pass: 'nwmy wfsy fweu zyml'
}}
const transPorter = nodemailer.createTransport(option)

export const forgot_password_mail = async (user: any, otp: any) => {
    return new Promise(async (resolve, reject) => {
       
        try {
            const mailOptions = {
                from: mail.MAIL, // sender address
                to: user?.email, // list of receivers
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
        await transPorter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                resolve(`Email has been sent to ${user.email}, kindly follow the instructions`)
            }
        })
    }catch (error) {
        console.log(error)
        reject(error)
    }
    });
}

export const admin_create_mail = async (user: any, password: any) => {
    console.log(user, "-----> email")
    return new Promise(async (resolve, reject) => {
       
        try {
            const mailOptions = {
                from: mail.MAIL, // sender address
                to: user?.email, // list of receivers
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
                                                            Email : ${user?.email}
                                                      
                                                            
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
        await transPorter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                resolve(`Email has been sent to ${user.email}, kindly follow the instructions`)
            }
        })
    }catch (error) {
        console.log(error)
        reject(error)
    }
    });
}


export const email_verification_mail = async (user: any, otp: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const mailOptions = {
                from: mail.MAIL, // sender address
                to: user.email, // list of receivers
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
            await transPorter.sendMail(mailOptions, function (err, data) {
                if (err) {
                    console.log(err)
                    reject(err)
                } else {
                    resolve(`Email has been sent to ${user.email}, kindly follow the instructions`)
                }
            })
        } catch (error) {
            console.log(error)
            reject(error)
        }
    });
}
