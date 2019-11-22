import 'package:flutter/material.dart';
import 'package:flutter_wanandroid/common/component_index.dart' as compoentUtils;

class SplashPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return new SplashPageState();
  }
}

class SplashPageState extends State<SplashPage> {
  compoentUtils.TimerUtil _timerUtil;

  List<String> _guideList = [
    compoentUtils.Utils.getImgPath('guide1'),
    compoentUtils.Utils.getImgPath('guide2'),
    compoentUtils.Utils.getImgPath('guide3'),
    compoentUtils.Utils.getImgPath('guide4'),
  ];

  List<Widget> _bannerList = new List();

  int _status = 0;
  int _count = 3;

  compoentUtils.SplashModel _splashModel;

  @override
  void initState() {
    super.initState();
    _initAsync();
  }

  void _initAsync() async {
    await compoentUtils.SpUtil.getInstance();
    _loadSplashData();
    compoentUtils.Observable.just(1).delay(new Duration(milliseconds: 500)).listen((_) {
//      SpUtil.putBool(Constant.key_guide, false);
      if (compoentUtils.SpUtil.getBool(compoentUtils.Constant.key_guide, defValue: true) &&
          compoentUtils.ObjectUtil.isNotEmpty(_guideList)) {
        compoentUtils.SpUtil.putBool(compoentUtils.Constant.key_guide, false);
        _initBanner();
      } else {
        _initSplash();
      }
    });
  }

  void _loadSplashData() {
    _splashModel = compoentUtils.SpHelper.getObject<compoentUtils.SplashModel>(compoentUtils.Constant.key_splash_model);
    if (_splashModel != null) {
      setState(() {});
    }
    compoentUtils.HttpUtils httpUtil = new compoentUtils.HttpUtils();
    httpUtil.getSplash().then((model) {
      if (!compoentUtils.ObjectUtil.isEmpty(model.imgUrl)) {
        if (_splashModel == null || (_splashModel.imgUrl != model.imgUrl)) {
          compoentUtils.SpHelper.putObject(compoentUtils.Constant.key_splash_model, model);
          setState(() {
            _splashModel = model;
          });
        }
      } else {
        compoentUtils.SpHelper.putObject(compoentUtils.Constant.key_splash_model, null);
      }
    });
  }

  void _initBanner() {
    _initBannerData();
    setState(() {
      _status = 2;
    });
  }

