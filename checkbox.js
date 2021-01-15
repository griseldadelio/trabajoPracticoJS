/*CHECKBOX */
const checkSelectAll = document.getElementById('selectAll');
const deleteAllBtn = document.getElementById('deleteAll');


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

/*Delete All button*/

const toggleDeleteBtn = (e) => {
    if (e == true) {
        deleteAllBtn.classList.remove('d-none');
        deleteAllBtn.classList.add('d-block')
    } else {
        return deleteAllBtn.classList.add('d-none')
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
                    console.log(data);
                    toastr.success(`Usuario eliminado exitosamente`);
                    setTimeout(() => {
                        location.reload()
                    }, 1500);
                })
        }
    })
}

deleteAllBtn.addEventListener('click', deleteAll)