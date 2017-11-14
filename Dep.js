function Dep(){
	this.subs = [];
}

Dep.prototype = {
	addSub : function(sub){
		//sub : Dep.target
		// Dep.target == new Watcher（Watcher.js里面）；但只有在Compiler中new Watcher了以后才有值
		// 即this.subs中是一个一个的watcher
		this.subs.push(sub);
	},
	notify : function(){
		this.subs.forEach(function(sub){
			sub.update();
		})
	}
}