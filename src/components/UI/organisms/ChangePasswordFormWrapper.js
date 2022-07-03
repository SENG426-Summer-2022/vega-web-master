import { useContext, useState } from "react";
import { UserContext } from "../../../auth/UserProvider";
import { changePassword } from "../../../service/Users/PasswordManager";
import ChangePasswordForm from "../molecules/ChangePasswordForm";

const fillFieldsError = "Please fill in all fields.";

const matchError = "Passwords do not match.";

const weakPassword =
  "Password is too weak. It must be at least 8 characters long.";

const changeSuccessMessage = {
  type: "success",
  message: "Password changed successfully!",
};

const changeErrorMessage = {
  type: "danger",
  message: "Password change failed. Please try again later.",
};

const defaultValues = {
  newPassword: "",
  confirmPassword: "",
};

const checkPasswordStrength = (password) => {
  if (password.length < 8) {
    return weakPassword;
  }
  return "";
};

const ChangePasswordFormWrapper = () => {
  const {
    user: { token },
  } = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(defaultValues);
  const [message, setMessage] = useState({});

  const checkErrors = () => {
    const newErrors = {};
    const { newPassword, confirmPassword } = values;

    if (newPassword && confirmPassword) {
      if (newPassword !== confirmPassword) {
        newErrors["confirmPassword"] = matchError;
      }

      const passwordError = checkPasswordStrength(newPassword);
      if (passwordError) {
        newErrors["newPassword"] = passwordError;
      }
    }

    if (!newPassword) {
      newErrors["newPassword"] = fillFieldsError;
    }

    if (!confirmPassword) {
      newErrors["confirmPassword"] = fillFieldsError;
    }

    setErrors(newErrors);
    return newErrors;
  };

  const onChange = async (e) => {
    const { name, value } = e.target;

    if (name === "newPassword") {
      setValues({ ...values, newPassword: value });
      return;
    }
    if (name === "confirmPassword") {
      setValues({ ...values, confirmPassword: value });
      return;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // check for errors
    const foundErrors = checkErrors() ?? {};
    if (Object.keys(foundErrors).length) {
      return;
    }

    const { newPassword } = values;

    // send to backend
    let response;
    try {
      response = await changePassword({ newPassword }, token);
    } catch (error) {
      console.log(error);
      setMessage(changeErrorMessage);
      return;
    }

    if (response === "OK") {
      setMessage(changeSuccessMessage);
      // clear password fields
      setValues(defaultValues);
    } else {
      setMessage(changeErrorMessage);
    }
  };

  return (
    <div className="change-password-form-wrapper">
      {message.type && (
        <div className={`alert alert-${message.type}`}>{message.message}</div>
      )}
      <ChangePasswordForm
        onSubmit={onSubmit}
        onChange={onChange}
        errors={errors}
        values={values}
      />
    </div>
  );
};

export default ChangePasswordFormWrapper;
