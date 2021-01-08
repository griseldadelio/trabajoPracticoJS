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







const showTableUsers = () => {
    fetch(`https://5ff3193428c3980017b18f70.mockapi.io/users`)
        .then(response => response.json())
        .then(data => {
            const showUser = data.map(user => {
                return `
                <tr id="detail-users"> 
                <td><input type="checkbox"></td>
                <td>${user.fullname}</td>
                <td>${user.email}</td>
                <td>${user.address}</td>
                <td>${user.phone}</td>
                <td>
                        <i class="material-icons edit" title="Edit">&#xE254;</i>
                        <i class="material-icons delete" id="${user.id}" title="Delete">&#xE872;</i>
                </td> 
                </tr>`;
            });
            document.getElementById('users-information').innerHTML = showUser;
        })
}
showTableUsers()

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



// const getUser = () => {
//     fetch(`${urlBase}/users/${userId}`)
//         .then(response => {
//             return response.json()

//         })
//         .then(data => {
//             document.getElementById('name').value = data.name;
//             document.getElementById('email').value = data.email;                        
//         })
//         .catch(error => console.log(error))
// }
// getUser()

// const updateUser = (e) => {
//     e.preventDefault()
//     fetch(`${urlBase}/users/${idModified}`, {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'Application/json'
//         },
//         body: JSON.stringify(createObject())
//     })
// }