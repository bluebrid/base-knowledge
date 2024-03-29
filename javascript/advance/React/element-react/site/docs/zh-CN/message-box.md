## Message box 信息提示
模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、成功提示、错误提示、询问信息。

### 消息提示

当用户进行操作时会被触发，该对话框中断用户操作，直到用户确认知晓后才可关闭。

:::demo 调用`alert`方法即可打开消息提示，它模拟了系统的 `alert`，无法通过按下 ESC 或点击框外关闭。此例中接收了两个参数，`message`和`title`。值得一提的是，窗口被关闭后，它默认会返回一个`Promise`对象便于进行后续操作的处理。

```js
render() {
  return <Button type="text" onClick={this.onClick.bind(this)}>点击打开 Message Box</Button>
}

onClick() {
  MessageBox.alert('这是一段内容', '标题名称').then(() => {
    console.log('onResolve')
  }, () => {
    console.log('onReject')
  });
}
```
:::

### 确认消息

提示用户确认其已经触发的动作，并询问是否进行此操作时会用到此对话框。

:::demo 调用`confirm`方法即可打开消息提示，它模拟了系统的 `confirm`。Message Box 组件也拥有极高的定制性，我们可以传入`options`作为第三个参数，它是一个字面量对象。`type`字段表明消息类型，可以为`success`，`error`，`info`和`warning`，无效的设置将会被忽略。注意，第二个参数`title`必须定义为`String`类型，如果是`Object`，会被理解为`options`。在这里我们用了 Promise 来处理后续响应。

```js
render() {
  return <Button type="text" onClick={this.onClick.bind(this)}>点击打开 Message Box</Button>
}

onClick() {
  MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    type: 'warning'
  }).then(() => {
    Message({
      type: 'success',
      message: '删除成功!'
    });
  }).catch(() => {
    Message({
      type: 'info',
      message: '已取消删除'
    });
  });
}
```
:::

### 提交内容

当用户进行操作时会被触发，中断用户操作，提示用户进行输入的对话框。

:::demo 调用`prompt`方法即可打开消息提示，它模拟了系统的 `prompt`。可以用`inputPattern`字段自己规定匹配模式，或者用`inputValidator`规定校验函数，可以返回`Boolean`或`String`，`Boolean`为`false`或字符串时均表示校验未通过，`String`相当于定义了`inputErrorMessage`字段。此外，可以用`inputPlaceholder`字段来定义输入框的占位符。

```js
render() {
  return <Button type="text" onClick={this.onClick.bind(this)}>点击打开 Message Box</Button>
}

onClick() {
  MessageBox.prompt('请输入邮箱', '提示', {
    inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
    inputErrorMessage: '邮箱格式不正确'
  }).then(({ value }) => {
    Message({
      type: 'success',
      message: '你的邮箱是: ' + value
    });
  }).catch(() => {
    Message({
      type: 'info',
      message: '取消输入'
    });
  });
}
```
:::

### 自定义

可自定义配置不同内容。

:::demo 以上三个方法都是对`msgbox`方法的再包装。本例直接调用`msgbox`方法，使用了`showCancelButton`字段，用于显示取消按钮。另外可使用`cancelButtonClass`为其添加自定义样式，使用`cancelButtonText`来自定义按钮文本。Confirm 按钮也具有相同的字段，在文末的字段说明中有完整的字段列表。

```js
render() {
  return <Button type="text" onClick={this.onClick.bind(this)}>点击打开 Message Box</Button>
}

onClick() {
  MessageBox.msgbox({
    title: '消息',
    message: '这是一段内容, 这是一段内容, 这是一段内容, 这是一段内容, 这是一段内容, 这是一段内容, 这是一段内容',
    showCancelButton: true
  }).then(action => {
    Message({
      type: 'info',
      message: 'action: ' + action
    });
  })
}
```
:::

### 单独引用

单独引入 `MessageBox`:

```js
import { MessageBox } from 'element-react';
```

对应于上述四个全局方法的调用方法依次为：MessageBox, MessageBox.alert, MessageBox.confirm 和 MessageBox.prompt。

### Options

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title | MessageBox 标题 | string | — | — |
| customClass | 对话框外层容器的类名 | string | — | - |
| message | MessageBox 消息正文内容 | string/ReactElement | — | — |
| type | 消息类型，用于显示图标 | string | success/info/<br>warning/error | — |
| lockScroll | 是否在 MessageBox 出现时将 body 滚动锁定 | boolean | — | true |
| showClose | 是否显示关闭按钮 | boolean | — | true |
| showCancelButton | 是否显示取消按钮 | boolean | — | false（以 confirm 和 prompt 方式调用时为 true） |
| showConfirmButton | 是否显示确定按钮 | boolean | — | true |
| cancelButtonText | 取消按钮的文本内容 | string | — | 取消 |
| confirmButtonText | 确定按钮的文本内容 | string | — | 确定 |
| cancelButtonClass | 取消按钮的自定义类名 | string | — | — |
| confirmButtonClass | 确定按钮的自定义类名 | string | — | — |
| showInput | 是否显示输入框 | boolean | — | false（以 prompt 方式调用时为 true）|
| inputPlaceholder | 输入框的占位符 | string | — | — |
| inputType | 输入框的类型 | string | — | text |
| inputValue | 输入框的初始文本 | string | — | — |
| inputPattern | 输入框的校验表达式 | regexp | — | — |
| inputValidator | 输入框的校验函数。可以返回布尔值或字符串，若返回一个字符串, 则返回结果会被赋值给 inputErrorMessage | function | — | — |
| inputErrorMessage | 校验未通过时的提示文本 | string | — | 输入的数据不合法! |
