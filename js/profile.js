let tagList = [];

function addInterest() {
    
    var $tagList = $("#tagList");
    var $newTag = $("#newTag");
  
    tagList_render();
    
    function tagList_render () {
      $tagList.empty();
      tagList.map (function (_tag) {
        var temp = '<li>'+ _tag +'<span class="rmTag">&times;</span></li>';
        $tagList.append(temp);
      });
    };
    
    $newTag.on('keyup', function (e) {
      if (e.keyCode == 13) {
        var newTag = $("#newTag").val();
        if( newTag.replace(/\s/g, '') !== '' ){
          tagList.push(newTag);
          $newTag.val('');
          tagList_render();
        }
      }
    });
    
    $tagList.on("click", "li>span.rmTag", function(){
      var index = $(this).parent().index();
      tagList.splice(index, 1);
      tagList_render();
    });
  };

function acceptName(e) {
    if ( ! /[A-Za-z ]/.test(e.key) ) {
        e.preventDefault();
    }
}

function isValidName(name) {
    return name.trim() === "" || /^[A-Za-z ]*$/.test(name);
}

function isValidAge(age) {
    if ( age.trim() === "" ) return true;
    age = parseInt(age, 10)
    return age >= 13 && age <= 100;
}

function isValidMobile(mobile) {
    return mobile.trim() === "" || /^[0-9]{10}$/.test(mobile);
}

function isValidDOB(dob) {
    return dob.trim() === "" || /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(dob);
}

function isValidInterests() {
    for ( let i=0; i<tagList.length; i++ ) {
        if ( !isValidName(tagList[i]) ) return false;
    }
    return true;
}

function isAllValid() {
    console.log($("#dob").val() + isValidName($("#fname").val()) + isValidName($("#lname").val()) + isValidMobile($("#mobile").val()) +
    isValidAge($("#age").val()) + isValidDOB($("#dob").val()) + isValidName($("#gender").val()) + 
    isValidName($("#country").val()) + isValidInterests());
    return isValidName($("#fname").val()) && isValidName($("#lname").val()) && isValidMobile($("#mobile").val()) &&
    isValidAge($("#age").val()) && isValidDOB($("#dob").val()) && isValidName($("#gender").val()) && 
    isValidName($("#country").val()) && isValidInterests(); 
}


function updateDetails(data) {
    if ( Object.hasOwn(data, 'firstName') ) $("#fname").val(data["firstName"]);
    if ( Object.hasOwn(data, 'lastName') ) $("#lname").val(data["lastName"]);
    if ( Object.hasOwn(data, 'email') ) $("#email").val(data["email"]);
    if ( Object.hasOwn(data, 'mobileNum') ) $("#mobile").val(data["mobileNum"]);
    if ( Object.hasOwn(data, 'age') ) $("#age").val(data["age"]);
    if ( Object.hasOwn(data, 'country') ) $("#country").val(data["country"]);
    if ( Object.hasOwn(data, 'dob') ) $("#dob").val(data["dob"]);
    if ( Object.hasOwn(data, 'gender') ) $("#gender").val(data["gender"]);
    if ( Object.hasOwn(data, 'interests') ) {
        tagList = data["interests"];
    }
    addInterest();
}

function getData() {
    let data = {
        firstName : $("#fname").val(),
        lastName :  $("#lname").val(),
        mobileNum : $("#mobile").val(),
        age : parseInt($("#age").val()),
        dob : $("#dob").val(),
        gender : $("#gender").val(),
        country : $("#country").val(),
        interests : tagList
    }
    return JSON.stringify(data);
}  

$(document).ready( function() {

    $("#fname").keypress( (e) => acceptName(e) );
    $("#lname").keypress( (e) => acceptName(e) );
    $("#country").keypress( (e) => acceptName(e) );
    $("#interests").keypress( (e) => acceptName(e) );

    $("#fname").blur( function() { validateName('f', $(this).val()); } );
    $("#lname").blur( function() { validateName('l', $(this).val()); } );

    $("#dob").change( function() {
        $("#age").val(Math.floor((new Date() - new Date($(this).val())) / 31557600000))
    });

    let sessid = localStorage.getItem("id");
    if ( !sessid ) window.open("login.html", "_self");
    $.post("/php/profile.php",
                {
                    id : sessid,
                    getinfo : 1
                },
                function(data, status) {
                    if ( status === "success" ) {
                        if ( data === "-1" ) {
                            window.open("login.html", "_self");
                        } else {
                            let res = JSON.parse(data.slice(1, data.length-1));
                            console.log(res);
                            updateDetails(res);
                        }
                    } else {
                        $("#resp-helper").html("Network Error.");
                    }
                    $("#resp-helper").css("color", "red");
                }
    );

    $("#submit-btn").click( function() {
        if ( !isAllValid() ) return;
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