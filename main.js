const showTableUsers = () => {
    fetch(`https://5ff3193428c3980017b18f70.mockapi.io/users`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

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