function Vue(options){
	let data = options.data;

	//只是设置好了get和set；什么都没有触发
	observe(data,this);
	//只是给每个节点绑定了watcher（每个watcher有自己的vm/属性名/节点）；什么都没有触发
	new Compiler(document.getElementById(options.el),this);
}

function observe(data,vm){
	let keys = Object.keys(data);
	let dep = new Dep();
	keys.forEach(function(key,index){
		let value = data[key];
		Object.defineProperty(vm,key,{
			get(){
				if(Dep.target){
					dep.addSub(Dep.target);
				}
				return data[key];
			},
			set(newVal){
				data[key] = newVal;
				// 数据有变化的时候，所有双向绑定的节点都要更新
				dep.update();
			}
		})
	})
}

class Compiler{
	constructor(node,vm){
		this.reg = /\{\{(.*)\}\}/;

		for(let childNode of node.childNodes){
			this.addWatcher(childNode,vm)
		}
	}


	addWatcher(childNode,vm){
		if(childNode.nodeType == 1)	//元素节点
		{
			let attrs = childNode.attributes;
			for(var attr of attrs){
				if(attr.nodeName == 'v-model'){
					let name = attr.nodeValue;
					// View层到Model层
					childNode.addEventListener('input',function(el){
						vm[name] = el.target.value;
					})
					// name: 双向绑定中的key值
					new Watcher(vm,name,childNode,'value')
				}
			}
		}

		if(childNode.nodeType == 3)
		{
			if(this.reg.test(childNode.nodeValue)){
				let name = RegExp.$1;
				new Watcher(vm,name,childNode,'nodeValue')
			}
		}
	}
}

class Dep{
	constructor(){
		this.subs = [];
	}

	addSub(sub){
		this.subs.push(sub);
	}

	update(){
		this.subs.forEach(function(sub,index){
			//每个sub就是一个watcher，上面有他自己的vm,name,节点
			sub.update();
		})
	}
}

// 给每个节点（不是属性）设置watcher，让他们在vm上的数据变化时改变该节点的值。即从Model层到View层。
class Watcher{
	constructor(vm,name,node,type){
		Dep.target = this;
		this.vm = vm;
		this.name = name;
		this.node = node;
		this.type = type;
		this.update();
		Dep.target = null;	// ! important 否则会卡死
	}
	update(){
		this.value = this.vm[this.name];
		//这一句只改视图
		this.node[this.type] = this.value;

	}
}
