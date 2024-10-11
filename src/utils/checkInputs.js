export const validateInputs = (inputs) => {
  const validationRules = {
    name: (value) => {
      if (!value) return { input: "name", message: "Name is required" };
      if (!/^[a-z]+$/i.test(value))
        return { input: "name", message: "Name must consist of only letters" };
      if (value.length < 2)
        return {
          input: "name",
          message: "Name must be at least 2 characters long",
        };
      if (value.length > 20)
        return {
          input: "name",
          message: "Name must be less than 20 characters long",
        };
      else
        return {
          input: "name",
          message: "",
        };
    },
    surname: (value) => {
      if (!value) return { input: "surname", message: "Surname is required" };
      if (!/^[a-z]+$/i.test(value))
        return {
          input: "surname",
          message: "Surname must consist of only letters",
        };
      if (value.length < 2)
        return {
          input: "surname",
          message: "Surname must be at least 2 characters long",
        };
      if (value.length > 20)
        return {
          input: "surname",
          message: "Surname must be less than 20 characters long",
        };
      else
        return {
          input: "surname",
          message: "",
        };
    },
    email: (value) => {
      if (!value) return { input: "email", message: "Email is required" };
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
        return { input: "email", message: "Invalid email address" };
      else
        return {
          input: "email",
          message: "",
        };
    },
    password: (value) => {
      if (!value) return { input: "password", message: "Password is required" };
      if (!/^[a-z0-9]+$/i.test(value))
        return {
          input: "password",
          message: "Password must consist of only letters and numbers",
        };
      if (value.length < 8)
        return {
          input: "password",
          message: "Password must be at least 8 characters long",
        };
      else
        return {
          input: "password",
          message: "",
        };
    },
  };

  let error = { input: "", message: "" };

  Object.keys(inputs).forEach((key) => {
    const value = inputs[key];
    const rule = validationRules[key];

    error = rule(value);
  });

  return error;
};
