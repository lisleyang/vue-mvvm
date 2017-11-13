function Vue(options){
	let data = options.data;
	observe(data,this); 
	Compile(this);
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

function Compile(vm){
	document.getElementById('aaa').addEventListener('input',function(e){
		// 这儿视图让数据变了
		vm.text = e.target.value;
	})
}
