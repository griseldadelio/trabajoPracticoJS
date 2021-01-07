const tableBody = document.getElementById('users-information')

const showUsers = (data) => {
    let base = '';
    data.forEach(element => {
        base += `
        <tr> 
        <td><input type="checkbox"></td>
        <td>${element.fullname}</td>
        <td>${element.email}</td>
        <td>${element.address}</td>
        <td>${element.phone}</td>
        <td>
            <i class="material-icons edit" id="edit-${element.id}"  title="Edit">&#xE254;</i>
            <i class="material-icons delete" id="delete${element.id}" title="Delete">&#xE872;</i>
        </td> 
        </tr>`
    });
    tableBody.innerHTML = base;
}


const editIcon = document.getElementsByClassName("edit");
const deleteIcon = document.getElementsByClassName("delete");

const getUsers = () => {
    fetch(`https://5ff3193428c3980017b18f70.mockapi.io/users`)
        .then(response => response.json())
        .then(data => {
            showUsers(data)

            for (let i = 0; i < editIcon.length; i++) {
                editIcon[i].onclick = () => {
                    const edit = editIcon[i].id
                    data.forEach(element => {
                        if (element.id == edit.split('-')[1]) {
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
                                fetch(`https://5ff3193428c3980017b18f70.mockapi.io/users/${element.id}`, {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(newEmployee),
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        console.log(data)
                                        modal.classList.add('nomostrar')
                                        getUsers();
                                    })
                            }
                        }
                    })
                }
            }
        })
}
getUsers()


// Filter
const selectEmployee = document.getElementById("filter");
selectEmployee.onkeypress = e => {
    if (e.keyCode === 13) {
        e.preventDefault();
        fetch(`https://5ff3193428c3980017b18f70.mockapi.io/users?search=${selectEmployee.value}`)
            .then(response => response.json())
            .then(data => {
                showUsers(data)
            })
    }
}


//LO ARME PARA NO PISAR LO TUYO, LO DEBERIAMOS ADAPTAR

const modalNewEmployee = (name = "", email = "", address = "", phone = "") => {
    modal.innerHTML = `
    <div>
      <h6>Add Employee</h6>
      <hr>
    </div>
    <form action="" method="get" class="modal-form">
      <label>Name</label><br>
        <input type="text" id="employee_name" maxlength="50" value=${name}>
      <label>Email</label><br>
        <input type="text" id="employee_email" value=${email}>
      <label>Address</label><br>
        <input type="text" name="Address" id="employee_address" maxlength="60" value=${address}> 
      <label>Phone</label><br>
        <input type="text" id="employee_phone" value=${phone}>
    </form>
    <div class="div-button">
      <button id="cancel">Cancel</button>
        ${name ? '<button id="edit">Save</button></div>' : '<button id="createNewEmployee">Add</button></div>'}
    `
};