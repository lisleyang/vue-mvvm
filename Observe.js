function defineReactive(obj,key,val){
	var deep = new Dep();
	Object.defineProperty(obj,key,{
		get : function(){
			// 添加订阅者watcher到订阅者Dep
			if(Dep.target){
				dep.addSub(Dep.target)
			}
			return val;
		},
		set : function(newVal){
			if(newVal == val) return;
			val = newVal;
			console.log(val);
			//作为发布者发出通知
			dep.notify();
		}
	})
}

function observer(obj,vm){
	Object.keys(obj).forEach(function(key){
		defineReactive(vm,key,obj[key]);
	})
}