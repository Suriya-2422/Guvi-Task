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
        addInterest();
    }

}

function getData() {
    let data = {
        firstName : $("#fname").val(),
        lastName :  $("#lname").val(),
        mobileNum : $("#mobile").val(),
        age : $("#age").val(),
        dob : $("#dob").val(),
        gender : $("#gender").val(),
        country : $("#country").val(),
        interests : tagList
    }
    return JSON.stringify(data);
}  

$(document).ready( function() {

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