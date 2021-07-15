$(function() {
  animateStar();
  $('.elementTodo').click(function() {
    if ($(this).attr("checked")) {
      $(this).removeAttr("checked");
      $(this).next().css('text-decoration', 'none');
    } else {
      $(this).attr("checked", "checked");
      $(this).next().css('text-decoration', 'line-through');
    }
  });
});

function animateStar() {
  $('.star').delay(500).animate({'top': -560}, 5000 * 4);
  $('.star').delay(0).animate({'top': -400}, 5000 * 4, animateStar);

}
