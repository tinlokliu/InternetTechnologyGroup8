document.addEventListener('DOMContentLoaded', function() {
    // Gets the form and input fields
    const form = document.querySelector('.u-form-1');
    const newPasswordInput = document.querySelector('#text-195d');
    const confirmPasswordInput = document.querySelector('#text-a82a');

    //Define password authentication rules
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

    // Define functions that show and hide error messages
    function createErrorMessage(input, message) {
        let error = input.nextElementSibling;
        // If the next sibling element is not an error message, create a new one
        if (!error || !error.classList.contains('error-message')) {
            error = document.createElement('div');
            error.classList.add('error-message');
            input.parentNode.insertBefore(error, input.nextSibling);
        }
        error.innerText = message;
        error.style.display = 'block';
    }


    function removeErrorMessage(input) {
        const error = input.nextElementSibling;
        if (error && error.classList.contains('error-message')) {
            error.style.display = 'none';
        }
    }

    // Add out-of-focus event listening for the new password and confirm password input fields
    [newPasswordInput, confirmPasswordInput].forEach(input => {
        input.addEventListener('blur', function() {
            removeErrorMessage(this);

            // Verify that the password is not empty and formatted
            if (!this.value.trim()) {
                createErrorMessage(this, 'This field is required.');
            } else if (this.id === 'text-195d' && !passwordPattern.test(this.value)) {
                createErrorMessage(this, 'Password must be at least 6 characters long and include 1 uppercase letter, 1 number and 1 special character.');
            }

            // Verify that the passwords are consisten
            if (this.id === 'text-a82a' && this.value !== newPasswordInput.value) {
                createErrorMessage(this, 'Passwords do not match. Please try again.');
            }
        });
    });


    form.addEventListener('submit', function(e) {

        e.preventDefault();

        // Execute password authentication logic
        const newPassword = newPasswordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();


        [newPasswordInput, confirmPasswordInput].forEach(removeErrorMessage);

        let isFormValid = true;


        if (!newPassword || !passwordPattern.test(newPassword)) {
            createErrorMessage(newPasswordInput, 'Password must be at least 6 characters long and include 1 uppercase letter, 1 number and 1 special character.');
            isFormValid = false;
        }


        if (newPassword !== confirmPassword) {
            createErrorMessage(confirmPasswordInput, 'Passwords do not match. Please try again.');
            isFormValid = false;
        }


        if (isFormValid) {

            form.submit();
            console.log('Form is valid, performing submit...');
        }
    });
});
