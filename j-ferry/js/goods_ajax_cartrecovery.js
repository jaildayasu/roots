// �J�[�g���J�o���[�f�[�^�^�O�����p��Ajax���Ăяo��
jQuery(document).ready(function () {
	
	// �Ăяo����(Ajax)�̃p�X
	var ajaxPath = "";
	// script�̒ǉ���
	var target = "";
	
	if (jQuery("#cartrecovery_order").length && !jQuery(".notice_").length){
		// �����������
		target = jQuery("#cartrecovery_order");
		ajaxPath = "/shop/CartRecovery/SalesItemTagAjax.aspx"
	}else if(jQuery("#cartrecovery_ssl").length){
		// SSL���
		target = jQuery("#cartrecovery_ssl");
		ajaxPath = "/shop/CartRecovery/CartItemTagAjaxSSL.aspx"
	}else if(jQuery("#cartrecovery_nonssl").length){
		// ��SSL���
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