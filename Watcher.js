//vm : vm , node : 当前节点 name :属性名 type : value/nodevalue
// 一个Watcher只是对应着一个属性
// Watcher是整个mvvm的核心
function Watcher(vm,node,name,type){
	Dep.target = this;
	this.name = name;
	this.node = node;
	this.vm = vm;
	this.type = type;
	this.update();
	Dep.target = null;
}

Watcher.prototype = {
	update : function(){
		this.get();
		// important
		this.node[this.type] = this.value;
	},
	// 触发Object.defineProperty里面的get
	get : function(){
		this.value = this.vm[this.name];
	}
}