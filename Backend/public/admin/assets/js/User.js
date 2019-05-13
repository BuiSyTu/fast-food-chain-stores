function User() {
    function bindEvent() {
        $(".user_edit").click(function (e) {
            var params = {
                a_id: $(".a_id").val(),
                a_username: $(".a_username").val(),
                a_role: $(".a_role").val(),
                a_name: $(".a_name").val(),
                a_gender: $(".a_gender").val(),
                a_phone: $(".a_phone").val(),
                a_email: $(".a_email").val()
            };


            var base_url = location.protocol + "//" + document.domain + ":" + location.port;

            $.ajax({
                type: "PUT",
                url: base_url + "/admin/user/edit",
                data: params,
                dataType: "json",
                success: function (response) {
                    if (response && response.status_code == 200) {
                        location.reload();
                    }
                }
            });



        });

        $(".user_delete").click(function (e) {
            var a_id = $(this).attr("a_id");

            var base_url = location.protocol + "//" + document.domain + ":" + location.port;

            $.ajax({
                type: "DELETE",
                url: base_url + "/admin/user/delete",
                data: { a_id: a_id },
                dataType: "json",
                success: function (response) {
                    if (response && response.status_code == 200) {
                        location.reload();
                    }
                }
            });
        });
    }


    bindEvent();
}

$(document).ready(function () {
    new User();
})