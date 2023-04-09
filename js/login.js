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
            $("#email").css("border", "1px solid grey");
            $("#email-helper").html("").css("color", "green");
        } else {
            $("#email").css("border", "2px solid red");
            $("#email-helper").html("Enter a valid email").css("color", "red");
        }
    }

    $("#email").blur( function() { validateEmail($(this).val()); });

    $("#submit-btn").click( function() {
        if ( isValidEmail($("#email").val()) ) {
            $(this).prop('disabled', true);  
            $.post("/php/login.php",
                {
                    email : $("#email").val(),
                    pwd : $("#pwd").val()
                },
                function(data, status) {
                    if ( status === "success" ) {
                        if ( data === "0" ) {
                            $("#resp-helper").html("Invalid email or password");
                        } else {
                            localStorage.setItem("id", data);
                            window.open("profile.html", "_self");
                        }
                    } else {
                        $("#resp-helper").html("Network Error.");
                    }
                    $("#resp-helper").css("color", "red");
                }
            );
            $(this).prop('disabled', false);
        }
    });
});