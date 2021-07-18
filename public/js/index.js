$(function() {
  let tasksDelete = [];
  animateStar();
  $('.elementTodo').click(function() {
    let nameLabel = $(this).next().text();
    if ($(this).attr("checked")) {
      let index = tasksDelete.indexOf(nameLabel);
      tasksDelete.splice(index, 1);
      $(this).removeAttr("checked");
      $(this).next().css('text-decoration', 'none');
    } else {
      tasksDelete.push(nameLabel);
      console.log(tasksDelete);
      $(this).attr("checked", "checked");
      $(this).next().css('text-decoration', 'line-through');
    }
  });
});

function animateStar() {
  $('.star').delay(0).animate({'top': -300}, 5000 * 2);
  $('.star').delay(0).animate({'top': -50}, 5000 * 2, animateStar);

}
