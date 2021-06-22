const express =require('express')
const sqlite3=require('sqlite3')
const app= express()
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port =3000


var db = new sqlite3.Database('./db/test.db');

// db.serialize(function() {
//   db.run("CREATE TABLE lorem (info TEXT)");

//   var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//   for (var i = 0; i < 10; i++) {
//       stmt.run("Ipsum " + i);
//   }
//   stmt.finalize();

// });

// db.close();

app.use(express.static(__dirname + '/public'));
app.get('/',(req,res)=>{
	res.sendFile(__dirname + '/templates/index.html');
})


io.on('connection', (socket) => {
socket.on('sand',()=>{

  db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
      socket.emit('get',row.id)
  });
})
}); 
server.listen(port,()=>{
	console.log("Started")
})