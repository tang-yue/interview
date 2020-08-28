
### 页面渲染的过程中，执行了哪些事件

1、页面加载开始，首先肯定是先发出加载资源的请求，加载未完成之前，不触发任何事件。

2、document加载结束并解析，此时css等其他资源未加载完成

此时 readyState 为 'interactive'，表明document已经load并解析完成，触发readystatechange，然后触发DOMContentLoaded，捎带提一句，此时
加载完成且带有defer标记的脚本，会按顺序开始执行

3、css、img 等子资源加载完成之后

此时触发window.load 事件

4、点击关闭标签或者刷新时，会依次触发beforeunload、unload 事件


起源于被问的时候，一脸茫然。

