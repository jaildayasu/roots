jQuery(document).ready(function () {

    var wait_class = 'ajax_wait_sub_button_';
    var wait_value = '���҂���������...';

    var refresh = function (elem) {
        var goods = jQuery(elem).attr("target_goods");
        if (!goods) {
            return true;
        }
        jQuery.ajax({
            async: true,
            type: "POST",
            url: EC_WWW_ROOT + "/shop/customer/bookmarkajax.aspx",
            data: { "goods": goods, "crsirefo_hidden": add_crsirefo, "type": "status" },
            cache: false,
            ifModified: false,
            dataType: "json",
            success: function (msg) {
                if (msg == "on") {
                    jQuery(elem).removeClass("goods_fav_off").addClass("goods_fav_on");
                } else {
                    jQuery(elem).addClass("goods_fav_off").removeClass("goods_fav_on");
                }
            },
            error: function (xhr, status, thrown) {
                return false;
            }
        });
    }

    var $btn_bookmark = jQuery(".btn_bookmark_");
    var bookmark_width = $btn_bookmark.width();
    var noraml_class = $btn_bookmark.attr("class");
    var normal_value = $btn_bookmark.attr("value");

    $btn_bookmark.each(function(){
        refresh(this);
    });

    $btn_bookmark.attr({onclick: ""});
    $btn_bookmark.unbind("click");
    $btn_bookmark.bind("click", function (e) {

        var loadStart = function (elem) {
            jQuery(elem).attr({
                class: noraml_class + ' ' + wait_class,
                value: wait_value
            });
            return elem;
        }

        var loadEnd = function (elem, iserror, msg) {
            if (!iserror) {
                jQuery(elem).showBalloon({
                    contents: msg,
                    classname: "balloons",
                    hideAnimation: function(d) { this.slideUp(d); },
                    offsetX: 0,
                    css: {
                        fontWeight: "bold",
                        backgroundColor: "#000000",
                        color: "#fff",
                        opacity: "0.7",
                        width: "auto"
                    }
                });
                setTimeout(function() {
                    jQuery(elem).hideBalloon();
                    //jQuery(elem).attr({
                    //    class: noraml_class,
                    //    value: normal_value
                    //});
                    jQuery(elem).attr({
                        value: normal_value
                    });
                    jQuery(elem).removeClass(wait_class);
                }, 2000); //�o���[���\������

               //���݂̂��C�ɓ���󋵂ɕ\����ؑ�
               refresh(elem);
            }
            else {
                jQuery(elem).attr({
                    class: noraml_class,
                    value: normal_value
                });
            }
        }

        var addBookmark = function (b, g) {
            var o = loadStart(b);
            jQuery.ajax({
                async: true,
                type: "POST",
                url: EC_WWW_ROOT + "/shop/customer/bookmarkajax.aspx",
                data: { "goods": g, "crsirefo_hidden": add_crsirefo },
                cache: false,
                ifModified: false,
                dataType: "json",
                success: function (msg) {
                    setTimeout(function () {
                        loadEnd(o, false, msg);
                    }, 400);
                },
                error: function (xhr, status, thrown) {
                    loadEnd(o, true);
                    alert("�Z�b�V�����̗L�����Ԃ�����܂����B\n" +
                          "���ɋ������܂����ēx�g�b�v�y�[�W���̃A�N�Z�X�����肢�������܂��B\n\n" +
                          "�����T�C�g�ł͂��q�l�̏��ی�̂��߁A��莞�Ԍo�ߌ�ɐڑ��������������Ă��������Ă���܂��B");
                    return false;
                }
            });
            return true;
        }

        if (jQuery(this).attr("class").indexOf(wait_class) != -1) {
            return false;
        }
        if (!add_crsirefo) {
            return true;
        }

        var goods = jQuery(this).attr("target_goods");
        if (!goods) {
            return true;
        }

        addBookmark(this, goods);
        return false;
    });
});
