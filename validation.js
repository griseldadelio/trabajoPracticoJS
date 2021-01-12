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

const validateEmail = (email) => {
  const emailExpReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return email.match(emailExpReg);
}

const validateName = (name) => {
  const nameExpReg = /^\s+$/;
  if (name.length > 50 || name == null || !name.match(nameExpReg)) {
    document.getElementById("name").innerHTML = `<span class="material-icons">
    warning</span>Nombre de usuario hasta 50 caracteres`
  }
}

const validateAddress = (address) => {
  if (address.length > 60 || address == null) {
    alert('Exceso de caracteres')
  }
}
