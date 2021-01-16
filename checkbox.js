const checkSelectAll = document.getElementById('selectAll');
const deleteConfirmModal = document.getElementById('deleteAll');
const deleteAllBtn = document.getElementById('confirmBtn')

/*CHECKBOX select All*/
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

/*Show and Hidden button*/
const toggleDeleteBtn = (e) => {
    if (e == true) {
        deleteConfirmModal.classList.remove('d-none');
        deleteConfirmModal.classList.add('d-block')
    } else {
        return deleteConfirmModal.classList.add('d-none');
    }
};

/* Eliminación multiple*/

const deleteAll = () => {
    const checks = document.querySelectorAll('.sel');
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