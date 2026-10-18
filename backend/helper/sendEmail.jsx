const nodemailer = require("nodemailer")

const sendEmail = async (email,title,body) =>{
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            auth : {
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASS
            }
        })

        const info = await transporter.sendMail({
            from : "Electronics Ecomm",
            to : `${email}`,
            subject : `${title}`,
            html : `${body}`
        })

        return info;

    }catch(err){
        console.log(err)
    }
}

module.exports = sendEmail;