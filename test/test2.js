function observe(target) {
    if(typeof target !== 'object' || target === null) {
      return target;
    }
    const observed = new Proxy(target, {
      get(target, key, receiver) {
        return observe(Reflect.get(target, key, receiver))
      },
  
      set(target, key, value, receiver) {
        if(value === target[key]) {
          return true;
        }
        console.log('检测到'+ 'key值：' + key +  '的变化了吗？')
        const ownKeys = Reflect.ownKeys(target);
        if(ownKeys.includes(key)) {
          console.log('旧属性');
        } else {
          console.log('新添加的属性');
        }
        return Reflect.set(target, key, value, receiver);
      },
      deleteProperty(target, key) {
        return Reflect.deleteProperty(target, key);
      }
    })
    return observed;
  }
  
  const data = {
    name: '你不知道的前端',
    age: 25,
    info: {
      city: 'beijing'
    },
    numbers: [1,2,3,4]
  }
  
  const proxyData = observe(data);

  proxyData.age = 26;

  proxyData.numbers[2] = '2'; 

  console.log(proxyData)