var JShell=function(){this._commands={};this.stdin=new JShell.Stream();this.stdout=new JShell.Stream();this.stderr=new JShell.Stream()};JShell.prototype={execute:function(str){var args=str.split(/\s+/);var name=args[0];var command=JShell.Command.get(name);if(command){return command(args,this.stdin,this.stdout,this.stderr)}else{return this.noCommandFound(str)}},noCommandFound:function(str){this.stdout.write("Command not found: "+str)}};JShell.Command=function(name,callback){var command=function(args,stdin,stdout,stderr){var self={name:name,args:args,stdin:stdin,stdout:stdout,stderr:stderr};return callback.call(self)};JShell.Command.List.add(name,command);return command};JShell.Command.get=function(name){return JShell.Command.List.get(name)};JShell.Command.List={_list:{},add:function(name,callback){this._list[name]=callback},get:function(name){var callback=this._list[name];return callback?callback:null},all:function(){var cmdlist=[];for(var key in this._list){cmdlist.push(key)}return cmdlist.sort()},clear:function(){this._list={}}};JShell.Stream=function(){this._messages=[]};JShell.Stream.prototype={read:function(){var latest=this._messages.shift();if(typeof(latest)!=='undefined'){return latest}else{return null}},write:function(message){this._messages.push(message);return true},readAll:function(){var lines=[];var line;while(line=this.read()){lines.push(line)}return lines}};JShell.Command.Echo=new JShell.Command("echo",function(){if(this.args.length>1){if(this.args[1]==='-h'||this.args[1]==='--help'){this.stdout.write(JShell.Command.Echo.help())}else{this.stdout.write(this.args.slice(1).join(' '))}}else{return}});JShell.Command.Echo.help=function(){return"echo: display a line of text"};JShell.Command.Cmdlist=new JShell.Command('cmdlist',function(){var list=JShell.Command.List.all();for(var i=0;i<list.length;i++){this.stdout.write(list[i])}});
