export const isEmpty = (value: string): boolean => {
  return value.trim() === "";
};

export const isValidEmail = (email: string): boolean => {
  return email.includes("@") && email.includes(".");
};

export const getSignUpValidationError = (params: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}): string | null => {
  const { name, email, password, confirmPassword } = params;

  if (isEmpty(name)) {
    return "Full name is required";
  }

  if (isEmpty(email)) {
    return "Email is required";
  }

  if (!isValidEmail(email)) {
    return "Please enter a valid email";
  }

  if (isEmpty(password)) {
    return "Password is required";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }

  if (isEmpty(confirmPassword)) {
    return "Confirm password is required";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match";
  }

  return null;
};