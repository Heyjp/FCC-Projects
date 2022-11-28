$(document).ready(function () {

  $(".button-collapse").sideNav();

  var removed = false;
  $('.drop-box').hide();

  $('.img-delete').unbind('click').bind('click', function (e) {

   e.preventDefault();
   var img = $(this);
   var id = $(this).attr('id');
   var obj = {};
   obj.id = id;
     $.ajax({
      url: '/delete',
      type: 'DELETE',
      data: obj,
      success: function(result) {
        location.reload();
        /*
          // Do something with the result
          console.log("works");
          // finds the parent container and removes it :D:D:D:D:D
          img.parent().parent('.grid-item').remove();
        */
        }
      });
      return false;
   });

   $('.likes').unbind('click').bind('click', function (e) {
     e.preventDefault();
      var ele = $(this);
      var id = $(this).attr('id');
      var obj = {};
      obj.id = id;

      $.post('/likes', obj, function (val) {
        if (val === "error") {
          return false;
        } else {
          console.log("success");
          ele.find('p').text(val);
          }
      });

   });

  $(".dropdown-button").click(function() {
    if (removed === false) {
    $(".drop-box").show();
    removed = true;
  } else {
      $(".drop-box").hide();
      removed = false;
  }
  });

});
