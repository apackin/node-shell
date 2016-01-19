var commands = require("./commands.js"); 
// Output a prompt 
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function(data) {
	var cmdString = data.toString().trim();
	var cmdList = cmdString.split(/\s*\|\s*/g);

	var arrayArg = cmdList[0].split(" ");
  	var cmd = arrayArg[0]; 
  	var file = arrayArg.slice(1);
  	var stdin = cmdList.slice(1);

  	console.log(cmdList);
  	//cmdList => [ 'cat bash.js', 'head' ]
  	
  	// the first time i need to do normal, then use an answer.

  	if(commands[cmd]) commands[cmd.toLowerCase()](stdin, file, done);
  	else done(stdin, "This is not a valid command: " + cmd);

	// switch(cmd.toLowerCase()) {
	//   	case "date": commands.date(stdin, file, done); break;
	// 	case "pwd": commands.pwd(stdin, file, done); break;
	// 	case "ls": commands.ls(stdin, file, done); break;
	// 	case "echo": commands.echo(stdin, file, done); break;
	// 	case "cat": commands.cat(stdin, file, done); break;
	// 	case "head": commands.head(stdin, file, done); break;
	// 	case "tail": commands.tail(stdin, file, done); break;
	// 	case "curl": commands.curl(stdin, file, done); break;
	// 	case "find": commands.findInFile(stdin, file, done); break;
	// 	default: done("This is not a valid command");
	// }

	function done(stdin, answer) {
		if (stdin.length > 0) commands[stdin.shift()](stdin, answer, done);
		else process.stdout.write(answer + '\nprompt > ');
	}
});
