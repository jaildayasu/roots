var searchSuggestFormSelector = ".withSuggestSearch_";
var searchSuggestAreaSelector = "#search_suggest_area_";
var searchSuggestPendingTime  = 200;
var searchSuggestMinLength    = 1;
var searchSuggestURL          = '';
var searchSuggestAreaTmpl     = '<div id="search_suggest_area_"></div>';
var searchSuggestTimer        = null;
var searchSuggestCurrentForm  = null;

// ����������
jQuery(document).ready(function() {
	
	// �T�W�F�X�gAjax��URL����
	searchSuggestURL = EC_WWW_ROOT + "/shop/search/searchsuggest.aspx";
	
	// �L�[���[�h����͂����A�܂��́A�L�[���[�h�Ƀt�H�[�J�X�����ꍇ�̃C�x���g
	jQuery(searchSuggestFormSelector).on(
		"keyup focus input" , function(e) { triggerSearchSuggest( e, jQuery(this) ); }
	);
	
	jQuery(searchSuggestFormSelector).on(
		"keydown" , function(e) {
						if( e.which == 40 ) {
							jQuery(searchSuggestAreaSelector).find('a:first').focus();
							e.preventDefault();
							e.stopPropagation();
						}
	});

	jQuery(document).on(
		"keydown", searchSuggestAreaSelector,  function(e) {
						if( e.which == 38 ) {
							var prevObj          = jQuery(document.activeElement).parent().prev();
							var prevObjParent    = jQuery(document.activeElement).parent().parent().prev();

							if(!prevObj[0] && !prevObjParent[0]) {
								jQuery(searchSuggestAreaSelector).find('a:last').focus();
							} else if(prevObj[0]) {
								prevObj.find('a:last').focus();
							} else if(prevObjParent[0]) {
								prevObjParent.children(':last').find('a:last').focus();
							}
							e.preventDefault();
							e.stopPropagation();

						}
						if( e.which == 40 ) {	
							var nextObj = jQuery(document.activeElement).parent().next();
							var nextObjParent    = jQuery(document.activeElement).parent().parent().next();

							if(!nextObj[0] && !nextObjParent[0]) {
								jQuery(searchSuggestAreaSelector).find('a:first').focus();
							} else if(nextObj[0]) {
								nextObj.find('a:first').focus();
							} else if(nextObjParent[0]) {
								nextObjParent.children(':first').find('a:first').focus();
							}
							e.preventDefault();
							e.stopPropagation();
						}
						if (e.which == 13) {
							return jQuery(document.activeElement).click();
						}
	});

	jQuery(document).on(
		"focus", searchSuggestAreaSelector,  function(e) {
									jQuery(searchSuggestAreaSelector).find('#suggest_keyword_list_').children('div.suggest_keyword_').css({'background-color':''});
									jQuery(searchSuggestAreaSelector).find('#suggest_goods_list_').children().css({'background-color':''});
									jQuery(e.target).parent().css({'background-color':'#dedede'});
	});

	// �T�W�F�X�g�L�[���[�h���N���b�N���ꂽ�ꍇ�̃C�x���g
	jQuery(document).on(
		"click", ".suggest_keyword_entry_", function() { selectSearchSuggestKeyword(jQuery(this)); return false; }
	);
	
	// �T�W�F�X�g���i���N���b�N���ꂽ�ꍇ�̃C�x���g
	jQuery(document).on(
		"click", ".suggest_goods_", function() { selectSearchSuggestGoods(jQuery(this)); }
	);
	
	// �T�W�F�X�g�G���A�O���N���b�N���ꂽ�ꍇ�̃C�x���g
    jQuery("body").on(
    	"click", function(e){ hideSearchSuggest(e); }
    );
	
});

// �T�W�F�X�g�L�[���[�h�I�����̏���
function selectSearchSuggestKeyword(entry) {
	jQuery(searchSuggestCurrentForm).val(entry.text());
	if (jQuery(searchSuggestCurrentForm).data("suggest-submit") == "on") {
		// suggest-submit��on�̎���form��submit
		jQuery(searchSuggestCurrentForm).closest("form").submit();
	}else{
		// suggest-submit��off�̎��̓T�W�F�X�g�G���A�����
		removeSearchSuggest();
	}
}

// �T�W�F�X�g���i�I�����̏���
function selectSearchSuggestGoods(entry) {
	location.href = entry.find("a").attr("href");
}

