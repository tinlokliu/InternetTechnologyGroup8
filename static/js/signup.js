document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
    const usernamePasswordPattern = /^[a-zA-Z0-9_]+$/;
    function createErrorMessage(input, message) {
        const error = input.nextElementSibling;
        error.innerText = message;
        error.style.display = 'block'; // 显示错误消息
      }

      function removeErrorMessage(input) {
        const error = input.nextElementSibling;
        error.style.display = 'none'; // 隐藏错误消息
      }
      grecaptcha.render('robot', {
        'sitekey': '6Lfjdd8UAAAAAKzWxI0k59BW5Tcf1C76XPKir1sr', //公钥
        'theme': 'light', //主题颜色，有light与dark两个值可选
        'size': 'compact',//尺寸规则，有normal与compact两个值可选
        'callback': callback, //验证成功回调
        'expired-callback': expiredCallback, //验证过期回调
        'error-callback': errorCallback //验证错误回调
    });
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            removeErrorMessage(this); 

            if (!this.value.trim()) {
                createErrorMessage(this, 'This field is required.');
                return;
            }

            if (this.name === 'email') {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!this.value.match(emailPattern)) {
                    createErrorMessage(this, 'Please enter a valid email address.');
                }
            } else if (this.name === 'password') {
                const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
                if (!this.value.match(passwordPattern)) {
                    createErrorMessage(this, 'Please enter a password which is at least 6 characters long and includes 1 uppercase letter, 1 number and 1 special character.');
                }
            } else if (this.name === 'confirm') {
                const password = document.querySelector('input[name="password"]').value;
                if (this.value !== password) {
                    createErrorMessage(this, 'Passwords do not match. Please try again.');
                }
            }else  if ((this.name === 'username' || this.name === 'password') && !this.value.match(usernamePasswordPattern)) {
                createErrorMessage(this, 'Username and password must only contain letters, numbers, and underscores.');
            }
    
        });
    });
});
