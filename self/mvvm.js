function Vue(options){
	let data = options.data;
	let elm = options.el;
	observe(data,this); 
	Compile(document.getElementById(elm) ,this);
}

function observe(data,vm){
	Object.keys(data).forEach(function(key,index){
		Object.defineProperty(vm,key,{
			get(){
				return data[key];
			},
			set(newVal){
				// 在这儿用数据让视图变
				data[key] = newVal;
			}
		})
	})
}

function Compile(node,vm){
	/*document.getElementById('aaa').addEventListener('input',function(e){
		// 这儿视图让数据变了，触发set方法
		vm.text = e.target.value;
	})*/
	let child;
	while(child = node.firstChild){
		addWatcher(child)
		node.removeChild(node.firstChild);
	}
}

function addWatcher(node){
	let reg = /\{\{(.*)\}\}/
	//元素节点
	if(node.nodeType==1){
		let attrs = node.attributes;
		for(var i=0; i<attrs.length; i++){
			// attr[i] 属性名
			new Watcher(attr[i])
		}
	}
	if(node.nodeType == 3){
		if(reg.test(node.nodeValue)){
			let name = RegExp.$1;
			new Watcher(name)
		}
	}
}

class Watcher{
	update(){
		
	}
}
