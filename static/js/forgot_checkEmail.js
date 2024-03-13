 document.addEventListener('DOMContentLoaded', function () {
            var emailInput = document.getElementById('email-eb97');
            emailInput.addEventListener('blur', function () {
                var errorMessage = document.createElement('div');
                errorMessage.style.color = 'red';
                var emailValue = emailInput.value;
                var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                var errorElement = emailInput.nextElementSibling;

                // remove wrong message before
                if (errorElement) {
                    emailInput.parentNode.removeChild(errorElement);
                }

                // Verify that the mailbox is empty or incorrectly formatted
                if (!emailValue) {
                    errorMessage.textContent = 'Please enter your email address1.';
                    emailInput.parentNode.insertBefore(errorMessage, emailInput.nextSibling);
                } else if (!emailPattern.test(emailValue)) {
                    errorMessage.textContent = 'Please enter a valid email address.';
                    emailInput.parentNode.insertBefore(errorMessage, emailInput.nextSibling);
                }
            });
        });