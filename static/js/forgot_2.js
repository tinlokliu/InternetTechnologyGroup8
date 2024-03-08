document.addEventListener('DOMContentLoaded', function() {
    // 获取表单和输入字段
    const form = document.querySelector('.u-form-1');
    const newPasswordInput = document.querySelector('#text-195d');
    const confirmPasswordInput = document.querySelector('#text-a82a');

    // 定义密码验证规则
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

    // 定义显示和隐藏错误信息的函数
    function createErrorMessage(input, message) {
        let error = input.nextElementSibling;
        // 如果下一个兄弟元素不是错误消息，创建一个新的
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

    // 为新密码和确认密码输入字段添加失焦事件监听
    [newPasswordInput, confirmPasswordInput].forEach(input => {
        input.addEventListener('blur', function() {
            // 移除先前的错误信息
            removeErrorMessage(this);

            // 验证密码非空和格式
            if (!this.value.trim()) {
                createErrorMessage(this, 'This field is required.');
            } else if (this.id === 'text-195d' && !passwordPattern.test(this.value)) {
                createErrorMessage(this, 'Password must be at least 6 characters long and include 1 uppercase letter, 1 number and 1 special character.');
            }

            // 验证密码是否一致
            if (this.id === 'text-a82a' && this.value !== newPasswordInput.value) {
                createErrorMessage(this, 'Passwords do not match. Please try again.');
            }
        });
    });

    // 表单提交事件
    form.addEventListener('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault();

        // 执行密码验证逻辑
        const newPassword = newPasswordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // 清除所有错误信息
        [newPasswordInput, confirmPasswordInput].forEach(removeErrorMessage);

        let isFormValid = true;

        // 验证密码
        if (!newPassword || !passwordPattern.test(newPassword)) {
            createErrorMessage(newPasswordInput, 'Password must be at least 6 characters long and include 1 uppercase letter, 1 number and 1 special character.');
            isFormValid = false;
        }

        // 验证密码匹配
        if (newPassword !== confirmPassword) {
            createErrorMessage(confirmPasswordInput, 'Passwords do not match. Please try again.');
            isFormValid = false;
        }

        // 如果表单验证通过，则执行表单提交逻辑
        if (isFormValid) {
            // 这里替换为您的提交逻辑
            // form.submit();
            console.log('Form is valid, performing submit...');
        }
    });
});
