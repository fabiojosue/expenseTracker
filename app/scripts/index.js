function loadExpense(){
    loadExpenseBtn(false);
    var expense = `
    <div class="card-container">
        <div class="card">
        <h3>Expense</h3>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash svg-icon" viewBox="0 0 16 16">
            <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
            <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z"/>
        </svg>
        <form action="">
            <div class="form-group">
                <!-- <label for="budget">Budget</label> -->
                <input type="text" id="title" name="title" class="form-control" placeholder="Title">
                <input type="text" id="amount" name="amount" class="form-control" placeholder="Amount">
                <select id="categoryDropdown" class="form-control">
                    <option value="">Category</option>
                </select>
            </div>
            <button class="updateButton" onclick="addExpense(event)">Add Expense</button>
        </form> 
    </div>
    `;
    const card = document.getElementById('expenseForm');
    if (card) {
        card.innerHTML = expense;
        populateCategories();
    } else {
        console.error('Element with id "expenseForm" not found.');
    }
}

function loadExpenseBtn(flag){
    if (flag){
        expenseBtn = `
        <button class="addButton" onclick="loadExpense()">Add Expense</button>
        `;
    } else {
        expenseBtn = ``;
    }
    const btn = document.getElementById('expenseFormBtn');
    btn.innerHTML = expenseBtn;

}

function populateCategories() {
    const categories = [
        { id: 1, name: 'Rent' },
        { id: 2, name: 'Utilities' },
        { id: 3, name: 'Groceries' },
        { id: 4, name: 'Transportation' },
        { id: 5, name: 'Entertainment' }
    ];

    const dropdown = document.getElementById('categoryDropdown');

    if (dropdown) {
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            dropdown.appendChild(option);
        });
    } else {
        console.error('Dropdown element not found.');
    }
}

function addExpense(event){
    event.preventDefault();
    const title = document.getElementById('title').value;
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('categoryDropdown').value;
    // Format the date as dd/mm/yyyy
    const dateObj = new Date();
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = dateObj.getFullYear();
    const date = `${day}/${month}/${year}`;

    const expense = {
        title,
        amount,
        category,
        date
    };

    // Retrieve existing expenses from localStorage
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Add the new expense to the array
    expenses.push(expense);

    // Save the updated expenses array back to localStorage
    localStorage.setItem('expenses', JSON.stringify(expenses));

    console.log(expense);

    document.getElementById('expenseForm').innerHTML = ``;

    // Redirect to the home page
    window.location.href = '/app/index.html';
}

 document.addEventListener('DOMContentLoaded', loadExpenseBtn(true));
