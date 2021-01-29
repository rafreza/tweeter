$(document).ready(function () {
  
  let num = 0;
 $('textarea').on('input', function () {
    num = $(this).val().length;
    //Continues to reduce counter value while its value is greater than 0
    $(this).closest('section').find('span').html(`${140 - num}`).removeClass('warning');
    //Counter will change colour to red indicating that the tweet exceeds 140 characters.
    if (num > 140) {
    $(this).closest('section').find('span').addClass('warning');
    }
  
  })


}); 