  void _initBannerData() {
    for (int i = 0, length = _guideList.length; i < length; i++) {
      if (i == length - 1) {
        _bannerList.add(new Stack(
          children: <Widget>[
            new Image.asset(
              _guideList[i],
              fit: BoxFit.fill,
              width: double.infinity,
              height: double.infinity,
            ),
            new Align(
              alignment: Alignment.bottomCenter,
              child: new Container(
                margin: EdgeInsets.only(bottom: 160.0),
                child: new InkWell(
                  onTap: () {
                    _goMain();
                  },
                  child: new CircleAvatar(
                    radius: 48.0,
                    backgroundColor: Colors.indigoAccent,
                    child: new Padding(
                      padding: EdgeInsets.all(2.0),
                      child: new Text(
                        '立即体验',
                        textAlign: TextAlign.center,
                        style: TextStyle(color: Colors.white, fontSize: 16.0),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ],
        ));
      } else {
        _bannerList.add(new Image.asset(
          _guideList[i],
          fit: BoxFit.fill,
          width: double.infinity,
          height: double.infinity,
        ));
      }
    }
  }

  void _initSplash() {
    if (_splashModel == null) {
      _goMain();
    } else {
      _doCountDown();
    }
  }

  void _doCountDown() {
    setState(() {
      _status = 1;
    });
    _timerUtil = new compoentUtils.TimerUtil(mTotalTime: 9 * 1000);
    _timerUtil.setOnTimerTickCallback((int tick) {
      double _tick = tick / 1000;
      setState(() {
        _count = _tick.toInt();
      });
      if (_tick == 0) {
        _goMain();
      }
    });
    _timerUtil.startCountDown();
  }

  void _goMain() {
    /**
     * 
     * git://github.com/Sky24n/FlutterRepos.git: https://github.com/Sky24n/FlutterRepos/tree/master/base_library, 在pubspec.yaml 中定义了对应的依赖：
     *   base_library:
          git:
            url: git://github.com/Sky24n/FlutterRepos.git
            path: base_library
     * class RouteUtil {
        static void goMain(BuildContext context) {
          pushReplacementNamed(context, BaseConstant.routeMain);
        }

        static void goLogin(BuildContext context) {
          pushNamed(context, BaseConstant.routeLogin);
        }

        static void pushNamed(BuildContext context, String pageName) {
          Navigator.of(context).pushNamed(pageName);
        }

        static void pushReplacementNamed(BuildContext context, String pageName) {
          Navigator.of(context).pushReplacementNamed(pageName);
        }
      }
     */
    compoentUtils.RouteUtil.goMain(context); // 跳转到主页
  }

  Widget _buildSplashBg() {
    return new Image.asset(
      compoentUtils.Utils.getImgPath('splash_bg'),
      width: double.infinity,
      fit: BoxFit.fill,
      height: double.infinity,
    );
  }

  Widget _buildAdWidget() {
    if (_splashModel == null) {
      return new Container(
        height: 0.0,
      );
    }
    return new Offstage(
      offstage: !(_status == 1),
      child: new InkWell(
        onTap: () {
          if (compoentUtils.ObjectUtil.isEmpty(_splashModel.url)) return;
          _goMain();
          compoentUtils.NavigatorUtil.pushWeb(context,
              title: _splashModel.title, url: _splashModel.url);
        },
        child: new Container(
          alignment: Alignment.center,
          child: new compoentUtils.CachedNetworkImage(
            width: double.infinity,
            height: double.infinity,
            fit: BoxFit.fill,
            imageUrl: _splashModel.imgUrl,
            placeholder: (context, url) => _buildSplashBg(),
            errorWidget: (context, url, error) => _buildSplashBg(),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return new Material(
      child: new Stack(
        children: <Widget>[
          new Offstage(
            offstage: !(_status == 0),
            child: _buildSplashBg(),
          ),
          new Offstage(
            offstage: !(_status == 2),
            child: compoentUtils.ObjectUtil.isEmpty(_bannerList)
                ? new Container()
                : new compoentUtils.Swiper(
                    autoStart: false,
                    circular: false,
                    indicator: compoentUtils.CircleSwiperIndicator(
                      radius: 4.0,
                      padding: EdgeInsets.only(bottom: 30.0),
                      itemColor: Colors.black26,
                    ),
                    children: _bannerList),
          ),
          _buildAdWidget(),
          new Offstage(
            offstage: !(_status == 1),
            child: new Container(
              alignment: Alignment.bottomRight,
              margin: EdgeInsets.all(20.0),
              child: InkWell(
                onTap: () {
                  _goMain();
                },
                child: new Container(
                    padding: EdgeInsets.all(12.0),
                    child: new Text(
                      compoentUtils.IntlUtil.getString(context, compoentUtils.Ids.jump_count,
                          params: ['$_count']),
                      style: new TextStyle(fontSize: 14.0, color: Colors.white),
                    ),
                    decoration: new BoxDecoration(
                        color: Color(0x66000000),
                        borderRadius: BorderRadius.all(Radius.circular(4.0)),
                        border: new Border.all(
                            width: 0.33, color: compoentUtils.Colours.divider))),
              ),
            ),
          )
        ],
      ),
    );
  }

  @override
  void dispose() {
    super.dispose();
    if (_timerUtil != null) _timerUtil.cancel(); //记得中dispose里面把timer cancel。
  }
}
