function Food() {
    function bindEvent() {
        $(".food_edit").click(function (e) {
            var params = {
                f_id: $(".f_id").val(),
                t_id: $(".t_id").val(),
                f_price: $(".f_price").val(),
                f_name: $(".f_name").val(),
                f_size: $(".f_size").val(),
                f_url: $(".f_url").val()
            };


            var base_url = location.protocol + "//" + document.domain + ":" + location.port;

            $.ajax({
                type: "PUT",
                url: base_url + "/admin/food/edit",
                data: params,
                dataType: "json",
                success: function (response) {
                    if (response && response.status_code == 200) {
                        location.reload();
                    }
                }
            });



        });

        $(".food_delete").click(function (e) {
            var f_id = $(this).attr("f_id");

            var base_url = location.protocol + "//" + document.domain + ":" + location.port;

            $.ajax({
                type: "DELETE",
                url: base_url + "/admin/food/delete",
                data: { f_id: f_id },
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
    new Food();
})