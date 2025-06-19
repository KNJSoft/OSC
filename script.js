// Gestion de l'annuaire des employés

// Sélection des éléments du DOM
const form = document.getElementById('employeeForm');
const tableBody = document.getElementById('employeeTableBody');

// Tableau pour stocker les employés
let employees = [];

// Fonction de validation d'email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Charger les employés depuis localStorage au démarrage
function loadEmployees() {
    const savedEmployees = localStorage.getItem('employees');
    if (savedEmployees) {
        employees = JSON.parse(savedEmployees);
        renderEmployees();
    }
}

// Sauvegarder les employés dans localStorage
function saveEmployees() {
    localStorage.setItem('employees', JSON.stringify(employees));
}

// Ajouter un employé
function addEmployee(firstName, lastName, email, position) {
    const employee = {
        id: Date.now(), // Identifiant unique
        firstName,
        lastName,
        email,
        position
    };
    employees.push(employee);
    saveEmployees();
    renderEmployees();
}

// Supprimer un employé
function deleteEmployee(id) {
    employees = employees.filter(emp => emp.id !== id);
    saveEmployees();
    renderEmployees();
}

// Afficher les employés dans le tableau
function renderEmployees() {
    // Vider le tableau avant de réafficher
    tableBody.innerHTML = '';

    // Ajouter chaque employé à la table
    employees.forEach(emp => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td data-label="Nom Complet">${emp.firstName} ${emp.lastName}</td>
            <td data-label="Email">${emp.email}</td>
            <td data-label="Fonction">${emp.position}</td>
            <td data-label="Action"><button class="delete-btn" onclick="deleteEmployee(${emp.id})">Supprimer</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Gestionnaire de soumission du formulaire
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Récupérer les valeurs du formulaire
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const position = document.getElementById('position').value.trim();

    // Validation des champs
    if (!firstName || !lastName || !position) {
        alert('Tous les champs sont obligatoires.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Veuillez entrer un email valide.');
        return;
    }

    // Ajouter l'employé
    addEmployee(firstName, lastName, email, position);

    // Réinitialiser le formulaire
    form.reset();
});

// Charger les employés existants au démarrage
loadEmployees();
