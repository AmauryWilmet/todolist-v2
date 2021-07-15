$(function() {
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
