import validator from "email-validator"; // For email validation
import { toast } from "react-toastify";

// Frontend Login Validation
export const LoginValidate = (loginState) => {
  if (loginState.loginEmail === "" || loginState.loginPassword === "") {
    toast.warning("Please enter the value first");

    return false;
  } else if (loginState.loginPassword.length <= 7) {
    toast.warning("Password at least 8 character");
    return false;
  } else if (!validator.validate(loginState.loginEmail)) {
    toast.warning("Invalid Email");
    return false;
  } else {
    return true;
  }
};

// Frontend Signup form Validation
export const SignUpValidate = (signupState) => {
  if (
    signupState.signUpName === "" ||
    signupState.signUpEmail === "" ||
    signupState.signUpPassword === "" ||
    signupState.signUpConfirmPassword === ""
  ) {
    toast.warning("Please enter the value first");
    return false;
  } else if (
    signupState.signUpName.length < 4 ||
    signupState.signUpName.length > 30
  ) {
    toast.warning("Name should be in between 4 to 30 character");
    return false;
  } else if (signupState.signUpPassword !== signupState.signUpConfirmPassword) {
    toast.warning("Password and Confirmpassword does not match");
    return false;
  } else if (signupState.signUpPassword.length <= 7) {
    toast.warning("Password at least 8 character");
    return false;
  } else if (!validator.validate(signupState.signUpEmail)) {
    toast.warning("Invalid Email");
    return false;
  } else {
    return true;
  }
};

// Create Project Validation
export const createProjectValidate = (post) => {
  const contentType = post.picture
    .split(",")
    .shift()
    .split(";")
    .shift()
    .split(":")
    .pop();
  if (post.name === "" || post.description === "") {
    toast.warning("Please enter the value first");
    return false;
  } else if (post.picture === "") {
    toast.warning("Please select an image");
    return false;
  } else if (
    contentType !== "image/jpg" &&
    contentType !== "image/jpeg" &&
    contentType !== "image/png"
  ) {
    toast.warning("Only jpg, png and jpeg format acceptable");
    return false;
  } else if (post.description.length >= 201) {
    toast.warning("Description maximum 200 character");
    return false;
  } else {
    return true;
  }
};

// Create Skill Validation
export const validateSkillField = (skillstate) => {
  if (skillstate.name === "" || skillstate.value === "") {
    toast.warning("Please enter the value first");
    return false;
  } else {
    return true;
  }
};

// Create Education Validation
export const validateEducationField = (educationstate) => {
  if (
    educationstate.degreeinshort === "" ||
    educationstate.degree === "" ||
    educationstate.institution === "" ||
    educationstate.result === ""
  ) {
    toast.warning("Please enter the value first");
    return false;
  } else {
    return true;
  }
};

// Feedback Validation
export const validateFeedback = (feedbackState) => {
  if (
    feedbackState.feedbackname === "" ||
    feedbackState.feedbackemail === "" ||
    feedbackState.feedback === ""
  ) {
    toast.warning("Please enter the value first");
    return false;
  } else if (!validator.validate(feedbackState.feedbackemail)) {
    toast.warning("Invalid Email");
    return false;
  } else {
    return true;
  }
};

// Email validation
export const validateEmail = (email) => {
  if (email === "") {
    toast.warning("Enter email first");
  } else if (!validator.validate(email)) {
    toast.warning("Invalid Email");
    return false;
  } else {
    return true;
  }
};

// Reset password validation
export const validateResetFields = (resetstate) => {
  if (resetstate.password === "" || resetstate.confirmPassword === "") {
    toast.warning("Enter the value first");
  } else if (resetstate.password !== resetstate.confirmPassword) {
    toast.warning("Password does not match");
    return false;
  } else {
    return true;
  }
};

// Create Pdf Validation
export const createResumeValidate = (base64File, pdf) => {
  const contentType = base64File
    .split(",")
    .shift()
    .split(";")
    .shift()
    .split(":")
    .pop();
  if (base64File === "") {
    toast.warning("Please select a pdf file");
    return false;
  } else if (contentType !== "application/pdf") {
    toast.warning("Only pdf is accepted");
    return false;
  } else if (pdf !== "") {
    toast.warning("Only one file can be uploaded");
    return false;
  } else {
    return true;
  }
};
