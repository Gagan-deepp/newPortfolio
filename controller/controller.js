const nodemailer = require('nodemailer')

const sendMessage = async (req, res) => {
    try {
        const { name, mail, phone,sub, msg } = req.body;

        if (!name) {
            res.status(406).send({
                success: false,
                message: 'Name is required'
            })
        }
        if (!phone) {
            res.status(406).send({
                success: false,
                message: 'Phone is required'
            })
        }
        if (!mail) {
            res.status(406).send({
                success: false,
                message: 'Mail Address is required'
            })
        }
        if (!sub) {
            res.status(406).send({
                success: false,
                message: 'Enter your Subject !!'
            })
        }
        if (!msg) {
            res.status(406).send({
                success: false,
                message: 'Kindly write a message !!'
            })
        }
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS,
            },
        });

        let mailOption = {
            from: `Portfolio Message ${name}`,
            to: process.env.EMAIL,
            subject: `Portfolio Message By ${name}`,
            text: msg,
            html: `
            <div style="width: 100%;   background: linear-gradient(to right, #0f0c29, #302b63, #24243e); padding: 3rem 0">
                <div style="width: 80%; background-color: white; margin: 0 auto">
                    <div style=" gap:1rem; padding:2rem; display: grid; box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; border-radius: 1rem;">
                        <h3 style=" font-size: 1.2rem;">
                            ${sub}
                        </h3>
                        <div style="font-size: .8rem; display:flex; justify-content: space-around;width:100%; flex-wrap: wrap;">
                            <h3 style="margin-right: 1rem">Name: ${name}</h3>
                            <h3 style="margin-right: 1rem">Email: ${mail}</h3>
                            <h3 style="margin-right: 1rem">Phone: ${phone}</h3>
                        </div>

                        <div>
                        <p> <em> ${msg} </em> </p>
                        </div>
                    </div>                 
                </div>
            </div>

`
        }

        await transporter.sendMail(mailOption, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                res.status(200).send({
                    success: true,
                    message: 'Email Delivered to Me !! Thank You'
                })
            }
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error to Send Message !please try again'
        })
    }
}

module.exports = { sendMessage }