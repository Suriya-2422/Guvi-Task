function acceptName(e) {
    if ( ! /[A-Za-z ]/.test(e.key) ) {
        e.preventDefault();
    }
}

function isValidName(name) {
    return name.trim() !== "";
}

function validateName(sel, name) {
    let selector = sel === 'f' ? "#fname" : "#lname";
    if ( isValidName(name) ) {
        $(selector).css("border", "2px solid green");
        $(selector + "-helper").html( ( sel === 'f' ? "First" : "Last" ) + " Name is valid")
                               .css("color", "green");
    } else {
        $(selector).css("border", "2px solid red");
        $(selector + "-helper").html( "Enter a valid "+ ( sel === 'f' ? "First" : "Last" ) + " Name")
                               .css("color", "red");
    }
}

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

function isValidPassword(password) {
    return /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&+=.\-_*])([^\s]){8,16}$/.test(password);
}

function validatePasswordLower(password) {
    if ( /[a-z]/.test(password) ) {
        $("#pwd-helper-lower").css("color", "green");
        $("#pwd-helper-lower-fa").removeClass("fa-x").addClass("fa-check").css("color", "green");
    } else {
        $("#pwd-helper-lower").css("color", "red");
        $("#pwd-helper-lower-fa").addClass("fa-x").removeClass("fa-check").css("color", "red");
    }
}

function validatePasswordUpper(password) {
    if ( /[A-Z]/.test(password) ) {
        $("#pwd-helper-upper").css("color", "green");
        $("#pwd-helper-upper-fa").removeClass("fa-x").addClass("fa-check").css("color", "green");
    } else {
        $("#pwd-helper-upper").css("color", "red");
        $("#pwd-helper-upper-fa").addClass("fa-x").removeClass("fa-check").css("color", "red");
    }
}

function validatePasswordNum(password) {
    if ( /[0-9]/.test(password) ) {
        $("#pwd-helper-num").css("color", "green");
        $("#pwd-helper-num-fa").removeClass("fa-x").addClass("fa-check").css("color", "green");
    } else {
        $("#pwd-helper-num").css("color", "red");
        $("#pwd-helper-num-fa").addClass("fa-x").removeClass("fa-check").css("color", "red");
    }
}

function validatePasswordSpecial(password) {
    if ( /[!@#$%^&+=.\-_*]/.test(password) ) {
        $("#pwd-helper-special").css("color", "green");
        $("#pwd-helper-special-fa").removeClass("fa-x").addClass("fa-check").css("color", "green");
    } else {
        $("#pwd-helper-special").css("color", "red");
        $("#pwd-helper-special-fa").addClass("fa-x").removeClass("fa-check").css("color", "red");
    }
}

function validatePasswordLength(password) {
    if ( /.{8,16}/.test(password) ) {
        $("#pwd-helper-length").css("color", "green");
        $("#pwd-helper-length-fa").removeClass("fa-x").addClass("fa-check").css("color", "green");
    } else {
        $("#pwd-helper-length").css("color", "red");
        $("#pwd-helper-length-fa").addClass("fa-x").removeClass("fa-check").css("color", "red");
    }
}

function validatePassword(password) {
    validatePasswordLower(password);
    validatePasswordUpper(password);
    validatePasswordNum(password);
    validatePasswordSpecial(password);
    validatePasswordLength(password);
    if ( isValidPassword(password) ) {
        $("#pwd").css("border", "2px solid green");
    } else {
        $("#pwd").css("border", "2px solid red");
    }
}

function isValidConfirmPassword(password) {
    return password.trim() !== "" && password === $("#pwd").val();
}

function validateConfirmPassword(password) {
    if ( isValidConfirmPassword(password) ) {
        $("#cpwd-helper").text("Passwords match").css("color", "green");
        $("#cpwd").css("border", "2px solid green");
    } else {
        $("#cpwd-helper").text("Passwords do not match").css("color", "red");
        $("#cpwd").css("border", "2px solid red");
    }
}

$(document).ready( () => {
    $("#pwd-eye").click(function() {
        $(this).toggleClass("fa-eye-slash");
        $(this).toggleClass("fa-eye");
        $("#pwd").attr("type", (i, val) => val === "text" ? "password" : "text");
    })

    $("#cpwd-eye").click(function() {
        $(this).toggleClass("fa-eye-slash");
        $(this).toggleClass("fa-eye");
        $("#cpwd").attr("type", (i, val) => val === "text" ? "password" : "text");
    })

    $("#fname").keypress( (e) => acceptName(e) );
    $("#lname").keypress( (e) => acceptName(e) );

    $("#fname").blur( function() { validateName('f', $(this).val()); } );
    $("#lname").blur( function() { validateName('l', $(this).val()); } );

    $("#email").blur( function() { validateEmail($(this).val()); });

    $("#pwd").keyup( function() { validatePassword($(this).val()); } );

    $("#cpwd").keyup( function() { validateConfirmPassword($(this).val()); } );

    $("#submit-btn").click( function() {
        console.log("Submit... " + isValidName($("#fname").val()) + isValidName($("#lname").val())
        + isValidEmail($("#email").val()) + isValidPassword($("#pwd")) 
        + isValidConfirmPassword($("#cpwd")));
        if ( isValidName($("#fname").val()) && isValidName($("#lname").val())
            && isValidEmail($("#email").val()) && isValidPassword($("#pwd").val())
            && isValidConfirmPassword($("#cpwd").val()) ) {
                console.log("Sending req...");
                $(this).prop('disabled', true);  
                $.post("/php/register.php",
                    {
                        fname : $("#fname").val(),
                        lname : $("#lname").val(),
                        email : $("#email").val(),
                        pwd : $("#pwd").val(),
                        cpwd : $("#cpwd").val(),
                    },
                    function(data, status) {
                        console.log("CALLBACK " + typeof(data) + data + typeof(status) + status);
                        if ( status === "success" ) {
                            switch(data) {
                                case "1":
                                    window.open("/login.html", "_self");
                                    break;
                                case "0":
                                    $("#resp-helper").html("Please fill all necessary details");
                                    break;
                                case "-2":
                                    $("#resp-helper").html("Server error. Please contact the admin.");
                                    break;
                                case "-1":
                                    $("#resp-helper").html("Email already exists");
                                    break;
                                case "-5":
                                    $("#resp-helper").html("Server error. Please contact the admin.");
                                    break;
                            }
                        } else {
                            $("#resp-helper").html("Network Error.");
                        }
                        $("#resp-helper").css("color", "red");
                        $(this).prop('disabled', false);  
                    }
                );  
            }
    } );
})
