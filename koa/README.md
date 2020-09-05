### 简述koa剥洋葱原理

剥洋葱原理，每个中间件接受两个参数：ctx 和 next，其中next是个函数，执行next()将线程交给后续中间件并得到一个Promise，Promise.then 表示后续中间件执行完毕。


### 实现一个简版核心koa

koa 核心功能最简化示例

```js
const Koa = require('koa')

const app = new Koa()

app.use(async (ctx, next) => {
  console.log('Middleware 1 Start')
  await next()
  console.log('Middleware 1 End')
})

app.use(async (ctx, next) => {
  console.log('Middleware 2 Start')
  await next()
  console.log('Middleware 2 End')

  ctx.body = 'hello, world'
})

app.listen(3000)
```
简化的示例中，可以看到有三个清晰的模块，分别入下：

Application： 基本服务器框架
Context：服务器框架基本数据结构的封装，用以http请求解析及响应
Middleware：中间件，也是洋葱模型的核心机制

#### 抛开框架，来写一个简单的server

```js
const http = require('http')

const server = http.createServer((req, res) => {
  res.end('hello, world')
})

server.listen(3000)
```

最简版koa 命名为 koa-mini

```js
const Koa = require('koa-mini')

const app = new Koa()

app.use(async (ctx, next) => {
  console.log('Middleware 1 Start')
  await next()
  console.log('Middleware 1 End')
})

app.use(async (ctx, next) => {
  console.log('Middleware 2 Start')
  await next()
  console.log('Middleware 2 End')

  ctx.body = 'hello, world'
})

app.listen(3000)
```

#### 构建 Application

```js
const http = require('http')

class Application {
  constructor() {
    this.middleware = null
  }

  listen (...args) {
    const server = http.createServer(this.middleware)
    server.listen(...args)
  }

  // 这里依旧调用的是原生 http.createServer 的回调函数
  use (middleware) {
    this.middleware = middleware
  }
}


// 此时调用 Application 启动服务的代码如下：

const app = new Application()

app.use((req, res) => {
  res.end('hello, world')
})

app.listen(3000)
```

#### 构建 Context

在koa 中，app.use 的回调参数为一个ctx对象，而非原生的 req/res。因此在这一步要构建一个 Context 对象，并使用 ctx.body 构建响应：

** 在 http.createServer 回调函数中进一步封装Context 实现 **

核心代码如下，注意注释部分

```js
const http = require('http')

class Application {
  constructor() {
   this.middleware = null
  }

  use (middleware) {
   this.middleware = middleware
  }

 listen (...args) {
  const server = http.createServer((req, res) => {
    // 构造 Context 对象
    const ctx = new Context(req, res)

    this.middleware(ctx)

    // ctx.body 为响应内容

    ctx.res.end(ctx.body)
  })
  server.listen(...args)
 }

 // 构造一个 Context 的类
 class Context {
  constructor (req, res) {
    this.req = req
    this.res = res
  }
 }
}
```

此时 koa 被改造如下，app.use 可以正常工作

```js
const app = new Application()

app.use(ctx => {
  ctx.body = 'hello, world'
})

app.listen(7000)
```

#### 洋葱模型及中间件改造

在现实中 中间件会有很多个，如错误处理，权限校验，路由，日志，限流等待。因此我们要改造下 app.middlewares

app.middlewares: 收集中间件回调函数数组，并使用 compose 串联起来

对所有中间件函数通过 compose 函数来达到抽象效果，它对Context 对象作为参数，来接收请求及处理响应：

```js
// this.middlewares 代表所有中间件
// 通过 compose 抽象

const fn = compose(this.middlewares)

await fn(ctx)

// 当然，也可以写成这种形式，只要带上 ctx 参数

await compose(this.middlewares, ctx)
```

此时完整代码如下：

```js
const http = require('http')

class Application {
  constructor() {
    this.middlewares = []
  }

  listen (...args) {
    const server = http.createServer(async (req, res) => {
      const ctx = new Context(req, res)

      // 对中间件回调函数串联，形成洋葱模型
      const fn = compose(this.middlewares)
      await fn(ctx)

      ctx.res.end(ctx.body)
    })

    server.listen(...args)
  }

  use (middleware) {
    // 中间回调函数变为了数组
    this.middlewares.push(middleware)
  }
}
```

接下来，着重完成 compose 函数

- middleware: 第一个中间件将会执行
- next: 每个中间件将会通过next来执行下一个中间件

把next 函数提取出来，而next 函数 中又有next

使用一个递归完成中间件的改造，并把中间件给连接起来，如下所示

```js
const dispatch = (i) => {
  return middlewares[i](ctx, () => dispatch(i+1))
}

dispatch(0)
```

`dispatch(i)` 代表执行第i个中间件，而next() 函数将会执行下一个中间件
`dispatch(i+1)` 于是我们使用递归轻松地完成了洋葱模型

把递归的终止条件补充上：当最后一个中间件函数执行 next() 时，直接返回

```js
const dispatch = (i) => {
  const middleware = middlewares[i]
  if(i === middlewares.length) {
    return
  }
  return middleware(ctx, () => dispatch(i+1))
}

return dispatch(0)
```

最终的compose 函数 代码如下：

```js
function compose (middlewares) {
  return ctx => {
   const dispatch = (i) => {
      const middleware = middlewares[i]
      if(i === middlewares.length) {
        return
      }
      return middleware(ctx, () => dispatch(i+1))
   }
   return dispatch(0)
  }
}
```


#### 异常处理

在你的后端服务中因为某一处报错，而把整个服务给挂掉了怎么办?

```js
try {
  cosnt fn = compose(this.middlewares)
  await fn(ctx)
} catch (e) {
  console.error(e)
  ctx.res.statusCode = 500
  ctx.res.write('Internel Server Error')
}
```

然而在日常项目中使用时，我们必须在框架层的异常捕捉之前就需要捕捉到它，来做一些异常结构化及异常上报的任务，此时会使用一个异常处理的中间件：

```js

app.use(async (ctx, next) => {
  try {
    await next()
  }
  catch (err) {
    // 1、异常结构化
    // 2、异常分类
    // 3、异常级别
    // 4、异常上报
  }
})
```

在./koa-demo/main.js 文件中

[参考实现过程](https://juejin.im/post/6844904096516816904)

[koa-mini 完整版](https://github.com/shfshanyue/koa-mini)

