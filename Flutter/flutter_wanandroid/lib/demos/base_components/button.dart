import 'package:flutter/material.dart';

class ButtonPage extends StatefulWidget {
  final String title;

  ButtonPage(this.title);

  @override
  State<StatefulWidget> createState() {
    return new _ButtonPage();
  }
}

class _ButtonPage extends State<ButtonPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: new AppBar(
        title: new Text(widget.title),
        centerTitle: true,
      ),
      body: new Container(
        alignment: Alignment.topCenter,
        padding: EdgeInsets.all(16.0),
        child: new Column(
          children: <Widget>[
            FlatButton(
              //按下事件响应
              color: Colors.blue,
              highlightColor: Colors.blue[700],
              colorBrightness: Brightness.dark,
              splashColor: Colors.grey,
              onPressed: () {
                //按下事件处理
                print('点击事件');
              },
              //添加按钮文本
              child: Text('RaisedButton组件'),
            ),
            IconButton(
                icon: Icon(Icons.thumb_up),
                onPressed: () {},
              ),
            RaisedButton.icon(
              icon: Icon(Icons.send),
              label: Text("发送"),
              onPressed: () {},
            ),
            OutlineButton.icon(
              icon: Icon(Icons.add),
              label: Text("添加"),
              onPressed: () {},
            ),
            FlatButton.icon(
              icon: Icon(Icons.info),
              label: Text("详情"),
              onPressed: () {},
            ),
          ],
        ),
      ),
   
    );
  }
}
