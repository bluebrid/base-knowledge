import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_gank/colors.dart';
import 'package:flutter_gank/gank/CommonComponent.dart';
import 'package:flutter_gank/models/DailyInfo.dart';
import 'package:flutter_gank/models/GankInfo.dart';
import 'package:flutter_gank/net/api_gank.dart';
import 'dart:async';

class DailyPage extends StatefulWidget {
  DailyPage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  State<StatefulWidget> createState() {
    return new DailyPageState();
  }
}

class DailyPageState extends State<DailyPage> {
  bool isLoading;
  DailyInfo _dailyInfo;
  BuildContext contexts;

  @override
  void initState() {
    super.initState();
    _pullNet();
  }

  @override
  Widget build(BuildContext context) {
    contexts = context;
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: Text(widget.title),
      ),
      body: _dailyInfo == null
          ? LoadingWidget()
          : ListView(children: _showAllList()),
    );
  }

  List<Widget> _showAllList() {
    var l = List<Widget>();
    if (_dailyInfo.category.length < 1) {
      return l;
    }
    var top = new Container( // 显示顶部的图片(将福利的数据，显示作为头部展示，美女图片)
      child: new GestureDetector(
        onTap: () {
          showPhoto(contexts, GankInfo.fromJson(_dailyInfo.results["福利"][0]));
        },
        child: Hero(
            tag: GankInfo.fromJson(_dailyInfo.results["福利"][0]).desc,
            child: new CachedNetworkImage(
              fit: BoxFit.cover,
              imageUrl: _dailyInfo.results["福利"] == null ||
                  _dailyInfo.results["福利"].isEmpty
                  ? ""
                  : GankInfo.fromJson(_dailyInfo.results["福利"][0]).url,
              height: 190.0,
            )),
      ),
    );
    l.add(top);
    _dailyInfo.category.remove("福利"); // 将福利从category 删除
    _dailyInfo.category.forEach((f) => {// 显示下面的的列表
        l.addAll(_showList(GankInfo.fromJson(
        _dailyInfo.results[f][_dailyInfo.results[f].length - 1])))// 显示每一个category 的最后一条记录
  });
    return l;
  }

  List<Widget> _showList(GankInfo info) {
    var l = List<Widget>();
    l.add(HomeListWidget(info: info, contexts: contexts));
    if (info.type != _dailyInfo.category[_dailyInfo.category.length - 1])
      l.add(Divider(height: 0.5, color: c9));
    return l;
  }

  void showPhoto(BuildContext context, GankInfo photo) {
    Navigator.push(context,
        MaterialPageRoute<void>(builder: (BuildContext context) {
      return Scaffold(
          appBar: AppBar(
            title: Text(photo.desc),
            centerTitle: true,
          ),
          body: Center(
              child: Hero(
                  tag: photo.desc,
                  child: new CachedNetworkImage(
                    fit: BoxFit.cover,
                    placeholder: (context, url) => new Image(
                      image: AssetImage("images/fuli.png"),
                      fit: BoxFit.cover,
                    ),
                    imageUrl: photo.url,
                  ))));
    }));
  }

  void _pullNet() {
    GankApi.getDailyInfo(widget.title.replaceAll("-", "/"))
        .then((DailyInfo info) {
      isLoading = false;
      // var timer = Timer(Duration(seconds: 3), () => setState(() {
      //   _dailyInfo = info;
      // }));
      setState(() {
        _dailyInfo = info;
      });
    });
  }
}
