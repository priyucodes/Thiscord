export const validateLoginForm = ({ mail, password }) => {
  const isMailValid = validateMail(mail);
  const isPasswordValid = validatePassword(password);

  return isMailValid && isPasswordValid;
};

export const validateRegisterForm = ({ mail, password, username }) => {
  return (
    validateMail(mail) &&
    validatePassword(password) &&
    validateUsername(username)
  );
};

const validatePassword = password => {
  return password.length >= 8 && password.length <= 20;
};

export const validateMail = mail => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(mail);
  // .test() Returns a Boolean value that indicates whether or not a pattern exists in a searched string.
};

const validateUsername = username => {
  return username.length >= 2 && username.length <= 12;
};
