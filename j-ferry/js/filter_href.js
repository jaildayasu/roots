function filter_search_go(name,code) {
	var url = EC_WWW_ROOT + '/shop/goods/search.aspx?';
	url += name + '=' + code;
	location.href = url;
}

function filter_search_go_left(name,code) {
	var url = EC_WWW_ROOT + '/shop/goods/search.aspx?';
	var urlParam = location.search.substring(1);
	var isaddparam = 'false';
	if(urlParam) {
	  var param = urlParam.split('&');
	  var paramArray = [];
	  for (i = 0; i < param.length; i++) {
	    var paramItem = param[i].split('=');
	    
	    if ( i > 0 )
	    {
	    	url += '&';
	    }
	    
	    if ( name == paramItem[0] )
		{
			url += name + '=' + code;
			isaddparam = 'true';
	    } else {
			url += paramItem[0] + '=' + paramItem[1];
	    }
	  }
	  if ( isaddparam == 'false' )
	  {
		url += '&' + name + '=' + code;
	  }
	} else {
		url += name + '=' + code;
	}
	location.href = url;
}

function filter_search_go_left_price() {

	var min = document.frmSearchPrice.minpr.value;
	var max = document.frmSearchPrice.maxpr.value;
	var url = EC_WWW_ROOT + '/shop/goods/search.aspx?';
	var urlParam = location.search.substring(1);
	var isaddparam = 'false';
	if(urlParam) {
	  var param = urlParam.split('&');
	  var paramArray = [];
	  for (i = 0; i < param.length; i++) {
	    var paramItem = param[i].split('=');

	    if ( i > 0 )
	    {
	    	url += '&';
	    }
	    
	    if ( 'minpr' == paramItem[0] )
		{
			url += 'minpr' + '=' + min;
			isaddparam = 'true';
	    } else if ( 'maxpr' == paramItem[0] ) {
			url += 'maxpr' + '=' + max;
			isaddparam = 'true';
	    } else {
			url += paramItem[0] + '=' + paramItem[1];
	    }
	  }
  	  if ( isaddparam == 'false' )
	  {
		url += '&' + 'minpr=' + min + '&maxpr=' + max;
	  }
	} else {
		url += 'minpr=' + min + '&maxpr=' + max;
	}
	
	location.href = url;
}
