var sw = new Worker('sw.js');

var btn = document.getElementById('btn-get-name');

btn.onclick = function(){
	sw.postMessage('request');
};

sw.addEventListener('message', function(e){
	console.log(e.data)
	var response = e.data;
	var obj = JSON.parse(response);
	console.log(obj.firstname);
	var fn = document.getElementById('firstname');
	fn.innerHTML=obj.firstname;
});