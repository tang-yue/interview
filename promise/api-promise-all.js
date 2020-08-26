const { resolve, reject } = require("./api-promise")

Promise.all = promises => {
  return new Promise((resolve, reject) => {
    let dataArr = new Array(promises.length)
    let count = 0

    for(let i = 0; i < promises.length; i++) {
      promises[i].then((res) => { addData(res, i) })
              .catch(err => { reject({ message: err, index: i }) })
    }
    
    function addData(data, index) {
      dataArr[index] = data
      count++
      // 如果数据收集完了，就把收集的数据 resolve 出去
      if(count === promises.length) resolve(dataArr)
    }
  })
}