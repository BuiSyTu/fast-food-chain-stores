$(document).ready(function () {
    $flag = 1;


    $("#a_name").focusout(function () {
        if ($(this).val() == '') {
            $(this).css("border-color", "#FF0000");
            $('#signupButton').attr('disabled', true);
            $("#error_name").text("* Vui lòng điền họ tên của bạn!");
        } else {
            $(this).css("border-color", "#2eb82e");
            $('#signupButton').attr('disabled', false);
            $("#error_name").text("");

        }
    });

    $("#a_dob").focusout(function () {
        if ($(this).val() == '') {
            $(this).css("border-color", "#FF0000");
            $('#signupButton').attr('disabled', true);
            $("#error_dob").text("* Vui lòng điền ngày sinh của bạn!");
        } else {
            $(this).css("border-color", "#2eb82e");
            $('#signupButton').attr('disabled', false);
            $("#error_dob").text("");
        }
    });
    $("#a_gender").focusout(function () {
        $(this).css("border-color", "#2eb82e");

    });
   
    $("#a_phone").focusout(function () {
        $pho = $("#a_phone").val();
        if ($(this).val() == '') {
            $(this).css("border-color", "#FF0000");
            $('#signupButton').attr('disabled', true);
            $("#error_phone").text("* Vui lòng nhập số điện thoại!");
        } else if ($pho.length < 10) {
            $(this).css("border-color", "#FF0000");
            $('#signupButton').attr('disabled', true);
            $("#error_phone").text("* Độ dài tối thiểu 10 chữ số");
        } else {
            $(this).css({
                "border-color": "#2eb82e"
            });
            $('#signupButton').attr('disabled', false);
            $("#error_phone").text("");
        }
    });

    $("#signupButton").click(function () {
        if ($("#a_name").val() == '') {
            $("#a_name").css("border-color", "#FF0000");
            $('#signupButton').attr('disabled', true);
            $("#error_name").text("* You have to enter your first name!");
        }
        if ($("#a_dob").val() == '') {
            $("#a_dob").css("border-color", "#FF0000");
            $('#signupButton').attr('disabled', true);
            $("#error_dob").text("* You have to enter your Date of Birth!");
        }
        if ($("#a_phone").val() == '') {
            $("#a_phone").css("border-color", "#FF0000");
            $('#signupButton').attr('disabled', true);
            $("#error_phone").text("* You have to enter your Phone Number!");
        }
    });
});

function checkPass()
{
    //Store the password field objects into variables ...
    var a_password = document.getElementById('a_password');
    var pass2 = document.getElementById('pass2');
    //Store the Confimation Message Object ...
    var message = document.getElementById('confirmMessage');
    //Set the colors we will be using ...
    var goodColor = "#66cc66";
    var badColor = "#ff6666";
    //Compare the values in the password field 
    //and the confirmation field
    if(a_password.value == pass2.value){
        //The passwords match. 
        //Set the color to the good color and inform
        //the user that they have entered the correct password 
        pass2.style.borderColor = goodColor;
        message.style.color = goodColor;
        message.innerHTML = "* Mật khẩu trùng khớp"
    }else{
        //The passwords do not match.
        //Set the color to the bad color and
        //notify the user.
        pass2.style.borderColor = badColor;
        message.style.color = badColor;
        message.innerHTML = "* Mật khẩu không trùng khớp!"
    }
} 