// �L�[���[�h���͌�T�W�F�X�g�\���^�C�}�[�J�n����
function triggerSearchSuggest(e, inputForm) {
	
	var inputKeyword = inputForm.val();
	
	// �G���^�[�̏ꍇ�͒��f
    if (e.keyCode == 13) {
        return false;
    }
	
	// ���ɕ\���^�C�}�[���J�n����Ă���ꍇ�͎�����
	if (searchSuggestTimer) {
		clearTimeout(searchSuggestTimer);
		searchSuggestTimer = null;
	}
	
	// ���͂��󂩍Œ���͕������ɖ����Ȃ��ꍇ�͒��f
	if (inputKeyword == '' || inputKeyword.length < searchSuggestMinLength){
		removeSearchSuggest();
		return false;
	}
	
	// �\���^�C�}�[���Z�b�g
    searchSuggestTimer = setTimeout(function() {
    		    searchSuggestTimer = null;
                requestSearchSuggest(inputForm, inputKeyword);
	          }, searchSuggestPendingTime);
	
}

// �T�W�F�X�g�\���^�C�}�[���^�C���A�E�g��̏���
function requestSearchSuggest(inputForm, inputKeyword) {
	
    jQuery.ajax({
        url: searchSuggestURL,
        type: "POST",
        dataType: "html",
        cache: false,
        data: {input_keyword : inputKeyword},
        success: function(responseHtml) {
			// �T�W�F�X�g�G���A����
			removeSearchSuggest();
			
			// �T�W�F�X�g�f�[�^����M�������L�[���[�h���N���A����Ă����ꍇ�͒��f
			if (inputForm.val() == '') { return; }
			
			// �T�W�F�X�g�f�[�^����i���s�݂̂̏ꍇ���܂ށj�̏ꍇ�͒��f
			if (responseHtml.replace(/\s+$/, "") == '') { return; }
			
			// �T�W�F�X�g�f�[�^���Z�b�V�����؂�HTML���ɒu��������Ă���ꍇ�͒��f
			if (responseHtml.indexOf("suggest_keyword_list") == -1 && responseHtml.indexOf("suggest_goods_list") == -1) { return; }
			
			// �T�W�F�X�g�G���A�\��
            showSearchSuggest(inputForm, responseHtml);
        }
    });
	
}

// �T�W�F�X�g�G���A�\������
function showSearchSuggest(inputForm, responseHtml) {

	// �T�W�F�X�g�G���A�̃e���v���[�g��ǉ�
	jQuery("body").append(searchSuggestAreaTmpl);
	
	// �T�W�F�X�g�G���A��HTML���Z�b�g
	var suggestArea = jQuery(searchSuggestAreaSelector);
    suggestArea.html(responseHtml);

	// �\���ʒu�̒���
	var ctrl = inputForm;
	var ctrlOffset = ctrl.offset();
	var ctrlLeft = ctrlOffset.left;
	var ctrlTop = ctrlOffset.top + jQuery(ctrl).outerHeight(false);
	suggestArea.offset({ top : ctrlTop, left : ctrlLeft });

	var paddingWidth = parseInt(suggestArea.css('margin-left')) 
	                 + parseInt(suggestArea.css('margin-right'))
	                 + parseInt(suggestArea.css('padding-left'))
	                 + parseInt(suggestArea.css('padding-right'));
	var width = jQuery(ctrl).outerWidth(true) - paddingWidth;
	suggestArea.css("min-width",width);
	
	// �T�W�F�X�g��\�������t�H�[����ێ�
	searchSuggestCurrentForm = inputForm;
	
	// �T�W�F�X�g�G���A�\��
    suggestArea.show();
	
}

// �T�W�F�X�g�G���A��\������Ɣ�\�������Ăяo��
function hideSearchSuggest(e) {
	
	var suggestArea = jQuery(searchSuggestAreaSelector);
	if (suggestArea.size()) {
		 var x = e.clientX + jQuery(window).scrollLeft();
         var y = e.clientY + jQuery(window).scrollTop();
         var ctrlOffset = suggestArea.offset();
         var startX = ctrlOffset.left;
         var endX = startX + suggestArea.outerWidth(true);
         var startY = ctrlOffset.top;
         var endY = startY + suggestArea.outerHeight(true);
         
         if (x < startX || x > endX || y < startY || y > endY) {
         	removeSearchSuggest();
         }
	}
}


// �T�W�F�X�g�G���A��\������
function removeSearchSuggest() {
	jQuery(searchSuggestAreaSelector).remove();
	searchSuggestCurrentForm = null;
}

