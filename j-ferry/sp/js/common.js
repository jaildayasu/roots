/// <reference path="jquery.js"/>
jQuery.noConflict();

// global�ϐ�
var EC_WWW_ROOT = '';

// default charset�̐ݒ�
jQuery.ajaxSetup({ contentType: 'application/x-www-form-urlencoded; charset=utf-8' });

// util
function _ecUtil() {
    // �_�u���N���b�N�֎~����
    this.ignoreDblClickFlag = null;

    // �X�֔ԍ�����
    var timerId_lookupzip_ = null;
    var zipcache_lookupzip_ = '';
    var timerId_zipcache_ = null;

    // �S�p���p�ϊ�
    this.hanMap = {};
    this.zenMap = {
        '��': 'a', '��': 'b', '��': 'c', '��': 'd', '��': 'e', '��': 'f', '��': 'g', '��': 'h', '��': 'i', '��': 'j',
        '��': 'k', '��': 'l', '��': 'm', '��': 'n', '��': 'o', '��': 'p', '��': 'q', '��': 'r', '��': 's', '��': 't',
        '��': 'u', '��': 'v', '��': 'w', '��': 'x', '��': 'y', '��': 'z', '�`': 'A', '�a': 'B', '�b': 'C', '�c': 'D',
        '�d': 'E', '�e': 'F', '�f': 'G', '�g': 'H', '�h': 'I', '�i': 'J', '�j': 'K', '�k': 'L', '�l': 'M', '�m': 'N',
        '�n': 'O', '�o': 'P', '�p': 'Q', '�q': 'R', '�r': 'S', '�s': 'T', '�t': 'U', '�u': 'V', '�v': 'W', '�w': 'X',
        '�x': 'Y', '�y': 'Z', '�O': '0', '�P': '1', '�Q': '2', '�R': '3', '�S': '4', '�T': '5', '�U': '6', '�V': '7',
        '�W': '8', '�X': '9', '�I': '!', '��': '@', '��': '#', '��': '$', '��': '%', '�O': '^', '��': '&', '��': '*',
        '�i': '(', '�j': ')', '�Q': '_', '�{': '+', '�b': '|', '�P': '~', '�|': '-', '��': '=', '��': '\\', '�M': '`',
        '�o': '{', '�p': '}', '�m': '[', '�n': ']', '�F': ':', '�h': '"', '�G': ';', '�f': '\'', '��': '<', '��': '>',
        '�H': '?', '�C': ',', '�D': '.', '�^': '/', '�B': '�', '�u': '�', '�v': '�', '�A': '�', '�E': '�', '��': '�',
        '�@': '�', '�B': '�', '�D': '�', '�F': '�', '�H': '�', '��': '�', '��': '�', '��': '�', '�b': '�', '�[': '�',
        '�A': '�', '�C': '�', '�E': '�', '�G': '�', '�I': '�', '�J': '�', '�L': '�', '�N': '�', '�P': '�', '�R': '�',
        '�T': '�', '�V': '�', '�X': '�', '�Z': '�', '�\': '�', '�^': '�', '�`': '�', '�c': '�', '�e': '�', '�g': '�',
        '�i': '�', '�j': '�', '�k': '�', '�l': '�', '�m': '�', '�n': '�', '�q': '�', '�t': '�', '�w': '�', '�z': '�',
        '�}': '�', '�~': '�', '��': '�', '��': '�', '��': '�', '��': '�', '��': '�', '��': '�', '��': '�', '��': '�',
        '��': '�', '��': '�', '��': '�', '��': '�', '��': '�', '�K': '��', '�M': '��', '�O': '��', '�Q': '��', '�S': '��',
        '�U': '��', '�W': '��', '�Y': '��', '�[': '��', '�]': '��', '�_': '��', '�a': '��', '�d': '��', '�f': '��', '�h': '��',
        '�o': '��', '�p': '��', '�r': '��', '�s': '��', '�u': '��', '�v': '��', '�x': '��', '�y': '��', '�{': '��', '�|': '��',
        '��': '��', '�J': '�', '�K': '�', '�@': ' '
    };

    // ���p->�S�p�}�b�v
    for (var key in this.zenMap) {
        if (!this.hanMap[this.zenMap[key]]) {
            this.hanMap[this.zenMap[key]] = key;
        }
    }

    // ���p<->�S�p�ϊ�
    this.strConvert = function(obj, isHanToZen) {
        if (obj.value == obj.getAttribute("title")){
            return true;
        }
        var str = obj.value;
        var conv = '';
        var map = isHanToZen ? this.hanMap : this.zenMap;

        for (var i = 0; i < str.length; i++) {
            var tmp = '';
            if (i < str.length - 1) {
                tmp = str.substring(i, i + 2);
            }
            if (map[tmp]) {
                conv += map[tmp];
                i++;
                continue;
            } else {
                tmp = str.substring(i, i + 1);
                conv += map[tmp] ? map[tmp] : tmp;
            }
        }
        obj.value = conv;
        return true;
    }

    // �_�u���N���b�N�i�A���|�X�g�j�̐���
    this.ignoreDblClick = function() {
        if (this.ignoreDblClickFlag == null) {
            this.ignoreDblClickFlag = 1;
            return true;
        } else {
            return false;
        }
    }

    // html�^�O�̒u������
    this.htmlspecialchars = function(str) {
        if (!str || str == '') { return ''; }
        str = str.replace(/&/g, '&amp;');
        str = str.replace(/"/g, '&quot;');
        str = str.replace(/'/g, '&#039;');
        str = str.replace(/</g, '&lt;');
        str = str.replace(/>/g, '&gt;');
        return str;
    }

    // �X�֔ԍ�����
    this.lookupZipInit = function(zip, pref, addr, addr2, cnt, offset) {
        var defaultXOffset = 90;
        var timerOffset = 300;

        var zip_id = '#' + zip + cnt;
        var pref_id = '#' + pref + cnt;
        var addr_id = '#' + addr + cnt;
        var addr2_id = '#' + addr2 + cnt;

        offset = offset + defaultXOffset;
        jQuery(zip_id).bind('keyup paste', function() {
            jQuery('ul.ziplist_').remove();

            clearTimeout(timerId_zipcache_);
            timerId_zipcache_ = setTimeout( function() {
            if (zipcache_lookupzip_ == jQuery(zip_id).val()) {
                zipcache_lookupzip_ = jQuery(zip_id).val();
                return false;
            }
            zipcache_lookupzip_ = jQuery(zip_id).val();
            }, timerOffset);

            clearTimeout(timerId_lookupzip_);
            timerId_lookupzip_ = setTimeout(function() {
                if (!jQuery(zip_id).val().match(/^[0-9]{3}[\-]{0,1}[0-9]{0,4}$/)) {
                    return true;
                }
                jQuery.get('../search/lookupzipjson.aspx',
                  {
                      zip: jQuery(zip_id).val(),
                      charset: 'shift_jis'
                  },
                function(data, status) {
                    var of = jQuery(zip_id).offset();
                    var ul = jQuery('<ul></ul>').addClass('ziplist_');
                    ul.css('top', of.top);
                    ul.css('left', of.left + offset);

                    var searchCount = 0;
                    var tempzip, temppref, tempaddr, tempaddr2;
                    jQuery.each(data, function(key, item) {
                        searchCount++;
                        tempzip = item.zip;
                        temppref = item.pref;
                        tempaddr = item.addr;
                        tempaddr2 = item.addr2;

                        var li = jQuery('<li>' + key + ' ' + item.pref + ' ' + item.addr + ' ' + item.addr2 + '</li>');
                        li.bind('click', function() {
                            jQuery(zip_id).val(item.zip);
                            jQuery(pref_id).val(item.pref);
                            jQuery(addr_id).val(item.addr);
                            jQuery(addr2_id).val(item.addr2);
                            jQuery('ul.ziplist_').remove();
                            jQuery(zip_id).blur();
                            jQuery(pref_id).change();
                            jQuery(addr_id).focus();
                            jQuery(addr2_id).blur().focus();
                            return false;
                        });
                        li.bind('mouseover', function() { li.addClass('hover'); });
                        li.bind('mouseleave', function() { li.removeClass('hover'); });
                        ul.append(li);
                    });

                    if ((searchCount == 1) && (zipcache_lookupzip_.replace("-","").length == 7)) {
                        jQuery(zip_id).val(tempzip);
                        jQuery(pref_id).val(temppref);
                        jQuery(addr_id).val(tempaddr);
                        jQuery(addr2_id).val(tempaddr2);
                        jQuery('ul.ziplist_').remove();
                        jQuery(zip_id).blur();
                        jQuery(pref_id).change();
                        jQuery(addr_id).focus();
                        jQuery(addr2_id).blur().focus();
                        return false;
                    } else if (searchCount != 0) {
                        jQuery(document.body).append(ul);
                    }
                }, 'json'
                );
            }, timerOffset);
        });
    }

    // �ėp���̓`�F�b�N
    this.confirmInputCheck = function() {
        // ���[���A�h���X�`�F�b�N
        if (jQuery('#mail').size() == 1 && jQuery('#cmail').size() == 1) {
            if (jQuery('#mail').val() != jQuery('#cmail').val()) {
                alert('���[���A�h���X�ƃ��[���A�h���X�i�m�F�j����v���܂���');
                ecUtil.ignoreDblClickFlag = false;
                return false;
            }
        }

        // ���[���A�h���X�`�F�b�N�Q
        if (jQuery('#newmail1').size() == 1 && jQuery('#newmail2').size() == 1) {
            if (jQuery('#newmail1').val() != jQuery('#newmail2').val()) {
                alert('���[���A�h���X�ƃ��[���A�h���X�i�m�F�j����v���܂���');
                ecUtil.ignoreDblClickFlag = false;
                return false;
            }
        }

        // �p�X���[�h�`�F�b�N
        if (jQuery('#pwd').size() == 1 && jQuery('#cpwd').size() == 1) {
            if (jQuery('#pwd').val() != jQuery('#cpwd').val()) {
                alert('���͂��ꂽ�p�X���[�h�Ɗm�F�p�p�X���[�h����v���܂���');
                ecUtil.ignoreDblClickFlag = false;
                return false;
            }
        }

        // �p�X���[�h�`�F�b�N2
        if (jQuery('#npwd1').size() == 1 && jQuery('#npwd2').size() == 1) {
            if (jQuery('#npwd1').val() != jQuery('#npwd2').val()) {
                alert('���͂��ꂽ�p�X���[�h�Ɗm�F�p�p�X���[�h����v���܂���');
                ecUtil.ignoreDblClickFlag = false;
                return false;
            }
        }

        // ID�`�F�b�N
        if (jQuery('#newid1').size() == 1 && jQuery('#newid2').size() == 1) {
            if (jQuery('#newid1').val() != jQuery('#newid2').val()) {
                alert('���͂��ꂽID�Ɗm�F�pID����v���܂���');
                ecUtil.ignoreDblClickFlag = false;
                return false;
            }
        }
        
        // ID��PASS�̕s��v�m�F
        if (jQuery('#uid').size() == 1 && jQuery('#pwd').size() == 1) {
            if (jQuery('#uid').val() != "" && jQuery('#pwd').val() != "" ) {
	            if (jQuery('#uid').val() == jQuery('#pwd').val()) {
	                alert('���ID�ƃp�X���[�h�͕ʁX�̂��̂��w�肵�Ă�������');
	                jQuery('#pwd').val('');
	                jQuery('#cpwd').val('');
	                ecUtil.ignoreDblClickFlag = false;
	                return false;
	            }
			}
	    }
        
        return true;
    }

	// ���O�̍������s���Ƃɂ��낦��
	this.tileGoodsList = function() {
		
		// ��d���s�̖h�~
		var excuteKey = "goods_list_tiled";
		var tiled = jQuery(document).data(excuteKey);
		if (tiled) return;
		jQuery(document).data(excuteKey , true);
		
		// �Ώۂ̃Z���N�^
		var frameSelector = ".tile_frame_"; // �ꗗ���ރt���[��
		var lineSelector =  ".tile_line_";  // �s
		var itemSelector =  ".tile_item_";  // �X�̏��i
		var elmSelector =   ".tile_elm_";   // ���������킹��v�f
		
		// �ꗗ���ރt���[����������Ȃ��ꍇ�́A�������I��
		var frames = jQuery(frameSelector);
		if (frames.length < 1) return;
		
		frames.each(function() {
			
			// �Ώۂ̈ꗗ
			var frame = jQuery(this);
			
			// ��̐����擾
			var maxColumn = frame.find(lineSelector + ":first").children(itemSelector).size();
			
			// �w��v�f�̍����𑵂���
			if (maxColumn && maxColumn > 1) 
				frame.find(elmSelector).tile(maxColumn);
		});
	}
}

var ecUtil = new _ecUtil();
