const validateEmail = (email) => {
  const emailExpReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return email.match(emailExpReg);
}

const validateName = (name) => {
  const nameExpReg = /^\s+$/;
  return name.match(nameExpReg)
}

const validateAddress = (address) => {
  const addressExpReg = /[,#-\/\s\!\@\$ ]/gi;
  if (addressExpReg.test(address)) {
    return true
  }
  return false
}
