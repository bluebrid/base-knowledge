import 'package:flutter/material.dart';
import 'package:flutter_gank/config/theme.dart';
import 'package:flutter_gank/store/index.dart';
import 'package:flutter_gank/store/model/config_state_model.dart';
import 'package:flutter_gank/wanandroid/WanPage.dart';
import 'HomePage.dart';
import 'SortPage.dart';
import 'MyPage.dart';
import 'FuliPage.dart';

class MainPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return new MainPageState();
  }
}

class MainPageState extends State<MainPage> {
  int _tabIndex = 0;
  var tabImages;
  var appBarTitles = ['最新', '分类', '妹纸', '玩安卓', '我的'];

  /*
   * 根据索引获得对应的normal或是press的icon
   */
  Icon getTabIcon(int curIndex) {
    return tabImages[curIndex];
  }

  /*
   * 获取bottomTab的颜色和文字
   */
  Text getTabTitle(int curIndex) {
    if (curIndex == _tabIndex) {
      return new Text(appBarTitles[curIndex],
          style: new TextStyle(color: Color(AppTheme.mainColor)));
    } else {
      print(appBarTitles[curIndex]);
      return new Text(appBarTitles[curIndex],
          style: new TextStyle(color: const Color(0xdd888888)));
    }
  }

  void initData() {
    /*
      bottom的按压图片
     */
    tabImages = [
      Icon(Icons.public),
      Icon(Icons.widgets),
      Icon(Icons.spa),
      Icon(Icons.android),
      Icon(Icons.person),
    ];
  }

  @override
  void initState() {
    //实例化多语言
    super.initState();
    Future.delayed(Duration.zero, () async {
      Store.value<ConfigModel>().getTheme();
    });

    initData();
  }

  @override
  Widget build(BuildContext context) {
    Store.of(context);
    return Consumer<ConfigModel>(
      builder: (context, configModel, child) {
        return MaterialApp(
          theme: AppTheme.getThemeData(configModel.theme),
          home: Scaffold(
            body: IndexedStack(
              children: <Widget>[
                HomePage(),
                SortPage(),
                FuliPage(),
                WanPage(),
                MyPage(),
              ],
              index: _tabIndex,
            ),
            bottomNavigationBar: new BottomNavigationBar(
              items: <BottomNavigationBarItem>[
                new BottomNavigationBarItem(
                    icon: getTabIcon(0), title: getTabTitle(0)),
                new BottomNavigationBarItem(
                    icon: getTabIcon(1), title: getTabTitle(1)),
                new BottomNavigationBarItem(
                    icon: getTabIcon(2), title: getTabTitle(2)),
                new BottomNavigationBarItem(
                    icon: getTabIcon(3), title: getTabTitle(3)),
                new BottomNavigationBarItem(
                    icon: getTabIcon(4), title: getTabTitle(4)),
              ],
              //设置显示的模式
              type: BottomNavigationBarType.fixed,
              //设置当前的索引
              currentIndex: _tabIndex,
              //tabBottom的点击监听
              onTap: (index) {
                setState(() {// 通过setState来控制状态， 然后重新渲染
                  _tabIndex = index;
                });
              },
            ),
          ),
        );
      },
    );

  }
}
