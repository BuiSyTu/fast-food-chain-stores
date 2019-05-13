$(document).ready(function(){
  var cancelOrderId = 0;
  var cancelOrderParent;
  var billHtml = $(".bill");
  for (var i = 0; i < billHtml.length; i++){
    bill = billHtml.eq(i);
    var priceHtml = bill.find(".price");
    var qtyHtml = bill.find(".qty");
    var totalOrder = 0;
    for (var j = 0; j < priceHtml.length; j++){
      price = parseInt(priceHtml.eq(j).html());
      qty = parseInt(qtyHtml.eq(j).html());
      totalOrder += qty * price;
    }
    bill.find(".total-order").html(totalOrder);
  }

  $(".cancel-order").click(function(){
    cancelOrderId = $(this).attr("billId");
    cancelOrderParent = $(this).parent();
    console.log(cancelOrderId);
  });

  $(".agree-cancel").click(function(){

    var base_url = location.protocol + "//" + document.domain + ":" +location.port;
    $.ajax({
      url: base_url + "/users/previousOrder",
      type: "PUT",
      data: {b_id : cancelOrderId},
      dataType: "json",
      success: function(res){

        if(res && res.status_code == 200){
          console.log("haha");
          cancelOrderParent.find("button").remove();
          cancelOrderParent.html("<p>Đã hủy đơn</p>");
        }
      }
    });
  });
});
