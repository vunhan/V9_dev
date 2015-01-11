//
//VP9.player = function(browseFile) {
//document.addEventListener("deviceready", onDeviceReady, false);
var _currentFileSystem = null;
function onDeviceReady() {
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
			requestFileSystemSuccess, fail);
	//document.addEventListener("backbutton", BackKeyDown, true);
	// loadFileLocal();
}

var media = null;
function playMP3(path) {
	// var mp3URL = getMediaURL("sounds/a.mp3");
	alert(path);
	media = new Media(path, null, mediaError);
	media.play();
}

function stopMP3() {
	if (media !== null) {
		media.stop();
	}
}
function getMediaURL(s) {
	if (device.platform.toLowerCase() === "android")
		return "/android_asset/www/" + s;
	return s;
}

function mediaError(e) {
	alert('Media Error');
	alert(JSON.stringify(e));
}

function onFileSystemSuccess(fileSystem) {
	alert(fileSystem);
}

function onResolveSuccess(fileEntry) {
	console.log(fileEntry.name);
}

function fail(evt) {
	console.log(evt.target.error.code);
}

function clickFile(e) {
	var path = e.attributes['data-path'].value;
	var check = e.attributes['data-type'].value;
	if (check !== "file") {
		$('html, body').animate({
	        scrollTop: $("#body").offset().top
	    }, 500);
		beginBrowseForFiles(e);
	}
	if (check == "back") {
		$('html, body').animate({
	        scrollTop: $("#body").offset().top
	    }, 500);
		doDirectoryUp();
	}

	if (check == "file") {
		document.getElementById('body').innerHTML = '';
		var pathFile = getPathFile(e.attributes['data-path'].value);
		strPathMediaFile = pathFile;
		_objectListener.myVar = pathFile;
	}
}

function getPathFile(string) {
	string = string.substr(7);
	return string = string.replace(/%20/g, " ");
}

function directoryReaderSuccess(entries) {
	entries.sort(function(a, b) {
		return (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1)
	});
	var list = '<ul>';
	var skip = null;

	list += '<li><div class="rowTitle" onClick="clickFile(this)" data-action=back" \
data-type="back" \
data-path="back">\...</div></li>';

	for (var i = 0; i < entries.length; i++) {
		skip = entries[i].name.indexOf('.') == 0;
		if (!skip) {
			list += '<li><div class="rowTitle" onClick="clickFile(this)" data-action='
					+ (entries[i].isFile ? 'selectFile' : 'beginBrowseForFiles')
					+ '" \
    	data-type="'
					+ (entries[i].isFile ? 'file' : 'directory')
					+ '" \
    	data-path="'
					+ entries[i].nativeURL
					+ '">'
					+ entries[i].name + '</div></li>';
		}
	}
	document.getElementById('body').innerHTML = list + '</ul>';
}

function beginBrowseForFiles(e) {
	if (!e.attributes['data-path']) {
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
				requestFileSystemSuccess, null);
	} else {
		var path = e.attributes['data-path'].value;
		//console.log(path);
		window.resolveLocalFileSystemURI(path, function(filesystem) {
			requestFileSystemSuccess({
				root : filesystem
			});
		}, function(err) {
			console.log('### ERR: filesystem.beginBrowseForFiles() -'
					+ (JSON.stringify(err)));
		});
	}
}

function requestFileSystemSuccess(fileSystem) {
	_currentFileSystem = fileSystem;
	var directoryReader = fileSystem.root.createReader();
	directoryReader.readEntries(directoryReaderSuccess, fail);
}

function doDirectoryUp() {
	var path = _currentFileSystem.root.nativeURL;
	window.resolveLocalFileSystemURI(path, function(entry) {
		entry.getParent(function(filesystem) {
			requestFileSystemSuccess({
				root : filesystem
			});
		}, function(err) {
			console.log('### ERR: filesystem.directoryUp() getParent -'
					+ (JSON.stringify(err)));
		});
	}, function(err) {
		console.log('### ERR: filesystem.directoryUp() -'
				+ (JSON.stringify(err)));
	});
}
//}
