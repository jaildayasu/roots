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


})(jQuery);

jQuery(function($){

	$('[data-menu-toggle="globalmenu"]').menu();
	$('[data-menu-toggle="search_detail"]').menu();
	$('[data-menu-toggle="search_refine"]').menu();
	$('[data-menu-toggle="search_sort"]').menu();
	$('[data-menu-toggle="spec_select_panel"]').menu();
	$('[data-menu-toggle="spac_stock_panel"]').menu();

	$('.globalmenu_top_contents .acc_toggle').menuAcc();
	$('#fmenu_site .acc_toggle').menuAcc();
	$('[ data-sizeinfo-toggle]').menuAcc();
	$('.page_local_nav_items .acc_toggle').menuAcc();

	$('[data-stock-check]').modalBalloonPageNext();
	$('[data-modal-page-prev]').modalBalloonPagePrev();

	$('.slider-for').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		fade: false,
		asNavFor: '.slider-nav'
	});
	$('.slider-nav').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		asNavFor: '.slider-for',
		arrows: false,
		dots: false,
		centerMode: false,
		focusOnSelect: true
	});

	$('[data-tab-tg]').tabChange();

	$('[data-more-read-btn]').moreRead();

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

	$('.mediaitems_ .goods_list_wrapper_').slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		arrows: true,
		dots: true,
		infinite: true,
		speed: 200,
		autoplay: true,
		autoplaySpeed: 3000
	});


	// $('a, a img, button, input[type="submit"], input[type="image"]').on('mouseover touchstart',function(){
	// 	$(this).addClass('hover');
	// }).on('mouseout touchend',function(){
	// 	$(this).removeClass('hover');
	// });

});
