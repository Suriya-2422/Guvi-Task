$(document).ready(function() {
    $("#pwd-eye").click(function() {
        $(this).toggleClass("fa-eye-slash");
        $(this).toggleClass("fa-eye");
        $("#pwd").attr("type", (i, val) => val === "text" ? "password" : "text");
    })

    function isValidEmail(email) {
        return /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(email);
    }
    
    function validateEmail(email) {
        if ( isValidEmail(email) ) {
            $("#email").css("border", "2px solid green");
            $("#email-helper").html("Email is valid").css("color", "green");
        } else {
            $("#email").css("border", "2px solid red");
            $("#email-helper").html("Enter a valid email").css("color", "red");
        }
    }

    $("#email").blur( function() { validateEmail($(this).val()); });
});