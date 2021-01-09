const validateEmail = (email) => {
  const emailExpReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emailExpReg.test(email);
}

const validatePhone = (phone) => {
  const phoneExpReg = /d\-\s/;
  return phoneExpReg.test(phone);
}

const validateName = (name) => {
  const nameExpReg = /^\s+$/;
  if (name.length > 50 || name == null || nameExpReg.test(name)) {
    alert('Ingrese su nombre correctamente')
  }
}

const validateAddress = (address) => {
  if (address.length > 60 || address == null) {
    alert('Exceso de caracteres')
  }
}

const validationForm = () => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
}

validationForm();