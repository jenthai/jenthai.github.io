
function scroll_to(clicked_link, nav_height) {
	var element_class = clicked_link.attr('href').replace('#', '.');
	var scroll_to = 0;
	if(element_class != '.top-content') {
		element_class += '-container';
		scroll_to = $(element_class).offset().top - nav_height;
	}
	if($(window).scrollTop() != scroll_to) {
		$('html, body').stop().animate({scrollTop: scroll_to}, 1000);
	}
}


jQuery(document).ready(function() {

	/*
	    Navigation
	*/
	$('a.scroll-link').on('click', function(e) {
		e.preventDefault();
		scroll_to($(this), $('nav').outerHeight());
	});

    /*
	    Scroll to top
	*/
    $('.scroll-to-top a').on('click', function(e) {
		e.preventDefault();
		var scroll_to = 0;
		if($(window).scrollTop() != scroll_to) {
			$('html, body').stop().animate({scrollTop: scroll_to}, 1000);
		}
	});

	/**
 * Listen to scroll to change header opacity class
 */
	function checkScroll(){
	    var startY = $('.navbar').height() * 2; //The point where the navbar changes in px

	    if($(window).scrollTop() > startY){
	        $('.navbar').addClass("scrolled");
	    }else{
	        $('.navbar').removeClass("scrolled");
	    }
	}

	if($('.navbar').length > 0){
	    $(window).on("scroll load resize", function(){
	        checkScroll();
	    });
	}

    /*
	    Wow
	*/
	new WOW().init();

    /*
        Fullscreen backgrounds
    */

		$('.page-title').backstretch("assets/img/backgrounds/VSA20 - Ending FN 2.png");
		$('.page-title-2').backstretch("assets/img/backgrounds/eboard20-Sunflower.jpg");

    $('.page-title-3').backstretch("assets/img/backgrounds/ACEphoto.jpg"); /* ACE */
    $('.page-title-4').backstretch("assets/img/backgrounds/MOL.png"); /* CPP */

		$('.page-title-5').backstretch("assets/img/backgrounds/eboard15.jpg"); /* Exec 2014-2015*/
		$('.page-title-6').backstretch("assets/img/backgrounds/eboard16.jpg"); /* Exec 2015-2016*/
 		$('.page-title-7').backstretch("assets/img/backgrounds/eboard17.jpg"); /* Exec 2016-2017*/
    $('.page-title-8').backstretch("assets/img/backgrounds/eboard18.JPG"); /* Exec 2017-2018*/

		$('.page-title-10').backstretch("assets/img/backgrounds/eboard20.jpg");

    $('.counters-container').backstretch("assets/img/backgrounds/1.jpg");
    $('.our-motto-container').backstretch("assets/img/backgrounds/grey_logo.jpg");
    $('.call-to-action-container').backstretch("assets/img/backgrounds/grey_logo.jpg");

	/*
	    Counters
	*/
	$('.counters-container').waypoint(function() {
		$('.counter-box h4').countTo();
	}, { offset: '100%' });

	/*
	    Testimonials
	*/
	$('.testimonial-active').html('<p>' + $('.testimonial-single:first p').html() + '</p>');
	$('.testimonial-single:first .testimonial-single-image img').css('opacity', '1');

	$('.testimonial-single-image img').on('click', function() {
		$('.testimonial-single-image img').css('opacity', '0.3');
		$(this).css('opacity', '1');
		var new_testimonial_text = $(this).parent('.testimonial-single-image').siblings('p').html();
		$('.testimonial-active p').fadeOut(300, function() {
			$(this).html(new_testimonial_text);
			$(this).fadeIn(400);
		});
	});

	/*
	    Contact form
	*/
	$('.contact-form form input[type="text"], .contact-form form textarea').on('focus', function() {
		$('.contact-form form input[type="text"], .contact-form form textarea').removeClass('contact-error');
	});
	$('.contact-form form').submit(function(e) {
		e.preventDefault();
	    $('.contact-form form input[type="text"], .contact-form form textarea').removeClass('contact-error');
	    var postdata = $('.contact-form form').serialize();
	    $.ajax({
	        type: 'POST',
	        url: 'assets/contact.php',
	        data: postdata,
	        dataType: 'json',
	        success: function(json) {
	            if(json.emailMessage != '') {
	                $('.contact-form form .contact-email').addClass('contact-error animated shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            			$(this).removeClass('animated shake');
            		});
	            }
	            if(json.subjectMessage != '') {
	                $('.contact-form form .contact-subject').addClass('contact-error animated shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            			$(this).removeClass('animated shake');
            		});
	            }
	            if(json.messageMessage != '') {
	                $('.contact-form form textarea').addClass('contact-error animated shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            			$(this).removeClass('animated shake');
            		});
	            }
	            if(json.emailMessage == '' && json.subjectMessage == '' && json.messageMessage == '') {
	                $('.contact-form form').fadeOut('fast', function() {
	                    $('.contact-form').append('<p>Thanks for contacting us! We will get back to you very soon.</p>');
	                });
	            }
	        }
	    });
	});

});



jQuery(window).load(function() {

	/*
		Loader
	*/
	$(".loader-img").fadeOut();
	$(".loader").delay(1000).fadeOut("slow");

	/*
	    Portfolio
	*/


	$('.portfolio-masonry').masonry({
		columnWidth: '.portfolio-box',
		itemSelector: '.portfolio-box',
		transitionDuration: '0.5s'
	});



	$('.portfolio-filters a').on('click', function(e){
		e.preventDefault();
		if(!$(this).hasClass('active')) {
	    	$('.portfolio-filters a').removeClass('active');
	    	var clicked_filter = $(this).attr('class').replace('filter-', '');
	    	$(this).addClass('active');
	    	if(clicked_filter != 'all') {
	    		$('.portfolio-box:not(.' + clicked_filter + ')').css('display', 'none');
	    		$('.portfolio-box:not(.' + clicked_filter + ')').removeClass('portfolio-box');
	    		$('.' + clicked_filter).addClass('portfolio-box');
	    		$('.' + clicked_filter).css('display', 'block');
	    		$('.portfolio-masonry').masonry();
	    	}
	    	else {
	    		$('.portfolio-masonry > div').addClass('portfolio-box');
	    		$('.portfolio-masonry > div').css('display', 'block');
	    		$('.portfolio-masonry').masonry();
	    	}
		}
	});

	$(window).on('resize', function(){ $('.portfolio-masonry').masonry(); });

    /*
	    Image popup
	*/
	/*
	$('.portfolio-box-text p').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: 'The image could not be loaded.',
			titleSrc: function(item) {
				return item.el.text();
			}
		},
		callbacks: {
			elementParse: function(item) {
				item.src = item.el.parents('.portfolio-box-text-container').siblings('img').attr('src');
			}
		}
	});
	*/
});
