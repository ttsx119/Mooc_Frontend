// 导航栏特效
$('nav').find('li').eq(0).addClass('current');

$('nav').find('li').click(function() {
	$(this).addClass('current').siblings().removeClass('current');
});

// 热门课程切换
$('.tab_header').find('li').eq(0).addClass('current');
$('.tab_body').find('ul').eq(0).show();
$('.tab_body').find('ul').eq(1).hide();

$('.tab_header').find('li').click(function() {
	$(this).addClass('current').siblings().removeClass('current');

	$('.tab_body').find('ul').hide();
	$('.tab_body').find('ul').eq($(this).index()).show();
});

// 请求分类数据并显示
$.ajax({
	type: 'GET',
	url: 'http://localhost:5000/api/classification',
	dataType: 'json',
	success: function(data) {
		var html  = '';
		var index = 0;

		data.map(function(superItem) {
			if (superItem.parentID === 0) {
				html += '<li>';
				html += '<div class="menu">';
				html += '<h2>';
				html += superItem.name;
				html += '<span></span>';
				html += '</h2>';

				data.map(function(item) {
					if (item.parentID === superItem.id) {
						data.map(function(subItem) {
							if (subItem.parentID === item.id) {
								index++;

								if (index < 8) {
									html += '<a href="';
									html += subItem.link;
									html += '" target="_parent">';
									html += subItem.name;
									html += '</a>';
								}
							}
						});
					}
				});

				html += '</div>';
				html += '<div class="menu_sub">';

				data.map(function(item) {
					if (item.parentID === superItem.id) {
						html += '<dl>';
						html += '<dt>';
						html += item.name;
						html += '</dt>';
						html += '<dd>';

						data.map(function(subItem) {
							if (subItem.parentID == item.id) {
								html += '<a href="';
								html += subItem.link;
								html += '" target="_parent">';
								html += subItem.name;
								html += '</a>';
							}
						});

						html += '</dd>';
						html += '</dl>';
					}
				});

				html += '</div>';
				html += '</li>';

				index = 0;
			}
		});

		$('aside').find('ul').html(html);
	}
});