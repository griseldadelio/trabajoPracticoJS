const validateEmail = (email) => {
    const emailExpReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailExpReg.test(email);

}

const validatePhone = (phone) => {
    const phoneExpReg = /d\-\s/;
    return phoneExpReg.test(phone);
}
