$(document).ready(function(){
  function alertError(error){
    $("div.alert").remove();
    var alert = `
      <div class="alert alert-warning alert-dismissible fade show fixed-top text-center" role="alert">
        ` + error + `
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    `
    $("body").prepend(alert);
  }
  $("#submitOrder").click(function(){
    var qtysHtml = $(".order_qty_element");
    var foodIdsHtml = $(".food");
    var qtys = [];
    var foodIds = [];
    for (var i = 0; i < qtysHtml.length; i++){
      qtys[i]= qtysHtml.eq(i).html();
      foodIds[i] = foodIdsHtml.eq(i).attr("foodId");
    }

    var storeId = $(".store-id").attr("storeId");
    var paymentMethod = parseInt($('input[name=paymentMethod]:checked', '#form').val());
    if(paymentMethod!=0 && paymentMethod!=1){
      alertError("Bạn chưa chọn phương thức thanh toán");
    } else {
      var base_url = location.protocol + "//" + document.domain + ":" +location.port;
      $.ajax({
        url: base_url + "/users/payment",
        type: "POST",
        data: {json: JSON.stringify({foodIds : foodIds, qtys: qtys, storeId: storeId, paymentMethod: paymentMethod})},
        dataType: "json",
        success: function(res){
          if(res && res.status_code == 200){
            window.location.replace("http://localhost:3000/users/submitSuccess");
          }
        }
      });
    }
  });
  $("#editOrder").click(function(){
    var qtys = $(".order_qty_element");
    var foodIds = $(".food");
    var foodNames = $(".order_name_element");
    var typeNames = $(".order_type_element");
    var sizes = $(".order_size_element");
    var prices = $(".order_price_element");

    var storeId = $(".store-id").attr("storeId");
    var totalOrder = $(".total_order").html();

    var url = "http://localhost:3000/users/placeOrder/"+storeId+"?storeId=" + storeId + "&" + "totalOrder=" + totalOrder + "&";
    for (var i = 0; i < qtys.length; i++){
      url += "foodId[" + i + "]=" + foodIds.eq(i).attr("foodId") + "&";
      url += "qty[" + i + "]=" + qtys.eq(i).html() + "&";
      url += "foodName[" + i + "]=" + foodNames.eq(i).html() + "&";
      url += "typeName[" + i + "]=" + typeNames.eq(i).html() + "&";
      url += "size[" + i + "]=" + sizes.eq(i).html() + "&";
      url += "price[" + i + "]=" + prices.eq(i).html() + "&";
    }
    window.location.replace(url);
  });
});
