const tableBody = document.getElementById('users-information')
const editIcon = document.getElementsByClassName("edit");
const deleteIcon = document.getElementsByClassName("delete");
const form = document.getElementById("formUserInformation");
const urlBase = 'https://5ff3193428c3980017b18f70.mockapi.io';

/* 
Funcion para traer los datos
 */

const getEmployee = () => {
    fetch(`${urlBase}/users`)
        .then(response => response.json())
        .then(data => {
            showTableEmployee(data)
            editEmployee(data)
            setEventDelete(data)
        })
}
getEmployee()


/*
 Funcion para crear Usuario nuevo
  */

const registerEmployee = (e) => {
    e.preventDefault()
    const user = createEmployee();
    let isValid = validateEmployee(user);
    if (!isValid) {
        toastr.error("verifique los datos ingresados");
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


/* 
Funcion para editar los datos del Usuario
 */

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
                        const user = createEmployee();
                        let isValid = validateEmployee(user);
                        if (!isValid) {
                            toastr.error("verifique los datos ingresados");
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


/* 
Funcion para eliminar Usuario (row)
 */

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


/* 
Eliminación multiple de 
*/

const deleteAll = (e) => {
    const checks = document.querySelectorAll('.sel');
    toggleDeleteBtn(e.target.checked)
    checks.forEach((cheak) => {
        if (cheak.checked == true) {
            fetch(`${urlBase}/users/${cheak.dataset.employeeId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            })
                .then(response => response.json())
                .then(data => {
                    toastr.success(`Empleado eliminado exitosamente`);
                    tableBody.innerHTML = "";
                    getEmployee(data);
                })
        }
    })
}

deleteAllBtn.addEventListener('click', deleteAll)
