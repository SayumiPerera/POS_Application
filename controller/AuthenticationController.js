// =================== AuthenticationController.js ===================

// ---- Hardcoded Credentials (no backend needed) ----
const VALID_USERNAME = 'sayumi';
const VALID_PASSWORD = '1234';

// ---- Password Toggle ----
$('#toggle_eye').on('click', function () {
    const input = $('#password_input');
    if (input.attr('type') === 'password') {
        input.attr('type', 'text');
        $(this).removeClass('bi-eye-slash').addClass('bi-eye');
    } else {
        input.attr('type', 'password');
        $(this).removeClass('bi-eye').addClass('bi-eye-slash');
    }
});

// ---- Allow Enter key to sign in ----
$('#username_input, #password_input').on('keydown', function (e) {
    if (e.key === 'Enter') $('#signin_btn').click();
});

// ---- Sign In ----
$('#signin_btn').on('click', function () {
    const username = $('#username_input').val().trim();
    const password = $('#password_input').val();

    if (username === '' || password === '') {
        Swal.fire({ icon: "error", title: "Missing Fields!", text: "Please enter username and password." });
        return;
    }

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        Swal.fire({
            icon: "success",
            title: "Welcome back, " + username + "!",
            timer: 1200,
            showConfirmButton: false
        }).then(() => {
            window.location.href = 'index.html';
        });
    } else {
        Swal.fire({ icon: "error", title: "Invalid Credentials!", text: "Wrong username or password." });
        $('#password_input').val('');
    }
});

// ---- Logout ----
$('#logout_sidebar_tab').on('click', function () {
    Swal.fire({
        title: "Are you sure you want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout!"
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = 'login.html';
        }
    });
});