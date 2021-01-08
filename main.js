const urlBase = 'https://5ff3193428c3980017b18f70.mockapi.io';
const tableBody = document.getElementById('users-information')
const editIcon = document.getElementsByClassName("edit");
const deleteIcon = document.getElementsByClassName("delete");

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
            <i class="material-icons edit" id="${element.id}"  title="Edit">&#xE254;</i>
            <i class="material-icons delete" id="${element.id}" title="Delete">&#xE872;</i>
        </td> 
        </tr>`
    });
    tableBody.innerHTML = dataBase;
}

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
                        const name = document.getElementById("employee_name").value
                        const email = document.getElementById("employee_email").value
                        const address = document.getElementById("employee_address").value
                        const phone = document.getElementById("employee_phone").value
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
                    alert('Para guardar sus cambios presione save, al aceptar esta ventana')
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


//LO ARME PARA NO PISAR LO TUYO, LO DEBERIAMOS ADAPTAR

const modalNewEmployee = (name = "", email = "", address = "", phone = "") => {
    modal.innerHTML = `
    <form action="" method="get" class="modal-form">
      <label>Name</label>
        <input type="text" id="employee_name" maxlength="50" value=${name}>
      <label>Email</label>
        <input type="text" id="employee_email" value=${email}>
      <label>Address</label>
        <input type="text" name="Address" id="employee_address" maxlength="60" value=${address}> 
      <label>Phone</label><br>
        <input type="text" id="employee_phone" value=${phone}>
    </form>
    <div class="div-button">
        <button id="cancel">Cancel</button>
        <button id="edit">Save</button>
    </div>`
    const cancel = document.getElementById("cancel");
    cancel.onclick = () => {
        modal.classList.add("nomostrar");
    };
};
