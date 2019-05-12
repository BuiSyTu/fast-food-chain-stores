$(document).ready(function(){
  $("#next").click(function(){
    var qtys = $(".order_qty_element");
    var foodIds = $(".food");
    var foodNames = $(".order_name_element");
    var typeNames = $(".order_type_element");
    var sizes = $(".order_size_element");
    var prices = $(".order_price_element");

    var storeId = $(".store-id").attr("storeId");
    var totalOrder = $(".total_order").html();

    var url = "http://localhost:3000/users/payment?storeId=" + storeId + "&" + "totalOrder=" + totalOrder + "&";
    for (var i = 0; i < qtys.length; i++){
      url += "foodId[" + i + "]=" + foodIds.eq(i).attr("foodId") + "&";
      url += "qty[" + i + "]=" + qtys.eq(i).html() + "&";
      url += "foodName[" + i + "]=" + foodNames.eq(i).html() + "&";
      url += "typeName[" + i + "]=" + typeNames.eq(i).html() + "&";
      url += "size[" + i + "]=" + sizes.eq(i).html() + "&";
      url += "price[" + i + "]=" + prices.eq(i).html() + "&";
    }
    if (totalOrder == 0){
      alertError("Bạn chưa thêm đồ vào đơn hàng");
    } else {
      window.location.replace(url);
    }
  });
  $(".t_name, .f_size").click(function(){
    var t = $(this);
    //var price = $(this).parents(".card").find(".f_price").html();
    var foodName = $(this).parents(".card").find(".f_name").html();
    var typeName = $(this).parents(".card").find(".t_name").val();
    var size = $(this).parents(".card").find(".f_size").val();

    var base_url = location.protocol + "//" + document.domain + ":" +location.port;
    $.ajax({
      url: base_url + "/users/placeOrder",
      type: "PUT",
      data: {name : foodName, type: typeName, size: size},
      dataType: "json",
      success: function(res){
        if(res && res.status_code == 200){
          if(res.data) {
              t.parents(".card").find(".f_price").html(res.data.f_price);
              t.parents(".card").find(".f_price").attr("foodIdCard", res.data.f_id);
          }
        }
      }
    });
  });
  $("button.add_to_order").click(function(){
    var price = $(this).parents(".card").find(".f_price").html();
    var foodName = $(this).parents(".card").find(".f_name").html();
    var typeName = $(this).parents(".card").find(".t_name").val();
    var size = $(this).parents(".card").find(".f_size").val();
    var qty = $(this).parents(".card").find(".f_qty").val();
    var foodId = $(this).parents(".card").find(".f_price").attr("foodIdCard");
    error = check(typeName, size, qty);
    if (error){
      $("div.alert").remove();
      alertError(error);
    } else {
      if (checkDuplicate(foodId)){
        qty = parseInt(qty) + parseInt(checkDuplicate(foodId));
        $("[foodId="+ foodId +"]").remove();
      }
      $("div.alert").remove();
      var tr = `
      <tr class="food" foodId="` + foodId + `">
        <td>
          <span class="order_qty_element">` + qty + `</span> <span class="order_name_element">` + foodName + `</span>
          <br>
          <span class="order_type_element">` + typeName + `</span>, <span class="order_size_element">` + size + `</span>
        </td>
        <td class="align-middle order_price_element">` + price + `</td>
        <td class="align-middle"><i class="text-danger fa fa-times fa-lg delete-item" onclick="deleteOrder(this)"></i></td>
      </tr>
      `
      $("tbody").prepend(tr);
      updateTotalOrder();
    }
  });

  function check(type, size, qty){
    if (type == "Type" ) {
      return "Bạn phải chọn loại đồ ăn";
    } else if (size == "Size") {
      return "Bạn phải chọn kích cỡ đồ uống";
    } else if (qty == "Qty") {
      return "Bạn phải chọn số lượng đồ uống";
    }
  }
  function checkDuplicate(foodId){
    var foodIds = $("tr.food");
    for (var i = 0; i < foodIds.length; i++){
      if (foodId == foodIds.eq(i).attr("foodId")){
        return foodIds.eq(i).find(".order_qty_element").html();
      }
    }
    return false;
  }
  function alertError(error){
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
});

function updateTotalOrder(){
  totalOrder = 0;
  var qtys = $(".order_qty_element");
  var prices = $(".order_price_element");
  for (var i = 0; i < qtys.length; i++){
    qty = parseInt(qtys.eq(i).html());
    price = parseInt(prices.eq(i).html());
    totalOrder += qty * price;
  }
  $(".total_order").html(totalOrder);
}
function deleteOrder(d){
  $(d).parents("tr").remove();
  updateTotalOrder();
};
