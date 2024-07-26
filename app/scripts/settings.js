// Validate the budget form
function validateBudgetForm() {
    const budgetInput = document.getElementById('budget');
    if (budgetInput) {
        const budgetValue = budgetInput.value.trim();
        if (isNaN(budgetValue) || budgetValue === '') {
            alert('Please enter a valid number for the budget.');
            return false;
        }
        return true;
    }
    return false;
}

// Validate the category form
function validateCategoryForm() {
    const categoryInput = document.getElementById('category');
    if (categoryInput) {
        const categoryValue = categoryInput.value.trim();
        if (categoryValue === '') {
            alert('Please enter a category name.');
            return false;
        }
        return true;
    }
    return false;
}

// Save budget to local storage
function saveBudget(budget) {
    localStorage.setItem('budget', budget);
}

// Save categories to local storage
function saveCategories(categories) {
    localStorage.setItem('categories', JSON.stringify(categories));
}

// Retrieve budget from local storage
function getBudget() {
    return localStorage.getItem('budget');
}

// Retrieve categories from local storage
function getCategories() {
    return JSON.parse(localStorage.getItem('categories')) || [];
}

// Handle budget form submission
function handleBudgetFormSubmit(event) {
    event.preventDefault();
    if (validateBudgetForm()) {
        const budgetInput = document.getElementById('budget');
        const budget = budgetInput.value.trim();
        saveBudget(budget);
        alert('Budget saved successfully!');
        budgetInput.value = ''; // Clear the input
        window.location.href = '/app/pages/settings.html';
    }
}

// Handle category form submission
function handleCategoryFormSubmit(event) {
    event.preventDefault();
    if (validateCategoryForm()) {
        const categoryInput = document.getElementById('category');
        const category = categoryInput.value.trim();
        let categories = getCategories();
        categories.push(category);
        saveCategories(categories);
        alert('Category added successfully!');
        categoryInput.value = ''; // Clear the input
        window.location.href = '/app/pages/settings.html';
    }
}

// Add event listeners to forms
function setupFormListeners() {
    const budgetForm = document.getElementById('budgetForm');
    const categoryForm = document.getElementById('categoryForm');

    if (budgetForm) {
        budgetForm.addEventListener('submit', handleBudgetFormSubmit);
    }

    if (categoryForm) {
        categoryForm.addEventListener('submit', handleCategoryFormSubmit);
    }
}

/**
 * Loads and displays the categories table from localStorage.
 * If there are no categories, displays a message indicating no categories are added.
 */
function loadCategoryTable() {
    // Retrieve categories from localStorage or initialize an empty array if none exist
    const categories = JSON.parse(localStorage.getItem('categories')) || [];
    
    // Get the container and table elements from the DOM
    const tableContainer = document.getElementById('categoryTableContainer');
    const table = document.getElementById('categoryTable');

    // Clear any existing content in the table
    table.innerHTML = `
        <h3>Categories</h3>
        <li class="table-header">
            <div class="colt header-col-1">Category Name</div>
            <div class="colt header-col-2"></div>
        </li>
    `;

    // Check if there are no categories
    if (categories.length === 0) {
        // Display a message indicating no categories added
        tableContainer.innerHTML = '<h2 style="margin-bottom:1rem;">No categories added!</h2>';
    } else {
        // Loop through each category and create a table row for each
        categories.forEach(category => {
            const row = document.createElement('li');
            row.classList.add('table-row');
            row.innerHTML = `
                <div class="colt header-col-1" data-label="Category name">${category}</div>
                <div class="colt header-col-2" data-label="Delete">
                    <button class="cancelButton" onclick="deleteCategory('${category}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill icon" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                        </svg>
                    </button>
                </div>
            `;
            table.appendChild(row);
        });
    }
}

/**
 * Deletes a category from the localStorage based on the category name, then reloads the table.
 * @param {string} categoryName - The name of the category to be deleted.
 */
function deleteCategory(categoryName) {
    // Retrieve categories from localStorage or initialize an empty array if none exist
    let categories = JSON.parse(localStorage.getItem('categories')) || [];
    
    // Filter out the category to be deleted
    categories = categories.filter(category => category !== categoryName);
    
    // Save the updated categories array back to localStorage
    localStorage.setItem('categories', JSON.stringify(categories));
    
    // Refresh the table after deletion
    loadCategoryTable();
}

// Setup event listeners on DOMContentLoaded
document.addEventListener('DOMContentLoaded', (event) => {
    setupFormListeners();
    loadCategoryTable();
});
