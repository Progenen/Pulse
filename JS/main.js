$(document).ready(function(){
    $('.carousel__inner').slick({
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="images/icons/arrow.png" ></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="images/icons/arrow.png" ></button>',
        responsive: [
            {
              breakpoint: 768,
              settings: {
                dots: true,
                arrow: false,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
        ]
    });
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
		.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index())
		.addClass('catalog__content_active');
    });

    $('.item__more').each(function(i){
      $(this).on('click', (e)=>{
        e.preventDefault();
        $('.catalog__item__content').eq(i).toggleClass('catalog__item__content_active');
        $('.catalog__item__list').eq(i).toggleClass('catalog__item__list_active');
      });
    });
    $('.item__back').each(function(i){
      $(this).on('click', (e)=>{
        e.preventDefault();
        $('.catalog__item__content').eq(i).toggleClass('catalog__item__content_active');
        $('.catalog__item__list').eq(i).toggleClass('catalog__item__list_active');
      });
	});
	$('[data-modal=consultation]').click(()=>{
		$('.overlay, #consultation').fadeIn();
	});
	$('.modal__close').click(()=>{
		$('.overlay, #consultation, #order, #thanks').fadeOut();
	});

	$('.item__btn').each(function(i){
		$(this).on('click', function(){
			$('#order .modal__subtitle').text($('.item__name').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
		});
	});
	function valForm(form){
		$(form).validate({
			rules:{
				name: 'required',
				phone: 'required',
				email: {
					required: true,
					email: true
				},
			},
			messages: {
				name: '*Пожалуйста введите ваше имя',
				phone: '*Пожалуйста введите ваш номер телефона',
				email: {
					required: "*Пожалуйста введите ваш email",
					email: "*Введите правильный email"
				}
			}
		});
	}
	valForm('#consultation-form');
	valForm('#consultation form');
	valForm('#order form');

  	$('input[name=phone]').mask('+7 (999) 999 99 99');
  
  	$('form').submit(function(e){
		e.preventDefault();
			$.ajax({
				type: 'POST',
				url: 'mailer/smart.php',
				data: $(this).serialize()
				}).done(function() {
				$(this).find("input").val("");

				$('#consultation, #order').fadeOut();
				$('.overlay, #thanks').fadeIn();
				$('form').trigger('reset');
			});
		return false;
	});
	$(window).scroll(function(){
		if($(this).scrollTop()>1300) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});
	$("a[href^='#']").click(function(){
		var _href = $(this).attr("href");
		$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
		return false;
	});
});