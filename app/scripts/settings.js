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
export function getBudget() {
    return localStorage.getItem('budget');
}

// Retrieve categories from local storage
export function getCategories() {
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

// Setup event listeners on DOMContentLoaded
document.addEventListener('DOMContentLoaded', setupFormListeners);
