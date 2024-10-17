const nodemailer = require('nodemailer');

const sendAlert = async (message, recipients = ['sameersheikh0288@gmail.com']) => {
  try {
    // Create transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail', // Using Gmail as the mail service
      auth: {
        user: process.env.EMAIL_USER, // Sender email credentials from environment variables
        pass: process.env.EMAIL_PASS,
      },
    });

    // Mail options
    let mailOptions = {
      from: process.env.EMAIL_USER, // Sender email
      to: recipients.join(','), // Support for multiple recipients
      subject: 'Weather Alert', // Email subject
      text: message, // Message content
    };

    // Send mail using the transporter
    await transporter.sendMail(mailOptions);
    console.log(`Alert sent successfully to ${recipients.join(', ')}`);
  } catch (error) {
    console.error('Error sending alert: ', error.message || error);
  }
};

module.exports = { sendAlert };
