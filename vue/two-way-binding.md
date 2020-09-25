### 极简版双向绑定

```html
<body>
    <div>
        <input id="input" />
        <span id="show"></span>
    </div>
    <script>
        const data = {};
        const input = document.getElementById('input');
        Object.defineProperty(data, 'text', {
            configurable: true,
            get: function() {
                return document.getElementById('input').value
            },
            set: function(newValue) {
                document.getElementById('input').value = newValue;
                document.getElementById('show').innerHTML = newValue;
            }
        });
        input.onchange = function(e) {
            data.text = e.target.value;
        }
    </script>
</body>
```

通过在控制台修改data.text的值，可以展示视图，通过在input标签里输入值，在控制台，打印data.text，也可以打印出刚刚输入的值

[参考地址](https://juejin.im/post/6844903569108271117)
