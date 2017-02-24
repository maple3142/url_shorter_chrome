$(document).ready(()=>{
	chrome.tabs.query({'active':true,'lastFocusedWindow':true},tabs=>{
		let url=tabs[0].url;
		googl(url,$('#googl'));
		bitly(url,$('#bitly'));
		tinyurl(url,$('#tinyurl'));
		pptcc(url,$('#pptcc'));
		isgd(url,$('#isgd'));
	});
});
function googl(url,el){
	el.on('click',e=>{
		el.select();
		document.execCommand('copy');
	});
	$.ajax({
		type: 'post',
		url: 'https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyAsjskMwcp0e_9sZY0jvWWLvyH2U_xceIk',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify({ longUrl: url}),
		dataType:'json',
		success: data=>el.val(data.id),
		error: e=>{
			el.val('unexpected error').unbind();
		}
	});
}
function bitly(url,el){
	el.on('click',e=>{
		el.select();
		document.execCommand('copy');
	});
	$.ajax({
		type: 'get',
		url: 'https://api-ssl.bitly.com/v3/shorten?access_token=fef1008c0bca5dd980e43eb8499a7ac68cb933f1&longUrl='+url,
		contentType: 'application/json; charset=utf-8',
		dataType:'json',
		success: data=>el.val(data.data.url),
		error: e=>{
			el.val('unexpected error').unbind();
		}
	});
}
function tinyurl(url,el){
	el.on('click',e=>{
		el.select();
		document.execCommand('copy');
	});
	$.ajax({
		type: 'get',
		url: 'http://tinyurl.com/api-create.php?url='+url,
		contentType: 'application/json; charset=utf-8',
		success: data=>{
			if(data!='ERROR')el.val(data);
			else el.val('unexpected error').unbind();
		},
		error: e=>{
			el.val('unexpected error').unbind();
		}
	});
}
function pptcc(url,el){
	el.on('click',e=>{
		el.select();
		document.execCommand('copy');
	});
	$.ajax({
		type: 'get',
		url: 'http://ppt.cc/pttcoder.php?url='+url,
		contentType: 'application/json; charset=utf-8',
		success: data=>{
			if(data!='1:Error Format' && data!='2:Short Enough')el.val('http://ppt.cc/'+data);
			else el.val('unexpected error').unbind();
		},
		error: e=>{
			el.val('unexpected error').unbind();
		}
	});
}
function isgd(url,el){
	el.on('click',e=>{
		el.select();
		document.execCommand('copy');
	});
	$.ajax({
		type: 'get',
		url: 'https://is.gd/create.php?format=simple&url='+url,
		contentType: 'application/json; charset=utf-8',
		success: data=>el.val(data),
		error: e=>{
			el.val('unexpected error').unbind();
		}
	});
}