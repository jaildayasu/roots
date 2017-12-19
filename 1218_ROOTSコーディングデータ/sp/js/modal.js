$(function(){
    $('.modal-open').click(function(){
        $('body').addClass('no_scroll');
		var scrollTop = $(window).scrollTop();
        $('body').css({'position':'fixed','top':-scrollTop});
        $('.modal-overlay').fadeIn('slow');
        var modal = '#' + $(this).attr('data-target');
        modalResize();
        $(modal).fadeIn('slow');
        $('.modal-overlay, .modal-close').off().click(function(){
			$('body').removeClass('no_scroll');
            $('body').css({'position':'static','top':'0'});
            $('html,body').scrollTop(scrollTop);
            $(modal).fadeOut('slow');
            $('.modal-overlay').fadeOut('slow',function(){
                $('.modal-overlay').remove();
            });
        });
        $(window).on('resize', function(){
            modalResize();
        });
        function modalResize(){
            /*var w = $(window).width();
            var h = $(window).height();
            var x = (w - $(modal).outerWidth(true)) / 2;
            var y = (h - $(modal).outerHeight(true) + 300) / 2;*/
            $(modal).css({'left': 0 + 'px','top': 0 + 'px'});
        }

    });
});