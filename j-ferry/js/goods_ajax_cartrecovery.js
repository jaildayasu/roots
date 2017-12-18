// カートリカバリーデータタグ生成用のAjaxを呼び出す
jQuery(document).ready(function () {
	
	// 呼び出し先(Ajax)のパス
	var ajaxPath = "";
	// scriptの追加先
	var target = "";
	
	if (jQuery("#cartrecovery_order").length && !jQuery(".notice_").length){
		// 注文完了画面
		target = jQuery("#cartrecovery_order");
		ajaxPath = "/shop/CartRecovery/SalesItemTagAjax.aspx"
	}else if(jQuery("#cartrecovery_ssl").length){
		// SSL画面
		target = jQuery("#cartrecovery_ssl");
		ajaxPath = "/shop/CartRecovery/CartItemTagAjaxSSL.aspx"
	}else if(jQuery("#cartrecovery_nonssl").length){
		// 非SSL画面
		target = jQuery("#cartrecovery_nonssl");
		ajaxPath = "/shop/CartRecovery/CartItemTagAjax.aspx"
	}else{
		return;
	}
	
	jQuery.ajax({
		async: true,
		url: EC_WWW_ROOT + ajaxPath,
		type: "POST",
		cache: false,
		dataType: "json",
		success: function (data) {
			jQuery(target).append(data);
		}
	});
});