var sw = new Worker('sw.js');

sw.postMessage('request');

sw.addEventListener('message', function(e){
	console.log(e.data)
	var fn = document.getElementById('firstname');
	fn.innerHTML=e.data.name;
});