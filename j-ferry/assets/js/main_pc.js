/*! base.js */
;(function($){

	$.fn.tabChange = function(callback){
		var $tabs = $(this);

		$tabs.on('click',function(e){
			var $tab = $(this),
			$page = $('[data-tab-rel="'+$tab.data('tab-rel')+'"][data-tab-page="'+$tab.data('tab-tg')+'"]');
			e.preventDefault();

			$('[data-tab-rel="'+$tabs.data('tab-rel')+'"]')
				.removeClass('current');
			$tab.addClass('current');
			$page.addClass('current');

			if(callback) callback($tab,$page);

			return false;
		});

		return this;
	};

	$.fn.menu = function(){
		var $btn = $(this),
		$menu = $($btn.attr('href')),
		$root = $('body'),
		_m_show = function($_btn){
			var $_menu = $($_btn.attr('href'));
			$_btn.addClass('active');
			$root.addClass('menu-open');
			$_menu.addClass('open');
		},
		_m_hide = function($_btn){
			var $_menu = $($_btn.attr('href'));
			$root.removeClass('menu-open');
			$_btn.removeClass('active');
			$_menu.removeClass('open');
		};
		$btn.on('click.menu',function(){
			var $_btn = $(this),
			$_menu = $($_btn.attr('href'));
			if($_menu.hasClass('open')){
				_m_hide($_btn);
			}else{
				_m_show($_btn);
			}
			return false;
		});
		$menu.find('[data-menu-close]').on('click',function(){
			var $_btn = $('[data-menu-toggle="'+$(this).data('menu-close')+'"]'),
			$_menu = $($_btn.attr('href'));
			if($_menu.hasClass('open')){
				_m_hide($_btn);
			}else{
				_m_show($_btn);
			}
			return false;
		});
		return this;
	}

	$.fn.menuAcc = function(){
		var $toggle = $(this);
		$toggle.on('click.acc_toggle',function(){
			$(this).toggleClass('open');
			return false;
		});
		return this;
	}

	$.fn.moreRead = function(){
		var $this = $(this),
		init = function($btn){
			$btn.on('click',function(){
				var $tg = $($(this).attr('href'));
				$tg.addClass('open');
				$(this).addClass('open');
				return false;
			});
		};
		$this.each(function(){
			init($(this));
		})
		return this;
	};

	$.fn.modalBalloonPageNext = function(){
		var $this = $(this),
		init = function($btn){
			$btn.on('click.mbpn',function(){
				var pages = $($(this).parents('.goods_select_pages')[0]);
				pages.addClass('underlayer');
				return false;
			});
		};
		$this.each(function(){
			init($(this));
		})
		return this;
	};

	$.fn.modalBalloonPagePrev = function(){
		var $this = $(this),
		init = function($btn){
			$btn.on('click.mbpn',function(){
				var pages = $($(this).parents('.goods_select_pages')[0]);
				pages.removeClass('underlayer');
				return false;
			});
		};
		$this.each(function(){
			init($(this));
		})
		return this;
	};

	$.fn.megamenu = function(){
		var $this = $(this),
		init = function($toggle){
			$toggle.on('mouseenter.megamenu',function(){
				var $btn = $(this),
				$panel = $("#"+$btn.data('megamenu-toggle'));
				$btn.addClass('active');
				$panel.addClass('active');
			});
			$toggle.on('mouseleave.megamenu',function(){
				var $btn = $(this),
				$panel = $("#"+$btn.data('megamenu-toggle'));
				$btn.removeClass('active');
				$panel.removeClass('active');
			});
		};
		$this.each(function(){
			init($(this));
		})
		return this;
	}


})(jQuery);

jQuery(function($){

	$('.topslider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		infinite: true,
		speed: 500,
		fade: true,
		cssEase: 'linear',
		autoplay: true,
		autoplaySpeed: 3000
	});

	$('.recom_ .goods_list_wrapper_').slick({
		slidesToShow: 5,
		slidesToScroll: 5,
		arrows: true,
		dots: false,
		infinite: true,
		speed: 200,
		autoplay: true,
		autoplaySpeed: 3000
	});

	$('.product_detail_slider_wrap .slider-for').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		$('.product_detail_slider_wrap .slider-nav > *').removeClass('active');
		$($('.product_detail_slider_wrap .slider-nav > *')[nextSlide]).addClass('active');
	});
	var detail_slide = $('.product_detail_slider_wrap .slider-for').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		fade: false,
	});
	$('.product_detail_slider_wrap .slider-nav > *').click(function(e){
		e.preventDefault();
		slideIndex = $(this).index();
		detail_slide.slick('slickGoTo', parseInt(slideIndex));
		$('.product_detail_slider_wrap .slider-nav > *').removeClass('active');
		$(this).addClass('active');
	});

	// $('[data-megamenu-toggle]').megamenu();

	// $('a, a img, button, input[type="submit"], input[type="image"]').on('mouseover touchstart',function(){
	// 	$(this).addClass('hover');
	// }).on('mouseout touchend',function(){
	// 	$(this).removeClass('hover');
	// });

	$('[data-tab-tg]').tabChange();

	$('#globalnav [data-megamenu-toggle]').on('mouseover touchstart',function(){
		$(this).addClass('hover');
	}).on('mouseout touchend',function(){
		$(this).removeClass('hover');
	});

	$('.header_menu_srh_ input.keyword_').on('mouseover touchstart',function(){
		$('#gnav_megamenu_search').parents('.gnav_megamenu_').addClass('active');
	});
	$(document).on('click.hmsrh', function(evt){
		if($('#gnav_megamenu_search').parents('.gnav_megamenu_').hasClass('active')){
			if(
				!$(evt.target).closest('.gnav_megamenu_').length &&
				!$(evt.target).closest('.header_menu_srh_').length
			){
				$('#gnav_megamenu_search').parents('.gnav_megamenu_').removeClass('active');
			}
		}
	});
	$('#gnav_megamenu_search').parents('.gnav_megamenu_').on('mouseover touchstart', function(){
		$(document).on('mouseout.hmsrh touchend.hmsrh', function(evt){
			if($('#gnav_megamenu_search').parents('.gnav_megamenu_').hasClass('active')){
				if(
					!$(evt.target).closest('.gnav_megamenu_').length
				){
					$('#gnav_megamenu_search').parents('.gnav_megamenu_').removeClass('active');
					$(document).off('mouseout.hmsrh touchend.hmsrh');
				}
			}
		});
	});

	$('#footer_pagetop a').on('click.pagetop',function(){
		$('body, html').animate({ scrollTop: 0 }, 500);
		return false;
	});

	$(window).on('scroll resize',function(){
		var ww = $(window).width(),
		bw = $('body').width(),
		_x = $(window).scrollLeft(),
		_y = $(window).scrollTop();
		$('#header').css('left', (_x>0 ? -_x : 0));
	});

});
