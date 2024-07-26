document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the stored username from local storage
    const storedUsername = localStorage.getItem('user');
    console.log(storedUsername);

    // Add event listener to the login button
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        loginButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default form submission

            // Get the entered username
            const enteredUsername = document.getElementById('username').value;
            console.log(enteredUsername);

            // Check if the entered username matches the stored username
            if (enteredUsername === storedUsername) {
                // Redirect to the home page if the username matches
                window.location.href = '/app/index.html';
            } else {
                // Display an error message if the username does not match
                document.getElementById('loginMessage').textContent = 'Invalid username. Please try again.';
            }
        });
    }
});
