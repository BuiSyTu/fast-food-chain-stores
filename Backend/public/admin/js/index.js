$(document).ready(function () {
    $("#chart_store").hide();
    $(".typeThongKe").change(function () {
        if ($(this).val() == "Tháng") {
            $("#chart_month").show();
            $("#chart_store").hide();
        } else {
            $("#chart_store").show();
            $("#chart_month").hide();
        }
    });
});