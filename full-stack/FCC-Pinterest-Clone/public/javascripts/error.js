$(document).ready(function () {

  $("img").on('error', function() {
  // do stuff on success
    $(this).attr('src', "/images/broken.png");
  });

});
