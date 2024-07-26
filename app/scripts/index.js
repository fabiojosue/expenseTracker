// import { getBudget, getCategories } from './settings.js';

/**
 * Loads and displays the expense form into the 'expenseForm' element.
 * Also populates the category dropdown with predefined categories.
 */
function loadExpense() {
    loadExpenseBtn(false); // Hide the 'Add Expense' button
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
                    <!-- Input fields for expense title, amount, and category -->
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
        card.innerHTML = expense; // Insert the expense form HTML into the element
        populateCategories(); // Populate the category dropdown
    } else {
        console.error('Element with id "expenseForm" not found.');
    }
}

/**
 * Shows or hides the 'Add Expense' button based on the provided flag.
 * @param {boolean} flag - If true, displays the button; if false, hides it.
 */
function loadExpenseBtn(flag) {
    let expenseBtn = flag ?
        `<button class="addButton" onclick="loadExpense()">Add Expense</button>` :
        ``;
    const btn = document.getElementById('expenseFormBtn');
    if (btn) {
        btn.innerHTML = expenseBtn; // Update the button HTML
    } else {
        console.error('Element with id "expenseFormBtn" not found.');
    }
}

// Populates the category dropdown with categories from localStorage.
function populateCategories() {
    // Retrieve categories from localStorage
    const categories = JSON.parse(localStorage.getItem('categories')) || [];

    const dropdown = document.getElementById('categoryDropdown');
    if (dropdown) {
        // Clear existing options
        dropdown.innerHTML = '<option value="">Category</option>';

        // Add each category as an option in the dropdown
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            dropdown.appendChild(option);
        });
    } else {
        console.error('Dropdown element not found.');
    }
}

// Validates the expense form input
function validateExpenseForm(title, amount, category) {
    if (title.trim() === '') {
        alert('Please enter a Title.');
        return false;
    }
    if (amount.trim() === '' || isNaN(amount)) {
        alert('Amount must be a valid number.');
        return false;
    }
    if (category === '' || category === 'Category') {
        alert('Please select a valid category.');
        return false;
    }
    return true;
}

/**
 * Handles the expense form submission.
 * Prevents default form submission, collects form data, and saves it to localStorage.
 * Redirects to the home page after saving the expense.
 * @param {Event} event - The submit event object.
 */
function addExpense(event) {
    event.preventDefault(); // Prevent the form from submitting the default way

    // Get form values
    const title = document.getElementById('title').value;
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('categoryDropdown').value;

    // Validate form inputs
    if (!validateExpenseForm(title, amount, category)) {
        return; // Stop further execution if validation fails
    }

    // Format the current date as dd/mm/yyyy
    const dateObj = new Date();
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = dateObj.getFullYear();
    const date = `${day}/${month}/${year}`;

    // Create expense object
    const expense = {
        title,
        amount,
        category,
        date
    };

    // Retrieve existing expenses from localStorage or initialize an empty array
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Add the new expense to the array
    expenses.push(expense);

    // Save the updated expenses array back to localStorage
    localStorage.setItem('expenses', JSON.stringify(expenses));

    console.log(expense); // Log the expense to the console for debugging

    // Clear the expense form and redirect to the home page
    document.getElementById('expenseForm').innerHTML = '';
    window.location.href = '/app/index.html';
}


// Initialize the 'Add Expense' button when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => loadExpenseBtn(true));
