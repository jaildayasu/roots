(function ($) {


  /* ------------------------------- */
  $(function(){

    load_event();

    // ------------------------------
    // UA
    // ------------------------------

    var window_width  = window.innerWidth;

    agent = navigator.userAgent;
    mobile       = false;
    iPhone       = false; /* iPhone */
    iPad         = false; /* iPad */
    androidphone = false; /* Android Phone only */
    android      = false; /* Android Phone and Tablet */
    OSX          = false; /* Mac OSX */

    if (agent.search(/iPhone/) != -1 || agent.search(/iPod/) != -1 || agent.search(/Android/) != -1) { mobile = true } else { mobile = false };
    if (agent.search(/Mac/) != -1)    { OSX    = true };
    if (agent.search(/iPad/) != -1)   { iPad   = true };
    if (agent.search(/iPhone/) != -1) { iPhone = true };
    if (agent.search(/Android/) != -1 && agent.search(/Mobile/) != -1) { androidphone = true };
    if (agent.search(/Android/) != -1 && androidphone == false)        { android      = true };

    // ------------------------------
    // UA機種別に命令したい場合
    // ------------------------------

    /* iPhone */
    if (iPhone == true) {
    }

    /* iPad */
    if (iPad == true) {
      $(window).load(function() {
        $('meta[name=viewport]').attr('content','width=1100px');
      });
    }

    /* Android Phone and Tablet */
    if (android == true) {
    }

    /* Android phone */
    if (androidphone == true) {
    }

    /* MacOS */
    if (OSX == true) {
    }



  });

})(jQuery);



/*image rollover*/
var load_event = function(){
  $('a>img[src*="-out-"],input[src*="-out-"]').each(function(){
    var $$ = $(this);
    $$.mouseover(function(){ $(this).attr('src', $(this).attr('src').replace(/-out-/,'-on-')) });
    $$.mouseout (function(){
      if ( $(this).attr('wws') != 'current' ) { $(this).attr('src', $(this).attr('src').replace(/-on-/,'-out-')) }
    });
  });

}

var load_subwin = function(){
  $('a[subwin]').off('click').click(subwin_func);
}

/*sub window*/
var subwin_func = function () {
  var $$ = $(this);
  var param = $$.attr('subwin').split(/\D+/);
  var w = param[0] || 300;
  var h = param[1] || 300;
  var s = ($$.attr('subwin').match(/slim/))?'no':'yes';
  var r = ($$.attr('subwin').match(/fix/) )?'no':'yes';
  var t = $$.attr('target') || '_blank' ;
  window.open( $$.attr('href'), t, "resizable="+r+",scrollbars="+s+",width="+w+",height="+h ).focus();
  return false;
}