$(document).ready(function () {
    $flag = 1;


    $("#myName").focusout(function () {
        if ($(this).val() == '') {
            $(this).css("border-color", "#FF0000");
            $('#submit').attr('disabled', true);
            $("#error_name").text("* Vui lòng điền họ tên của bạn!");
        } else {
            $(this).css("border-color", "#2eb82e");
            $('#submit').attr('disabled', false);
            $("#error_name").text("");

        }
    });

    $("#dob").focusout(function () {
        if ($(this).val() == '') {
            $(this).css("border-color", "#FF0000");
            $('#submit').attr('disabled', true);
            $("#error_dob").text("* Vui lòng điền ngày sinh của bạn!");
        } else {
            $(this).css("border-color", "#2eb82e");
            $('#submit').attr('disabled', false);
            $("#error_dob").text("");
        }
    });
    $("#gender").focusout(function () {
        $(this).css("border-color", "#2eb82e");

    });
   
    $("#phone").focusout(function () {
        $pho = $("#phone").val();
        if ($(this).val() == '') {
            $(this).css("border-color", "#FF0000");
            $('#submit').attr('disabled', true);
            $("#error_phone").text("* Vui lòng nhập số điện thoại!");
        } else if ($pho.length < 10) {
            $(this).css("border-color", "#FF0000");
            $('#submit').attr('disabled', true);
            $("#error_phone").text("* Độ dài tối thiểu 10 chữ số");
        } else {
            $(this).css({
                "border-color": "#2eb82e"
            });
            $('#submit').attr('disabled', false);
            $("#error_phone").text("");
        }
    });

    $("#submit").click(function () {
        if ($("#myName").val() == '') {
            $("#myName").css("border-color", "#FF0000");
            $('#submit').attr('disabled', true);
            $("#error_name").text("* You have to enter your first name!");
        }
        if ($("#lastname").val() == '') {
            $("#lastname").css("border-color", "#FF0000");
            $('#submit').attr('disabled', true);
            $("#error_lastname").text("* You have to enter your Last name!");
        }
        if ($("#dob").val() == '') {
            $("#dob").css("border-color", "#FF0000");
            $('#submit').attr('disabled', true);
            $("#error_dob").text("* You have to enter your Date of Birth!");
        }
        if ($("#age").val() == '') {
            $("#age").css("border-color", "#FF0000");
            $('#submit').attr('disabled', true);
            $("#error_age").text("* You have to enter your Age!");
        }
        if ($("#phone").val() == '') {
            $("#phone").css("border-color", "#FF0000");
            $('#submit').attr('disabled', true);
            $("#error_phone").text("* You have to enter your Phone Number!");
        }
    });
});

function checkPass()
{
    //Store the password field objects into variables ...
    var pass1 = document.getElementById('pass1');
    var pass2 = document.getElementById('pass2');
    //Store the Confimation Message Object ...
    var message = document.getElementById('confirmMessage');
    //Set the colors we will be using ...
    var goodColor = "#66cc66";
    var badColor = "#ff6666";
    //Compare the values in the password field 
    //and the confirmation field
    if(pass1.value == pass2.value){
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

