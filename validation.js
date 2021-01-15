const validateEmail = (email) => {
  const emailExpReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return email.match(emailExpReg);
}

const validateName = (name) => {
  const nameExpReg = /^\s+$/;
  return name.match(nameExpReg)
}

const validateAddress = (address) => {
  if (address.length > 60 || address == null) {
    alert('Exceso de caracteres')
  }
}
