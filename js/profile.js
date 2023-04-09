function updateDetails(data) {
    if ( Object.hasOwn(data, 'firstName') ) $("#fname").val(data["firstName"]);
    if ( Object.hasOwn(data, 'lastName') ) $("#lname").val(data["lastName"]);
    if ( Object.hasOwn(data, 'email') ) $("#email").val(data["email"]);
    if ( Object.hasOwn(data, 'firstName') ) $("#fname").val(data["firstName"]);
    if ( Object.hasOwn(data, 'firstName') ) $("#fname").val(data["firstName"]);
    if ( Object.hasOwn(data, 'firstName') ) $("#fname").val(data["firstName"]);
}

function getData() {
    let data = {
        firstName : $("#fname").val(),
        lastName :  $("#lname").val(),
        mobileNum : $("#mobile").val(),
        age : $("#age").val(),
        dob : $("#dob").val()
    }
    return JSON.stringify(data);
}

$(document).ready( function() {
    let sessid = localStorage.getItem("id");
    $.post("/php/profile.php",
                {
                    id : sessid,
                    getinfo : 1
                },
                function(data, status) {
                    let res = JSON.parse(data.slice(1, data.length-1));
                    console.log(res);
                    updateDetails(res);
                }
    );

    $("#submit-btn").click( function() {
        $(this).prop('disabled', true);
        let sessid = localStorage.getItem("id");
        $.post("/php/profile.php",
                {
                    id : sessid,
                    data : getData(),
                    update : 1,
                },
                function(data, status) {
                    if ( status === "success" ) {
                        if ( data === "0" ) {
                            alert("Some error occurred while updating profile!")
                            window.open("profile.html", "_self");
                        } else if ( data === "1" ) {
                            window.open("profile.html", "_self");
                        }
                    } else {
                        $("#resp-helper").html("Network Error.");
                    }
                    $("#resp-helper").css("color", "red");
                }
            );
            $(this).prop('disabled', false);
        });

    $("#logout-btn").click( function() {
        $(this).prop('disabled', true);
        let sessid = localStorage.getItem("id");
        localStorage.removeItem("id");
        $.post("/php/profile.php",
                {
                    id : sessid,
                    logout : 1,
                },
                function(data, status) {
                    if ( status === "success" ) {
                        if ( data === "0" ) {
                            alert("Some error occurred while logging out!")
                            window.open("login.html", "_self");
                        } else if ( data === "1" ) {
                            window.open("login.html", "_self");
                        }
                    } else {
                        $("#resp-helper").html("Network Error.");
                    }
                    $("#resp-helper").css("color", "red");
                }
            );
            $(this).prop('disabled', false);
    });
});