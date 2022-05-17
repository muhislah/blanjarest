const nodemailer = require('nodemailer')

const sendMail = (email, token, fullname) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            post: 587,
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    });

    send();

    async function send() {
        const result = await transporter.sendMail({
            from: `"BLANJA LINK ACTIVATION" <${email}>`, // sender address
            to: email, // list of receivers
            subject: "Activation Link", // Subject line
            text: "Here is Your Activation Link", // plain text body
            html: `
            <!DOCTYPE html>
            <html lang="en" style="background-color: rgb(202, 194, 194);">

            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <style>
                    * {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        margin: 0;
                        padding: 0;
                    }

                    html {
                        
                        
                    }

                    .container {
                        
                        
                    }

                    button {
                        width: 150px;
                        height: 40px;
                    }

                    p {
                        margin-top: 10px;
                    }

                    .active {
                        
                    }
                </style>
            </head>

            <body>
                <div class="container" style="position: relative;
                background-color: rgb(255, 255, 255);
                font-size: 14px;
                color: rgb(0, 0, 0);
                height: 100%;
                width: 80%;
                margin: 0 auto;
                padding: 20px;
                text-align: center;">
                    <h1 style="font-family: sans-serif; color : #DB3022 ; font-weight :bolder ; padding: 5px; border-radius: 25px; border : 2px solid #DB3022; margin-bottom: 30px">Blanja</h1>
                    <h1 class="title">
                        Hi, ${fullname}
                    </h1>
                    <h3>
                        Here's is Your Verification Code
                    </h3>
                    <p>
                        This activation code is given by activation link, and its used to activate your account. So you can access
                        the page normally
                    </p>
                    <a class="active" style="background-color: #DB3022;
                    /* Green */
                    border: none;
                    color: white;
                    padding: 15px 32px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 14px;
                    box-sizing: border-box;
                    margin : 20px auto;
                    border-radius: 25px;" href="https://blanjarest.herokuapp.com/auth/verify/${token}">ACTIVATE NOW</a>
                    <p>This activation link will be expired until 2 hours from this email sent</p>

                </div>
            </body>

            </html>`
        });

        console.log(`mail sent to ${email}`, result);
    }
}


module.exports = sendMail