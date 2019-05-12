$(document).ready(function(){
  $(".card").click(function(){
    var store = $(this);
    var storeId = $(this).attr("storeId");
    window.location.replace("http://localhost:3000/users/placeOrder/"+storeId);
  });
});
