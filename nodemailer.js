const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport(
    {
        host: 'zzz.com.ua',
        port: 587,
        secure: false,
        auth:{
            user: process.env.email,
            pass: process.env.pass
        }
    },
    {
        from: `Mailer Test <${process.env.email}>`,
    }
)

const mailer = (message) => {
    
    const info = transporter.sendMail(message).catch(console.error)
    if(info.catch){
        return false
    }
}


module.exports = mailer