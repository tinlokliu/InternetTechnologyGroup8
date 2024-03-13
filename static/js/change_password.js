document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const newPassword1 = document.getElementById("new_password1");
    const newPassword2 = document.getElementById("new_password2");
    const errorDiv = document.createElement("div");
    errorDiv.style.color = "red";

    form.addEventListener("submit", function (e) {
        let valid = true;
        errorDiv.innerHTML = ""; // clear error massage before

        // Password format verification
        if (!newPassword1.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)) {
            valid = false;
            const msg = document.createTextNode("Password must be at least 8 characters long, contain a number, an uppercase and a lowercase letter.");
            errorDiv.appendChild(msg);
            newPassword1.parentNode.insertBefore(errorDiv, newPassword1.nextSibling);
        }

        // Verify password consistency
        if (newPassword1.value !== newPassword2.value) {
            valid = false;
            const msg = document.createTextNode(" The two passwords do not match.");
            errorDiv.appendChild(msg);
            newPassword2.parentNode.insertBefore(errorDiv, newPassword2.nextSibling);
        }

        // Block form submission if there are errors
        if (!valid) {
            e.preventDefault();
        }
    });
});
