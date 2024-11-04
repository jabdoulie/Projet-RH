const employeeForm = document.getElementById('employeeForm');
const employeeTableBody = document.getElementById('employeeTableBody');

let employees = JSON.parse(localStorage.getItem('employees')) || [];

function renderTable() {
    employeeTableBody.innerHTML = '';
    employees.forEach((employee, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.age}</td>
            <td>${employee.position}</td>
            <td>
                <button onclick="editEmployee(${index})">Modifier</button>
                <button onclick="deleteEmployee(${index})">Supprimer</button>
            </td>
        `;
        employeeTableBody.appendChild(row);
    });
}

function saveToLocalStorage() {
    localStorage.setItem('employees', JSON.stringify(employees));
}

function addEmployee(name, age, position) {
    employees.push({ name, age, position });
    saveToLocalStorage();
    renderTable();
}

function editEmployee(index) {
    const employee = employees[index];
    document.getElementById('name').value = employee.name;
    document.getElementById('age').value = employee.age;
    document.getElementById('position').value = employee.position;

    employeeForm.onsubmit = (e) => {
        e.preventDefault();
        updateEmployee(index);
    };
}

function updateEmployee(index) {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const position = document.getElementById('position').value;

    employees[index] = { name, age, position };
    saveToLocalStorage();
    renderTable();
    resetForm();
}

function deleteEmployee(index) {
    employees.splice(index, 1);
    saveToLocalStorage();
    renderTable();
}

function resetForm() {
    employeeForm.reset();
    employeeForm.onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const position = document.getElementById('position').value;
        addEmployee(name, age, position);
        resetForm();
    };
}

employeeForm.onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const position = document.getElementById('position').value;
    addEmployee(name, age, position);
    resetForm();
};

renderTable();
