document.addEventListener('DOMContentLoaded', function() {
    const usernameInput = document.querySelector('input[name="username"]');
    const passwordInput = document.querySelector('input[name="password"]');

    const validateInput = (input, pattern, message) => {
        const error = input.nextElementSibling;
        if (!input.value.match(pattern)) {
            error.textContent = message;
            error.style.display = 'block';
        } else {
            error.style.display = 'none';
        }
    };

    usernameInput.addEventListener('blur', function() {
        const userPattern = /^[a-zA-Z0-9_]+$/;
        validateInput(this, userPattern, 'Username can only contain letters, numbers, and underscores.');
    });

    passwordInput.addEventListener('blur', function() {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
        validateInput(this, passwordPattern, 'Password must be at least 6 characters and include an uppercase letter, a number, and a special character.');
    });

    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        usernameInput.blur();
        passwordInput.blur();

        const errors = form.querySelectorAll('.error-message');
        const formIsValid = Array.from(errors).every((error) => error.style.display === 'none');
        
        if (formIsValid) {
            this.submit();
        }
    });
});
