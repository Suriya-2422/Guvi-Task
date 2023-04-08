$(document).ready( () => {
    $("#submit-btn").click( () => {
        let email = $("#email").val();
        let passwd = $("#pwd").val();
        let cpasswd = $("#cpwd").val();
        alert(email + " " + passwd + " " + cpasswd);
    } );
})
