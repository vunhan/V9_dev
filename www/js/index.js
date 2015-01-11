document.addEventListener("deviceready", createV9Player, false);
var strPathMediaFile;
function createV9Player() {
	var foo;
	var player;
	$(function() {
		player = new VP9.player(
				{
					tech : 'HTML5', // HTML5 | Projekktor
					cordova : false, // true | false, in android, need user
										// gesture to play video, need cordova
										// to autoplay video in android
					tag : '#player', // css selector
					autoplay : true, // true | false
					live : false, // true | false
					autoNext : true, // true | false
					activeVideo : 0, // 0,1,... video index in begin
					plugins : [ 'subtitle' ], // ['subtitle', 'karaoke',
												// 'epg']
					controls : [ 'timeleft', 'progress', 'fullscreen', 'next',
							'prev' ],
					swf : 'projekktor/swf/', // swf projekktor folder
					tagClick : false, // true | false
					scale : true, // true | false
					playlist : [ {
						0 : {
							id : '',
							name : 'Phim 1',
							src : '/storage/emulated/0/video.mp4',
							type : 'video/mp4',
							subtitle : [
									'http://f.vp9.tv/sub/2013/the-croods.2013.vie.ass',
									'http://f.vp9.tv/sub/2013/the-croods.2013.eng.ass' ]
						}
					} ],
					ready : function() {
						// on ready
					}
				});
	});

	function clickButton() {
		//alert("CLICK BUTTON");
		alert(foo);
		//player.setPathMediaFile();
	}
}
