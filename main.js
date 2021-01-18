const tableBody = document.getElementById('users-information')
const editIcon = document.getElementsByClassName("edit");
const deleteIcon = document.getElementsByClassName("delete");
const form = document.getElementById("formUserInformation");
const urlBase = 'https://5ff3193428c3980017b18f70.mockapi.io';


/*Construcción del empleado*/
const createEmployee = () => {
    const fullname = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;

    return { fullname, email, address, phone }
}

/*validaciones de datos*/
const validateEmployee = (user) => {
    validateEmail(user.email);
    validateName(user.fullname);
    validateAddress(user.address);
}

/* Funcion para traer los datos */

const getEmployee = () => {
    fetch(`${urlBase}/users`)
        .then(response => response.json())
        .then(data => {
            showEmployee(data)
            editEmployee(data)
            setEventDelete(data)
        })
}
getEmployee()


/* Funcion para mostrar los usuarios en tabla */

const showEmployee = (data) => {
    let dataBase = '';
    data.forEach(element => {
        dataBase += `
        <tr>
        <td><input id="checkbox" type="checkbox" name="check" class="sel" data-employee-id="${element.id}"></td>
        <td>${element.fullname}</td>
        <td>${element.email}</td>
        <td>${element.address}</td>
        <td>${element.phone}</td>
        <td>
            <i type="button" class="material-icons edit bg-light text-secondary rounded me-3" id="${element.id}"  title="Edit">&#xE254;</i>
            <i type="button" class="material-icons delete bg-danger text-light rounded" id="${element.id}" title="Delete">&#xE872;</i>
        </td>
        </tr>`
    });
    tableBody.innerHTML = dataBase;
}

/* Funcion para crear Usuario nuevo */

const registerEmployee = (e) => {
    e.preventDefault()
    const user = createEmployee();
    if (validateEmployee(user) == false) {
        return
    }
    fetch(`${urlBase}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(user)
    })
        .then(data => {
            toastr.success(`Empleado registrado exitosamente`)
            getEmployee(data)
            setTimeout(() => {
                location.reload()
            }, 2000);
        })
        .catch(error => {
            console.error(error)
            toastr.error('Se ha producido un error, por favor intenta más tarde')
        })
}

form.addEventListener('submit', registerEmployee);


/* Funcion para editar los datos del Usuario */

const editEmployee = (data) => {

    for (let i = 0; i < editIcon.length; i++) {
        editIcon[i].onclick = () => {
            const edit = editIcon[i].id
            data.forEach(element => {
                if (element.id == edit) {
                    modal.classList.remove('nomostrar')
                    modalNewEmployee(element.fullname, element.email, element.address, element.phone)
                    const save = document.getElementById('edit')

                    save.onclick = () => {
                        const user = createEmployee()
                        if (validateEmployee(user) == false) {
                            return
                        }

                        fetch(`${urlBase}/users/${element.id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(user),
                        })
                            .then(response => response.json())
                            .then(data => {
                                toastr.success(`Empleado actualizado exitosamente`);
                                tableBody.innerHTML = "";
                                getEmployee(data);
                                setTimeout(() => {
                                    location.reload()
                                }, 2000);
                            })
                    }
                }
            })
        }
    }
}

/* Funcion para Filtrar lista de usuarios */

const filterEmployee = () => {
    const selectEmployee = document.getElementById("filter");
    selectEmployee.onkeypress = e => {
        if (e.code === "Enter") {
            e.preventDefault();
            fetch(`${urlBase}/users?search=${selectEmployee.value}`)
                .then(response => response.json())
                .then(data => {
                    showEmployee(data)
                    setEventDelete(data)
                })
        }
    }
}
filterEmployee()

/* Funcion para eliminar Usuario */

const setEventDelete = (data) => {
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
                                        getEmployee(data);
                                        toastr.success(`Usuario eliminado exitosamente`);
                                        setTimeout(() => {
                                            location.reload()
                                        }, 2000);
                                    })
                            })
                    }
                }
            });
        }
    }
}

/* Modal para las funciones edit y delete */

const modalNewEmployee = (name = "", email = "", address = "", phone = "") => {
    modal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" >Employee info</h5>
            </div>
            <div class="modal-body d-flex flex-column" id="modalBody">
                <label for="name" class="form-label">Name
                    <input id="name" type="text" class="form-control" value="${name}" requiredmaxlength="50">
                </label>
                <label for="email" class="form-label">Email
                    <input id="email" type="email" class="form-control" value="${email}" required>
                </label>
                <label for="address" class="form-label">Address
                    <textarea id="address" class="form-control" requiredmaxlength="60">${address}</textarea>
                </label>
                <label for="phone" class="form-label">Phone
                    <input id="phone" type="tel" class="form-control" value="${phone}" pattern="\([0-9]{3}\) [0-9]{4}[ -][0-9]{4}" title="(XXX) XXXX XXXX ó (XXX) XXXX-XXXX"
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
