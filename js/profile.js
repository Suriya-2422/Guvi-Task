$(document).ready( function() {
    $("#logout-btn").click( function() {
        alert("Hi");
        $(this).prop('disabled', true);
        let sessid = localStorage.getItem("id");
        localStorage.removeItem("id");
        $.post("/php/profile.php",
                {
                    id : sessid,
                    logout : 1
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