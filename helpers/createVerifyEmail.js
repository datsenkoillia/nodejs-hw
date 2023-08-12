const { BASE_URL } = process.env;

const createVerifyEmail = ({ email, verificationToken }) => {
  const verifyEmail = {
    to: email,
    from: "datsenko.i@gmail.com",
    subject: "Contacts App :: Verify Email address",
    html: `
    <b>For verify your email please click link below:</b> <br>
    <a href="${BASE_URL}/api/auth/users/verify/${verificationToken}" target="_blank">Click here for verify your email address</a>
    `,
  };

  return verifyEmail;
};

export default createVerifyEmail;
