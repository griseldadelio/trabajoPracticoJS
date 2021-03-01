### Devolución TP3

A continuación les dejo algunos puntos a tener en cuenta.

#### HTML

- Cudado xq en algunos casos no unifican criterios a la hora de resolver los elementos, en algunos casos crean elementos completamente desde el js y en otros casos crean solo partes. Eso genera cierta dificultad a la hora de mantener el código.

```js
const showTableEmployee = (data) => {
  let dataBase = "";
  data.forEach((element) => {
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
        </tr>`;
  });
  tableBody.innerHTML = dataBase;
};
```

- Esto hubiese quedado mas prolijo si creaban elementos de DOM. Encontré algunos casos más.

---

#### JS

- La organización de las funciones en dos archivos me gusto xq simplifica el mantenimiento pero por ejemplo el filtro lo hicieron en core y el resto de eventos en services.
- La indentación esta excelente.
- Utilizaron nombres de variables que ayudaron mucho a identificar los datos.

---

#### Conclusión

Excelente trabajo práctico chicas. Hay detalles (mínimos) que podrían optimizarse pero lo que hicieron superó por lejos mis expectativas. Felicitaciones!

---

| Ejercicio  | Puntuación |
| ------------- | ------------- |
| 3  | 9  |
| 4  | 10  |
| 5  | 10  |
| 6  | 10  |
| 7  | 10  |
| ------------- | ------------- |
| Diseño  | Muy bien  |
| Validaciones  | Muy bien  |
| Indentación de código  | Muy bien  |
| Nombres de variables  | Muy bien  |
| Uso de let y const  | Muy bien  |
| Arrow functions  | Muy bien  |

---

#### Nota: 10