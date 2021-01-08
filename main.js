const tableBody = document.getElementById('users-information')
const editIcon = document.getElementsByClassName("edit");
const deleteIcon = document.getElementsByClassName("delete");
const form = document.getElementById("formUserInformation");
const urlBase = 'https://5ff3193428c3980017b18f70.mockapi.io';

const createObject = () => {
    const fullname = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;

    return { fullname, email, address, phone }
}

const validateObject = (user) => {
    validateEmail(user.email);
    validatePhone(user.phone);

    if (user.fullname.length > 50) {
        alert('Exceso de caracteres')
    }

    if (user.address > 60) {
        alert('Exceso de caracteres')
    }
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
        <td><input type="checkbox"></td>
        <td>${element.fullname}</td>
        <td>${element.email}</td>
        <td>${element.address}</td>
        <td>${element.phone}</td>
        <td>
            <i class="material-icons edit bg-warning" id="${element.id}"  title="Edit">&#xE254;</i>
            <i class="material-icons delete bg-danger" id="${element.id}" title="Delete">&#xE872;</i>
        </td> 
        </tr>`
    });
    tableBody.innerHTML = dataBase;
}


/* Funcion para crear Usuario nuevo */

const registerUser = (e) => {
    e.preventDefault()
    const user = createObject();
    if (validateObject(user) == false) {
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
            alert('Registro generado exitosamente')
            location.reload()
        })
        .catch(error => {
            console.error(error)
            alert('Se ha producido un error')
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
                        createObject()
                        const newEmployee = {
                            fullname: name,
                            email: email,
                            address: address,
                            phone: phone,
                        };
                        fetch(`${urlBase}/users/${element.id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(newEmployee),
                        })
                            .then(response => response.json())
                            .then(data => {
                                getUsers(data);
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
                                        getUsers(data)
                                    })
                            })
                    }
                }
            });
        }
    }
}


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
                    <h5 class="modal-title" > Employee Info</h5>
                </div>        
                <div class="modal-body" id="modalBody">
                    <div class="container-fluid">
                        <div class="form-group column">
                            <label for="name" class="col-sm-2 col-form-label">Name</label>
                                <div class="col-sm-10">
                                    <input type="text" id="name" class="form-control"  maxlength="50" value=${name}>
                                </div>
                        </div>
                        <div class="form-group column">
                            <label for="name" class="col-sm-2 col-form-label">Email</label>
                                <div class="col-sm-10">
                                    <input type="email" id="email" class="form-control"  maxlength="50" value=${email}>
                                </div>
                        </div>
                        <div class="form-group column">
                            <label for="name" class="col-sm-2 col-form-label">Adress</label>
                                <div class="col-sm-10">
                                    <textarea id="address" class="form-control" value=${address}></textarea>
                                </div>
                        </div>
                        <div class="form-group column">
                            <label for="name" class="col-sm-2 col-form-label">Phone</label>
                            <div class="col-sm-10">
                                <input type="text" id="phone" class="form-control"  maxlength="50" value=${phone}>
                            </div>
                        </div>                         
                    </div>                 
                </div>  
                <div class="modal-footer bg-light">
                    <button id='cancel' class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                    <button id='edit' class="btn btn-success">Save</button>
                </div>                                      
            </div>
        </div>`
    const cancel = document.getElementById("cancel");
    cancel.onclick = () => {
        modal.classList.add("nomostrar");
    };
};
