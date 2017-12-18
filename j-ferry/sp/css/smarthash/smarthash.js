//<![CDATA[
$(document).ready(function(){

  // 本番時は下の「client」部分をお申込時のディレクトリ名に置き換えてご利用ください
  var json_url = 'https://asp.smartcontest.jp/hashtag/jferry/?c=json&turn=21';
  var key_num = 0;

  function getJson(jurl) {
    $.ajax({
      url: jurl,
      dataType: 'jsonp',
      jsonpCallback: 'get_json',
      type: "GET",
      success: function(data) {
        var insert = '';
          for (var key in data) {
            insert += '<li class="goods_list_item sp_list">';

            // リストのHTML
            insert += '<a href="' + data[key].url + '" target="_blank"><img src="' + data[key].thum_url + '" class="instagram-image" /></a>';
            /*insert += '<p>' + data[key].username + '</p>';*/

            insert += '</li>';
            key_num ++;
          };

        // HTML書き出し先
        $('.smarthash ul').append(insert);

        //エラー画像チェック
        $('.smarthash_zoom img, .smarthash img').error(function(){
          $(this).attr({src:"img/noimg.png"});
        });
      },
      error: function(data) {
        console.log('error');
      }
    });
  };
  getJson(json_url);

  /* more */
  $('.smarthash_more_btn').click(function(){
    getJson(json_url + '&sk=' + key_num);
  });

});
//]]>