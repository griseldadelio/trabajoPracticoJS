const tableBody = document.getElementById('users-information')
const editIcon = document.getElementsByClassName("edit");
const deleteIcon = document.getElementsByClassName("delete");
const form = document.getElementById("formUserInformation");
const urlBase = 'https://5ff3193428c3980017b18f70.mockapi.io';

const createUser = () => {
    const fullname = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;

    return { fullname, email, address, phone }
}

const validateUser = (user) => {
    validateName(user.fullname)
    validateEmail(user.email)
    validateAddress(user.address)
    validationForm();
}

/* Funcion para traer los datos */

const getUsers = () => {
    fetch(`${urlBase}/users`)
        .then(response => response.json())
        .then(data => {
            showUsers(data)
            editUsers(data)
            deleteUsers(data)
        })
}
getUsers()


/* Funcion para mostrar los usuarios en tabla */

const showUsers = (data) => {
    let dataBase = '';
    data.forEach(element => {
        dataBase += `
        <tr> 
        <td><input type="checkbox" class="sel"></td>
        <td>${element.fullname}</td>
        <td>${element.email}</td>
        <td>${element.address}</td>
        <td>${element.phone}</td>
        <td>
            <i class="material-icons edit bg-warning text-light " id="${element.id}"  title="Edit">&#xE254;</i>
            <i class="material-icons delete bg-danger text-light" id="${element.id}" title="Delete">&#xE872;</i>
        </td> 
        </tr>`
    });
    tableBody.innerHTML = dataBase;
}


/* Funcion para crear Usuario nuevo */

const registerUser = (e) => {
    e.preventDefault()
    const user = createUser();
    if (validateUser(user) == false) {
        return
    }
    fetch(`${urlBase}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(user)
    })
        .then(() => {
            toastr.success(`Usuario registrado exitosamente`)
            setTimeout(() => {
                location.reload()
            }, 3000)
        })
        .catch(error => {
            console.error(error)
            toastr.error('Se ha producido un error, por favor intenta más tarde')
        })
}

form.addEventListener('submit', registerUser);


/* Funcion para editar los datos del Usuario */

const editUsers = (data) => {
    for (let i = 0; i < editIcon.length; i++) {
        editIcon[i].onclick = () => {
            const edit = editIcon[i].id
            data.forEach(element => {
                if (element.id == edit) {
                    modal.classList.remove('nomostrar')
                    modalNewEmployee(element.fullname, element.email, element.address, element.phone)

                    const save = document.getElementById('edit')

                    save.onclick = () => {
                        createUser()
                        fetch(`${urlBase}/users/${element.id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(createUser()),
                        })
                            .then(response => response.json())
                            .then(data => {
                                getUsers(data);
                                toastr.success(`Datos actualizados exitosamente`);
                                setTimeout(() => {
                                    location.reload()
                                }, 3000);
                            })
                    }
                }
            })
        }
    }
}

/* Funcion para eliminar Usuario */

const deleteUsers = (data) => {
    for (let i = 0; i < deleteIcon.length; i++) {
        deleteIcon[i].onclick = () => {
            const userRemove = deleteIcon[i].id
            data.forEach(element => {
                if (element.id == userRemove) {
                    modal.classList.remove('nomostrar')
                    modalNewEmployee(element.fullname, element.email, element.address, element.phone)

                    const save = document.getElementById('edit')

                    save.onclick = () => {
                        fetch(`${urlBase}/users/${userRemove}`, {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' },
                        })
                            .then(response => response.json())
                            .then(data => {
                                fetch(`${urlBase}/users`)
                                    .then(response => response.json(data))
                                    .then(data => {
                                        getUsers(data);
                                        toastr.success(`Usuario eliminado exitosamente`);
                                        setTimeout(() => {
                                            location.reload()
                                        }, 3000);
                                    })
                            })
                    }
                }
            });
        }
    }
}

/*Checkbox general*/

/* Funcion para Filtrar lista de usuarios */

const filterUsers = () => {
    const selectEmployee = document.getElementById("filter");
    selectEmployee.onkeypress = e => {
        if (e.keyCode === 13) {
            e.preventDefault();
            fetch(`${urlBase}/users?search=${selectEmployee.value}`)
                .then(response => response.json())
                .then(data => {
                    showUsers(data)
                    editUsers(data)
                    deleteUsers(data)
                })
        }
    }
}
filterUsers()


/* Modal para las funciones edit y delete */

const modalNewEmployee = (name = "", email = "", address = "", phone = "") => {
    modal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" >Employee info</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body d-flex flex-column" id="modalBody">
                <label for="name" class="form-label">Name
                    <input id="name" type="text" class="form-control" value=${name} required maxlength="50">
                </label>
                <label for="email" class="form-label">Email
                    <input id="email" type="email" class="form-control has-validation"  value=${email} required>
                </label>
                <label for="address" class="form-label">Address
                    <textarea id="address" class="form-control" value=${address} requiredmaxlength="60"></textarea>
                </label>
                <label for="phone" class="form-label">Phone
                    <input id="phone" type="tel" class="form-control" value=${phone} pattern="\([0-9]{3}\) [0-9]{4}[ -][0-9]{4}" title="(XXX) XXXX XXXX ó (XXX) XXXX-XXXX"
                    required>
                </label>
            </div>
            <div class="modal-footer">
                <button id='cancel' class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button id='edit' class="btn btn-success">Save</button>
            </div>
        </div>
    </div>`
    const cancel = document.getElementById("cancel");
    cancel.onclick = () => {
        modal.classList.add("nomostrar");
    };
};

