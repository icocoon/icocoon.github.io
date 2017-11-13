var songs = [ {
	url: 'http://o768r1c9k.bkt.clouddn.com/ninelie.m4a',
	name: 'Ninelie',
	singer: 'Aimer',
	image: 'http://o768r1c9k.bkt.clouddn.com/ninelie.jpg'
},{
	url: 'http://obkhl70m6.bkt.clouddn.com/%E5%BC%A0%E6%99%BA%E6%88%90%20-%20%E4%BD%A0%E7%88%B1%E4%B8%8A%E7%9A%84%E6%88%91.m4a',
	name: '你爱上的我',
	singer: '张智成',
	image: "http://p4.music.126.net/A__m_hCfw1yPKFYwo2_iIg==/6672936069066682.jpg"
}, {
	url: 'http://o768r1c9k.bkt.clouddn.com/%E6%9E%97%E5%BF%86%E8%8E%B2%20-%20%E8%AF%8D%E4%B8%8D%E8%BE%BE%E6%84%8F.mp3',
	name: '词不达意',
	singer: '林忆莲',
	image: 'http://o768r1c9k.bkt.clouddn.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-08-09%2014.45.33.jpg'
}, {
	url: 'http://obkhl70m6.bkt.clouddn.com/%E6%9E%97%E4%BF%8A%E6%9D%B0%20-%20%E4%B8%8D%E4%B8%BA%E8%B0%81%E8%80%8C%E4%BD%9C%E7%9A%84%E6%AD%8C.mp3',
	name: '不为谁而作的歌',
	singer: '林俊杰',
	image: 'http://p3.music.126.net/CKcTyKux_UTt0sO_5VWR9w==/16561943649388272.jpg'
}, {
	url: 'http://o768r1c9k.bkt.clouddn.com/Sophie%20Zelmani%20-%20Breeze.mp3',
	name: 'Breeze',
	singer: 'Sophie Zelmani',
	image: 'http://o768r1c9k.bkt.clouddn.com/Sophie%20Zelmani%20-%20Breeze.jpg'
}, {
	url: 'http://o768r1c9k.bkt.clouddn.com/%E9%87%91%E6%B1%A0%20-%20%E5%8B%87%E6%B0%A3%20%28%E5%AE%98%E6%96%B9%E6%AD%8C%E8%A9%9E%E7%89%88%29%20-%20%E9%9B%BB%E8%A6%96%E5%8A%87%E3%80%8A%E5%B0%8F%E4%B8%88%E5%A4%AB%E3%80%8B%E7%89%87%E5%B0%BE%E6%9B%B2.mp3',
	name: '勇气',
	singer: '金池',
	image: "http://o768r1c9k.bkt.clouddn.com/%E9%87%91%E6%B1%A0.jpg"
},{
	url:'http://o768r1c9k.bkt.clouddn.com/Charlie%20Puth,Selena%20Gomez%20-%20We%20Don%27t%20Talk%20Anymore.mp3',
	name:"We Don't Talk Anymore",
	singer:'Charlie Puth',
	image:'http://o768r1c9k.bkt.clouddn.com/we%20dont%20talk%20anymore.png'
}];

var current = 0;
var audio = $('#audio').get(0);
var progress = $('progress').get(0);

//播放按键
function play(n) {
	var song = songs[n];
	audio.src = song.url;
	$(".musicName").text(song.name);
	$(".musicer").text(song.singer);


	$(".front-Cover").css({
		'background-image': 'url(' + song.image + ')',
		'background-repeat': 'no-repeat',
		'background-size': 'cover'
	});
	audio.pause();
	audio.play();

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
		$('.play').css("color", "#b92500")
		$('.pause').css("color", "#646465")
	} else if (audio.paused == true) {
		$('.play').css("color", "#303031")
		$('.pause').css("color", "#b92500")
	};
};


$('.play').click(function() {
	audio.play();
	buttonColor();
});
$('.pause').click(function() {
	audio.pause(); //暂停 
	buttonColor();
});

document.onkeydown = function(event){
	if(event.keyCode == '32'){
		if(audio.paused == false){
			audio.pause(); //暂停 
			buttonColor();
		}else{
			audio.play();
			buttonColor();
		}
	}
};


$('.next').click(function() {
	current = current + 1;
	if (current >= songs.length) {
		current = 0;
	}
	play(current); //下一首  
	buttonColor();
	updateProgress()
});

$('.collect').click(function() {
	if ($('.collect').hasClass("collect-color")) {
		$('.collect').removeClass('collect-color');
	} else {
		$('.collect').addClass('collect-color');
	}
});

$('.like').click(function() {
	if ($('.like').hasClass("like-color")) {
		$('.like').removeClass('like-color');
	} else {
		$('.like').addClass('like-color');
	}
});

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

$('.words').click(function() {
	if ($('.words').hasClass("words-display")) {
		$('.words').removeClass('words-display');
	} else {
		$('.words').addClass('words-display');
	}
});

$('#a-share').click(function() {
	$('#a-share').get(0).href = 'http://service.weibo.com/share/share.php?url=' + encodeURIComponent(location.href) + '&title=hi' + encodeURIComponent(location.href)

});



//自动播放
play(0);
updateProgress();

//自动下一首
var autoplay = function() {
	console.log(audio.duration);
	console.log(progress.value);
	if ((audio.duration - progress.value < 1) && (!$('.loop').hasClass("loop-color"))) {
		current = current + 1;
		if (current >= songs.length) {
			current = 0;
		};
		play(current); //下一首 
		updateProgress();
	} else {};
};
setInterval(autoplay, 1000);