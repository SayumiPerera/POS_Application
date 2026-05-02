//  password
document.getElementById('toggle_eye').addEventListener('click', function () {
    const input = document.getElementById('password_input');
    if (input.type === 'password') {
        input.type = 'text';
        this.classList.replace('bi-eye-slash', 'bi-eye');
    } else {
        input.type = 'password';
        this.classList.replace('bi-eye', 'bi-eye-slash');
    }
});

// Sign in
document.getElementById('signin_btn').addEventListener('click', function () {
    const username = document.getElementById('username_input').value;
    const password = document.getElementById('password_input').value;


    const correctUsername = 'sayumi';
    const correctPassword = '1234';

    if (username === '' || password === '') {
        alert('Please enter username and password');
        return;
    }

    if (username === correctUsername && password === correctPassword) {
        window.location.href = 'index.html';
    } else {
        alert('Invalid username or password!');
    }
});