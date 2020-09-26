function Router() {
    this.routes = []
    // 添加路由

    this.add = function (re, handler) {
        this.routes.push({re, handler})
    }

    // 监听url 变化

    this.listen = function () {
        // 路由切换
        window.addEventListener('popstate', (event) => {
            var pathname = window.location.pathname
            for(var i = 0; i < this.routes.length; i++) {
                if(pathname === this.routes[i].re) {
                    this.routes[i].handler.apply({})
                }
            }
        })
    }
    // 前进到一个新的url

    this.push = function (path) {
        window.history.pushState({}, '', path)
    }

    // 替换成一个新的url
    this.replace = function (path) {
        window.history.replaceState({}, '', path)
    }

    // 返回到上一个url
    this.back = function () {
        window.history.back()
    }
}