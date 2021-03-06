var fs = require("fs");
var request = require("request");

var commands = {
	date : function(stdin, f, done) { 
		var today = new Date().toString();
		done(stdin, today);
	},

	pwd : function(stdin, f, done) {
		done(stdin, process.env.PWD); // process.cwd();
	},

	ls : function(stdin, f, done) {
		fs.readdir(".", function(err, files) {
		  if (err) throw err;
		  done(stdin, files.join('\n'));
		});
	},

	find: function(stdin, args, done){
		var self = this;
		var dirFind = args[0];
		var matches = [];
		var contents = "";

		var findFiles = function(dirFind){
			fs.readdir(dirFind, function(err, files) {
				if (err) throw err;
				files.forEach(function(file){
					matches.push(dirFind + "/" + file);
				});
				next();
			});
		};

		var next = function(){
			if(matches.length){
				match = matches.shift();
				contents += match + "\n";
				if (fs.lstatSync(match).isDirectory()) {
					findFiles(match);
				} else {
					next();
				}

			} else {
				done(stdin, contents);
			}

		};


		findFiles(dirFind);
		done(stdin, matches.join("\n"));
	},

	echo: function(stdin, f, done) {
		done(stdin, f.join(" "));
	},

	cat: function(stdin, args, done) {
		this.readFile(stdin, done, args);
	},

	head: function(stdin, args, done) {
		// var option = (Number(args[1])>0) ? args[1] : 5;
		var option = 5;
		this.readFile(stdin, done, args, 0, option);
	},

	tail: function(stdin, args, done) {
		// var option = (Number(args[1])>0) ? -args[1] : -5;
		var option = -5;
		this.readFile(stdin, done, args, option, undefined);
	},

	readFile: function(stdin, done, args, option1, option2){
		if(typeof args==="string"){
			var newFile = args.split("\n").slice(option1, option2).join("\n");
			done(stdin, newFile);
		} else {
			var file = args[0];
			fs.readFile("./"+file, 'utf8', function(err, files) {
			  if (err) throw err;
			  done(stdin, files.split("\n").slice(option1, option2).join("\n"));
			});
		}
	},

	curl: function(stdin, args, done) {
		var url = args[0];
		request(url, function(err, resp, body){
			if (err) throw err;
			if (resp.statusCode == 200) done(stdin, body);
		});
	}

};

module.exports = commands;