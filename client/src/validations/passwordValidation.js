const validatePassword = (password) => {
  if (password.length < 8) return 'Password should be atleast 8 Characters!';
  if (!/[A-Z]/.test(password)) {
    return 'Password should contain at least one uppercase letter.';
  }

  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return 'Password should contain at least one lowercase letter.';
  }

  // Check for at least one numeric digit
  if (!/\d/.test(password)) {
    return 'Password should contain at least one numeric digit.';
  }

  if (!/[!@#$%^&*()_+{}:;<>,.?/~\\-]/.test(password)) {
    return 'Password should contain at least one special character.';
  }

  // If the password passes all validation criteria
  return true;
};

const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return 'Invalid email address.';
  }

  // If the email is valid
  return true;
};

const passwordValidations = {
    validatePassword,
    validateEmail,
  };
  
  export default passwordValidations;
