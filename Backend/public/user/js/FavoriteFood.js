$(document).ready(function(){
  $("i.favorite").click(function(){
    var favorite = $(this);
    var favoriteId = $(this).attr("favoriteId");
    var base_url = location.protocol + "//" + document.domain + ":" +location.port;
    $.ajax({
      url: base_url + "/users/favoriteFood",
      type: "DELETE",
      data: {id : favoriteId},
      dataType: "json",
      success: function(res){
        if(res && res.status_code == 200){
          favorite.hide();
          favorite.siblings(".not-favorite").show();
        }
      }
    });
  });

  $("i.not-favorite").click(function(){
    var favorite = $(this);
    var foodId = $(this).attr("foodId");
    var base_url = location.protocol + "//" + document.domain + ":" +location.port;
    $.ajax({
      url: base_url + "/users/favoriteFood",
      type: "PUT",
      data: {f_id : foodId},
      dataType: "json",
      success: function(res){
        if(res && res.status_code == 200){
          favorite.hide();

          favorite.siblings(".favorite").show();
        }
      }
    });
  });
});
