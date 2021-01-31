var jscroll_to_top = $('#scroll_to_top');
$(window).scroll(function() {
	if ($(window).scrollTop() >= 500) {
	   jscroll_to_top.fadeIn(300);
	} else {
		jscroll_to_top.fadeOut(300);
	}
});

jscroll_to_top.on('click', function() {
	$('html,body').animate({scrollTop: '0px' }, 100);
});