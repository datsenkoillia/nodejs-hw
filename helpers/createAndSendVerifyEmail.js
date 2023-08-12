import sgMail from "@sendgrid/mail";

const { BASE_URL, SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const createAndSendVerifyEmail = async ({ email, verificationToken }) => {
  try {
    const verifyEmail = {
      to: email,
      from: "datsenko.i@gmail.com",
      subject: "Contacts App :: Verify Email address",
      html: `
    <b>For verify your email please click link below:</b> <br>
    <a href="${BASE_URL}/api/auth/users/verify/${verificationToken}" target="_blank">Click here for verify your email address</a>
    `,
    };

    await sgMail.send(verifyEmail);
  } catch (error) {
    next(error);
  }
};

export default createAndSendVerifyEmail;
