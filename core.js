const checkSelectAll = document.getElementById('selectAll');
const deleteConfirmModal = document.getElementById('deleteAll');
const deleteAllBtn = document.getElementById('confirmBtn')

/*
Construcción del empleado
*/
const createEmployee = () => {
    const fullname = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;

    return { fullname, email, address, phone }
}

/*
validaciones de datos
*/
const validateEmployee = (user) => {

    if (user.fullname === null || user.fullname.trim().lenght > 50) {
        return false
    }

    const expressionValidEmail = user.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    if (!expressionValidEmail) {
        return false
    }

    const expressionValidAddress = user.address.match(/d+[ ](?:[A-Za-z0-9.-]+[ ]?)+(?:Avenida|calle|Boulevard|Av|Bvd)\.?/);
    if (expressionValidAddress || user.address === null) {
        return false
    }

    return true
}


/* 
Funcion para mostrar los usuarios en tabla
 */

const showTableEmployee = (data) => {
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
/* 
Funcion para Filtrar lista de usuarios
 */

const filterEmployee = () => {
    const selectEmployee = document.getElementById("filter");
    selectEmployee.onkeypress = e => {
        if (e.code === "Enter") {
            e.preventDefault();
            fetch(`${urlBase}/users?search=${selectEmployee.value}`)
                .then(response => response.json())
                .then(data => {
                    showTableEmployee(data)
                    setEventDelete(data)
                })
        }
    }
}
filterEmployee()

/* 
Modal para las funciones edit y delete 
*/

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

/*
Checkbox select All
*/
const selectAll = (e) => {
    const checks = document.querySelectorAll('.sel');
    toggleDeleteBtn(e.target.checked)
    if (e.target.checked == true) {
        checks.forEach((cheks) => {
            cheks.checked = true;
        });
    } else {
        checks.forEach((cheks) => {
            cheks.checked = false;
        })
    }
}

checkSelectAll.addEventListener('change', selectAll)

/*
Show and Hidden button
*/
const toggleDeleteBtn = (e) => {
    if (e == true) {
        deleteConfirmModal.classList.remove('d-none');
        deleteConfirmModal.classList.add('d-block')
    } else {
        return deleteConfirmModal.classList.add('d-none');
    }
};

