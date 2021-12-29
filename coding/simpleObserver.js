const globalData = {};
const globalAtction = {};
const sObserver = {
    each(a, cb) {
        for (let i = 0; i < a.length; i++) {
            if (cb(a[i], i) === false) {
                break;
            }
        }
    },
    eventMap: {},
    dataCacheMap: {},
    _merge2List(list,funcObj){
        if(funcObj.key){
            let added = false;
            for(let i=0;i<list.length;i++){
                let cur = list[i];
                if(cur.key === funcObj.key){
                    list.splice(i,1,funcObj);
                    added = true;
                }
            }
            if(!added){ // 加上这层判断，写起来就很严谨了
                list.push(funcObj);
            }
        }else{
            list.push(funcObj);
        }
    },
  watch (event, func, index) {
        var map = sObserver.eventMap;
        // eslint-disable-next-line no-prototype-builtins
        if (!map.hasOwnProperty(event)) {
            map[event] = [];
        }
        const list = map[event];
        //包装成对象
        let funcObj = func;
        if(typeof func === 'function'){
            funcObj = {key:null,func};
        }else{
            funcObj = func;
        }
        
        
        if(arguments.length<3){
            this._merge2List(list,funcObj);
        }else{
            if(index<list.length){
                if(funcObj.key){
                    for(let i=0;i<list.length;i++){
                        let cur = list[i];
                        if(cur.key === funcObj.key){
                            list.splice(i,1);
                        }
                    }
                }
                if(index<list.length-1){
                    list.splice(index,0,funcObj);
                }else{
                    list.push(funcObj);
                }
            }else{
                this._merge2List(list,funcObj);
            }
        }
    },
    unWatch(event,func){
        var map = sObserver.eventMap;
        const list = map[event];
        if (!(list&&list.length)) {
            return false;
        }
        let position = -1;
        for(let i=0;i<list.length;i++){
            if((typeof list[i].func === 'function'&&(list[i].func.name == func.name))||list[i] == func){
                position = i
            }
        }
        if(position>-1){
            list.splice(position,1);
            return true;
        }
        return false;
    },
    watchWithCache(event, func) {
      sObserver.watch.apply(sObserver,arguments);
      // eslint-disable-next-line no-prototype-builtins
      if (sObserver.dataCacheMap.hasOwnProperty(event)) {
          try {
              func(sObserver.dataCacheMap[event]);
          } catch (e) {
              console && console.log(e);
          }
      }
    },
    fire(event, data) {
        const preList = sObserver.eventMap[event] || [];
        sObserver.eventMap[event] = preList.filter(fnObj=> {return !('$$onlyonce' in fnObj);})
        sObserver.each(sObserver.eventMap[event] || [], (cb) => {
            try {
                if('$$onlyonce' in cb) {
                  delete cb.$$onlyonce;
                }
                // 这里的cb 其实对应 each 函数 里的a[i]
               // 至于第二个参数，好像没有怎么用到
                cb.func(data);
            } catch (e) {
                console && console.log(e);
            }
        });
    },
    fireWithCache(event, data) {
        sObserver.dataCacheMap[event] = data;
        sObserver.fire(event, data);
    },
    once (event, func) {
       // 将$$onlyonce挂载在函数上，成为func的一个属性，然后用 属性 in 对象判断是否存在
       func.$$onlyonce = true;
       sObserver.watch.apply(sObserver, arguments);
       // 上面这一句代表的是1、sObserver 成为 watch函数内部的this了 2、arguments指代的就是 event func
    },
    setGData(key,data){
        globalData[key] = data;
    },
    getGData(key){
        // eslint-disable-next-line no-prototype-builtins
        if(globalData.hasOwnProperty(key)){
            return globalData[key]
        }
        return null;
    },
    setGAction(key,data){
        globalAtction[key] = data;
    },
    getGAction(key){
        return globalAtction[key] || null;
    }
};

if(!window.$$sObserver){
    window.$$sObserver = sObserver;
    window.$$sObserver_fire = function(){
        sObserver.fire.apply(sObserver, arguments);
    };
}
export default sObserver;