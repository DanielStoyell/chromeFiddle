chrome.browserAction.onClicked.addListener(function(tab) {
	console.log('Changing css');
	chrome.tabs.executeScript({
		string: 'newStyle.css'
	});
});