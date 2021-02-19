const url = require('url');

require('http').createServer((req, res) => {
  const data = {
    x: 10
  };

  const callback = url.parse(req.url, true).query.callback;

  console.log(callback);

  res.writeHead(200);

  res.end(`${callback}(${JSON.stringify(data)})`);

  // console.log(`${callback}(${JSON.stringify(data)})`, '111xxx')

}).listen(3000, '127.0.0.1');


console.log('启动服务，监听 127.0.0.1:3000')