const { Vonage } = require('@vonage/server-sdk')

const vonage = new Vonage({
    apiKey: "494c9d15",
    apiSecret: "4qjVPSykGV1EutLY"
})

const from = "Vonage APIs"
const to = "07698362613"
const text = 'Your Appointment request successfully sent, You will get email once your appointment is confirmed!!'

exports.sendSMS = async (req, res) => {
    await vonage.sms.send({ to, from, text })
        .then(resp => { console.log('Message sent successfully'); console.log(resp); })
        .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
}

// sendSMS();
