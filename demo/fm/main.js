var audio = $('#audio').get(0);
var progress = $('progress').get(0);


//播放音乐
var musicPlay = function() {
	$.ajax({
		url: 'http://api.jirengu.com/fm/getSong.php',
		dataType: 'json',
		Method: 'get',
		data: {
			'channel': $('.collect').attr('data-id')
		},
		success: function(song) {
			var songINF = song.song[0];
			songurl = songINF.url,
				name = songINF.title,
				singer = songINF.artist,
				image = songINF.picture;


			audio.src = songurl;
			$(".musicName").text(name);
			$(".musicer").text(singer);
			$(".front-Cover").css({
				'background-image': 'url(' + image + ')',
				'background-repeat': 'no-repeat',
				'background-size': 'cover',
			});
			audio.pause();
			audio.play();
		}
	});
};

//获得专辑
var getChannel = function() {
	$.ajax({
		url: 'http://api.jirengu.com/fm/getChannels.php',
		dataType: 'json',
		Method: 'get',
		success: function(response) {
			console.log(response);
			var channels = response.channels;
			var num = Math.floor(Math.random() * channels.length);
			var channelId = channels[num].name; //获取随机频道ID
			$('.collect').attr('data-id', channelId); //将频道ID计入data-id中
			$('.channelName').text(channelId);
			musicPlay();
			console.log(channelId);
			console.log(response);
			console.log(num);
		}
	})
};


// 进度条更新
function updateProgress() {
	setTimeout(function() {
		progress.max = audio.duration;
	}, 1000);

	setInterval(function() {
		progress.value = 0;
		progress.value = audio.currentTime;
	}, 1000);
};


// 点击更改按钮样式与颜色
var buttonColor = function() {
	if (audio.paused == false) {
		$('.play').css("color", "#b92500");
		$('.pause').css("color", "#646465");
	} else if (audio.paused == true) {
		$('.play').css("color", "#303031");
		$('.pause').css("color", "#b92500");
	};
};


//以下都是按钮点击绑定的事件

//播放
$('.but1').click(function() {
	audio.play();
	buttonColor();
	if (!$('.but1').hasClass("pause")) {
		$('.but1').html('&#xe608;').addClass('pause').removeClass('play');
		audio.pause();
	}else{
		$('.but1').html('&#xe605;').addClass('play').removeClass('pause');
		audio.play();
	};
	
});

//暂停
$('.pause').click(function() {
	audio.pause();
	buttonColor();
})

document.onkeydown = function(event){
	if(event.keyCode == '32'){
		if(audio.paused == false){
			$('.but1').html('&#xe608;').addClass('pause').removeClass('play');
			audio.pause(); //暂停 
			buttonColor();
		}else{
			$('.but1').html('&#xe605;').addClass('play').removeClass('pause');
			audio.play();
			buttonColor();
		}
	}
};

//下一首
$('.next').click(function() {
	if (!$('.but1').hasClass("pause")) {
		
	}else{
		//如果是在暂停的情况下点击了下一曲
		$('.but1').html('&#xe605;').addClass('play').removeClass('pause');
		$('.play').css("color", "#303031");
		audio.play();
	};
	musicPlay();
	updateProgress()
});

//下一张专辑
$(".nextChannel").click(function() {
	getChannel();
});


//点击分享
$('#a-share').click(function() {
	$('#a-share').get(0).href = 'http://service.weibo.com/share/share.php?url=' + encodeURIComponent(location.href) + '&title=hi' + encodeURIComponent(location.href)

});

//点亮收藏
$('.collect').click(function() {
	if ($('.collect').hasClass("collect-color")) {
		$('.collect').removeClass('collect-color');
	} else {
		$('.collect').addClass('collect-color');
	}
});

//点亮喜欢
$('.like').click(function() {
	if ($('.like').hasClass("like-color")) {
		$('.like').removeClass('like-color');
	} else {
		$('.like').addClass('like-color');
	}
});

//点击循环播放
$('.loop').click(function() {
	if ($('.loop').hasClass("loop-color")) {
		$('.loop').removeClass('loop-color');
	} else {
		$('.loop').addClass('loop-color');
	};

	if ($('.loop').hasClass("loop-color")) {
		$('#audio').attr({
			loop: 'loop'
		});

	} else {
		$('#audio').removeAttr('loop');
	}
});

//点击显示歌词
$('.words').click(function() {
	if ($('.words').hasClass("words-display")) {
		$('.words').removeClass('words-display');
	} else {
		$('.words').addClass('words-display');
		alert('非常抱歉，歌词功能尚未上线');
	}
});


//自动下一首
var autoplay = function() {
	if ((audio.duration - progress.value < 1) && (!$('.loop').hasClass("loop-color"))) {
		musicPlay(); //下一首 
		updateProgress();
	} else {};
};
setInterval(autoplay, 1000);



updateProgress();
$(document).ready(getChannel());



