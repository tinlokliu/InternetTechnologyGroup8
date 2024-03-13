// Listen for the DOMContentLoaded event to ensure the DOM is fully loaded before executing the script.
document.addEventListener('DOMContentLoaded', function() {
    // Select the form element and all text, email, and password input fields within it.
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
    // Define a pattern for validating usernames and passwords.
    const usernamePasswordPattern = /^[a-zA-Z0-9_]+$/;

    // Function to create and display an error message next to an input field.
    function createErrorMessage(input, message) {
        const error = input.nextElementSibling;
        error.innerText = message;
        error.style.display = 'block';
    }

    // Function to remove an existing error message from an input field.
    function removeErrorMessage(input) {
        const error = input.nextElementSibling;
        error.style.display = 'none'; // Hide error message
    }

    // Add a 'blur' event listener to each input field for validation.
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            removeErrorMessage(this); // First, remove any existing error messages.

            // Check if the field is empty and display an error if true.
            if (!this.value.trim()) {
                createErrorMessage(this, 'This field is required.');
                return;
            }

            // Email validation: check if the input matches the email pattern.
            if (this.name === 'email') {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!this.value.match(emailPattern)) {
                    createErrorMessage(this, 'Please enter a valid email address.');
                }
            // Password validation: check if the input matches the password pattern.
            } else if (this.name === 'password') {
                const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
                if (!this.value.match(passwordPattern)) {
                    createErrorMessage(this, 'Please enter a password which is at least 6 characters long and includes 1 uppercase letter, 1 number and 1 special character.');
                }
            // Confirm password validation: check if it matches the previously entered password.
            } else if (this.name === 'confirm') {
                const password = document.querySelector('input[name="password"]').value;
                if (this.value !== password) {
                    createErrorMessage(this, 'Passwords do not match. Please try again.');
                }
            // Username and password pattern validation: check if they only contain allowed characters.
            } else if ((this.name === 'username' || this.name === 'password') && !this.value.match(usernamePasswordPattern)) {
                createErrorMessage(this, 'Username and password must only contain letters, numbers, and underscores.');
            }
        });
    });
    
    // Callback functions for reCAPTCHA validation.
    var callback = function (args) {
        console.log(args);
        console.log('successful authentication');
    };

    var expiredCallback = function (args) {
        console.log(args);
        console.log('Validation expiration\n' +
            '\n');
    };

    var errorCallback = function (args) {
        console.log(args);
        console.log('authentication failed');
    };

    // Function to initialize and render the reCAPTCHA widget.
    function recaptchaCallback() {
    grecaptcha.render('robot', {
        'sitekey': '6Lc8spcpAAAAAFzbEYYcoC6AVnqz8mTJGXevFtUm',
        'theme': 'light',
        'size': 'compact',
        'callback': callback,
        'expired-callback': expiredCallback,
        'error-callback': errorCallback
    });
}
});
