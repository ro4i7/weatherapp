function validation(values) {
    let error = {};
    const email_pattern = /\S+@\S+\.\S+/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    console.log('Input values:', values);

    if (values.email === "") {
        error.email = "Email should not be empty";
    } else if (!email_pattern.test(values.email)) {
        error.email = "Invalid email format";
    } else {
        error.email = "";
    }

    if (values.password === "") {
        error.password = "Password should not be empty";
    } else if (!password_pattern.test(values.password)) {
        error.password = "Password didn't match";
    } else {
        error.password = "";
    }

    console.log('Validation errors:', error);

    return error;
}


export default validation;