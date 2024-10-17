export const validateInput = (input, value) => {
  const validationRules = {
    name: (value) => {
      if (!value) return "Name is required";
      if (!/^[a-z]+$/i.test(value)) return "Name must consist of only letters";
      if (value.length < 2) return "Name must be at least 2 characters long";
      if (value.length > 20) return "Name must be less than 20 characters long";
      else return "";
    },
    surname: (value) => {
      if (!value) return "Surname is required";
      if (!/^[a-z]+$/i.test(value))
        return "Surname must consist of only letters";
      if (value.length < 2) return "Surname must be at least 2 characters long";
      if (value.length > 20)
        return "Surname must be less than 20 characters long";
      else return "";
    },
    email: (value) => {
      if (!value) return "Email is required";
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
        return "Invalid email address";
      else return "";
    },
    password: (value) => {
      if (!value) return "Password is required";
      if (!/^[a-z0-9]+$/i.test(value))
        return "Password must consist of only letters and numbers";
      if (value.length < 5)
        return "Password must be at least 5 characters long";
      else return "";
    },
  };

  let message = "";
  const rule = validationRules[input];
  message = rule(value);

  return {
    input: input,
    message: message,
  };
};
