var fs = require("fs");
var request = require("request");

var commands = {
	date : function(f, done) { 
		var today = new Date();
		done(today.toString());
	},

	pwd : function(f, done) {
		done(process.env.PWD);
	},

	ls : function(f, done) {
		fs.readdir(".", function(err, files) {
		  if (err) throw err;
		  done(files.join('\n'));
		});
	},

	findInFile: function(args, done){
		var self = this;
		var dirFind = args[0];
		done(self.finderFunc(dirFind));

	},

	finderFunc: function(dirFind) {
	var matches = [];
	fs.readdir(dirFind, function(err, files) {
		if (err) throw err;
		files.forEach(function(file){
			// if(file.match(/\./)) {matches.push(dirFind + "/" + file);} 
			if (!fs.lstatSync(dirFind + "/" + file).isDirectory()) {
				matches.push(dirFind + "/" + file);
			} else { commands.finderFunc([dirFind + "/" + file], done);}
		// if file has . in it then done otherwise
		});
		return matches.join("\n"));
	});

	},

	echo: function(f, done) {
		done(f.join(" "));
	},

	cat: function(args, done) {
		this.readFile(done, args);
	},

	head: function(args, done) {
		var option = (Number(args[1])>0) ? args[1] : 5;
		this.readFile(done, args, 0, option);
	},

	tail: function(args, done) {
		var option = (Number(args[1])>0) ? -args[1] : -5;
		this.readFile(done, args, option, undefined);
	},

	readFile: function(done, args, option1, option2){
		var file = args[0];
		fs.readFile("./"+file, 'utf8', function(err, files) {
		  if (err) throw err;
		  done(files.split("\n").slice(option1, option2).join("\n"));
		});
	},

	curl: function(args, done) {
		var url = args[0];
		request(url, function(err, resp, body){
			if (err) throw err;
			if (resp.statusCode == 200) console.log(body);
		});
	}

};

module.exports = commands;