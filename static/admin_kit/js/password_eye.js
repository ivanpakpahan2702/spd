
document.addEventListener('DOMContentLoaded', () => {
const passwordInputs = document.querySelectorAll('input[type="password"]');

passwordInputs.forEach(input => {
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(input);
    input.style.paddingRight = '30px';

    const toggleIcon = document.createElement('i');
    toggleIcon.className = 'fa fa-eye toggle-password';
    toggleIcon.style.position = 'absolute';
    toggleIcon.style.right = '10px';
    toggleIcon.style.top = '50%';
    toggleIcon.style.transform = 'translateY(-50%)';
    toggleIcon.style.cursor = 'pointer';

    wrapper.appendChild(toggleIcon);

    toggleIcon.addEventListener('click', () => {
    if (input.type === 'password') {
        input.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
    });
});
});