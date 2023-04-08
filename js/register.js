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
    return /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/.test(password);
}

$(document).ready( () => {
    $("#submit-btn").click( () => {
        let email = $("#email").val();
        let passwd = $("#pwd").val();
        let cpasswd = $("#cpwd").val();
        alert(email + " " + passwd + " " + cpasswd);
    } );

    $("#fname").keypress( (e) => acceptName(e) );
    $("#lname").keypress( (e) => acceptName(e) );

    $("#fname").blur( function() { validateName('f', $(this).val()); } );
    $("#lname").blur( function() { validateName('l', $(this).val()); } );

    $("#email").blur( function() { validateEmail($(this).val()); });

    $("#pwd").blur( function() { console.log(isValidPassword($(this).val())); } );
})
