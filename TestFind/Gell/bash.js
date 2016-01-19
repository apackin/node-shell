var commands = require("./commands.js"); 
// Output a prompt 
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function(data) {
	var arrayArg = data.toString().trim().split(" ");// remove the newline


  	var cmd = arrayArg[0]; 
  	arrayArg = arrayArg.slice(1);


  switch(cmd.toLowerCase()) {
  	case "date": commands.date(arrayArg, done); break;
	case "pwd": commands.pwd(arrayArg, done); break;
	case "ls": commands.ls(arrayArg, done); break;
	case "echo": commands.echo(arrayArg, done); break;
	case "cat": commands.cat(arrayArg, done); break;
	case "head": commands.head(arrayArg, done); break;
	case "tail": commands.tail(arrayArg, done); break;
	case "curl": commands.curl(arrayArg, done); break;
	case "find": commands.findInFile(arrayArg, done); break;
	default: done("This is not a valid command");
	}

	function done(answer) {
		process.stdout.write(answer + "\n" + 'prompt > ');
	}

});
