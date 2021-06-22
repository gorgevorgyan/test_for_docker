console.log('hello')
var socket = io();
socket.emit('sand');
socket.on('get',(data)=>{
	console.log(data)
})