/**
 * Created by huangjunsheng on 2019-09-29
 */
import React, {PureComponent, Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Color from '../utils/Color';
import NavBar from '../component/NavBar';
import globalStyles from '../styles/globalStyles';
import {
  DEVICE_WIDTH,
  getBottomSpace,
  getRealDP as dp,
} from '../utils/screenUtil';
import images from '../images';
import {connect} from 'react-redux';
import {i18n} from '../utils/Utility';

class WatchFace extends Component{
//   static propTypes = {
//     sectionTime: React.PropTypes.string.isRequired,
//     totalTime: React.PropTypes.string.isRequired,
//   }; 

  render() {
    return(
      <View style={styles.watchFaceContainer}>
        <Text style={styles.sectionTime}>{this.props.sectionTime}</Text>
        <Text style={styles.totalTime}>{this.props.totalTime}</Text>
      </View>
    )
  }
}

class WatchControl extends Component{
//   static propTypes = {
//     stopWatch: React.PropTypes.func.isRequired,
//     clearRecord: React.PropTypes.func.isRequired,
//     startWatch: React.PropTypes.func.isRequired,
//     addRecord: React.PropTypes.func.isRequired,
//   }; 

  constructor(props){
    super(props);
    this.state = {
      watchOn: false, 
      startBtnText: "启动",
      startBtnColor: "#60B644",
      stopBtnText: "计次",
      underlayColor:"#fff",
    };
  }

  _startWatch() {
    if (!this.state.watchOn) {
      this.props.startWatch()
      this.setState({
        startBtnText: "停止",
        startBtnColor: "#ff0044",
        stopBtnText: "计次",
        underlayColor:"#eee",
        watchOn: true
      })
    }else{
      this.props.stopWatch()
      this.setState({
        startBtnText: "启动",
        startBtnColor: "#60B644",
        stopBtnText: "复位",
        underlayColor:"#eee",
        watchOn: false
      })
    } 
  }

  _addRecord() {
    if (this.state.watchOn) {
      this.props.addRecord()
    }else{
      this.props.clearRecord()
      this.setState({
        stopBtnText: "计次"
      })
    }
  }

  render() {
    return(
      <View style={styles.watchControlContainer}>
        <View style={{flex:1,alignItems:"flex-start"}}>
          <TouchableHighlight style={styles.btnStop} underlayColor={this.state.underlayColor} onPress={()=>this._addRecord()}>
            <Text style={styles.btnStopText}>{this.state.stopBtnText}</Text>
          </TouchableHighlight>
          </View>
          <View style={{flex:1,alignItems:"flex-end"}}>
            <TouchableHighlight style={styles.btnStart} underlayColor="#eee" onPress={()=> this._startWatch()}>
              <Text style={[styles.btnStartText,{color:this.state.startBtnColor}]}>{this.state.startBtnText}</Text>
            </TouchableHighlight>
          </View>
      </View>
    )
  }
}

class WatchRecord extends Component{
//   static propTypes = {
//         record: React.PropTypes.array.isRequired,
//     }; 

  render() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    theDataSource = ds.cloneWithRows(this.props.record);
    return (
      <ListView
        style={styles.recordList}
        dataSource={theDataSource}
        renderRow={(rowData) => 
          <View style={styles.recordItem}>
            <Text style={styles.recordItemTitle}>{rowData.title}</Text>
            <View style={{alignItems: "center"}}>
              <Text style={styles.recordItemTime}>{rowData.time}</Text>
            </View>
          </View>}/>
    );
  }
}

/**
 * 关于作者
 */
class Day1 extends PureComponent {
 constructor() {
    super();
      this.state = {
        stopWatch: false,
        resetWatch: true,
        intialTime: 0,
        currentTime:0,
        recordTime:0,
        timeAccumulation:0,
        totalTime: "00:00.00",
        sectionTime: "00:00.00",
        recordCounter: 0,
        record:[
          {title:"",time:""},
          {title:"",time:""},
          {title:"",time:""},
          {title:"",time:""},
          {title:"",time:""},
          {title:"",time:""},
          {title:"",time:""}
        ],
    };
  }

    componentWillUnmount() {
    this._stopWatch();
    this._clearRecord();
  }

  componentDidMount() {
    if(Platform.OS === "ios"){
      StatusBar.setBarStyle(0);
    }
  }

  _startWatch() {
    if (this.state.resetWatch) {
      this.setState({
        stopWatch: false,
        resetWatch: false,
        timeAccumulation:0,
        initialTime: (new Date()).getTime()
      })
    }else{
      this.setState({
        stopWatch: false,
        initialTime: (new Date()).getTime()
      })
    }
    let milSecond, second, minute, countingTime, secmilSecond, secsecond, secminute, seccountingTime;
    let interval = setInterval(
        () => { 
          this.setState({
            currentTime: (new Date()).getTime()
          })
          countingTime = this.state.timeAccumulation + this.state.currentTime - this.state.initialTime;
          minute = Math.floor(countingTime/(60*1000));
          second = Math.floor((countingTime-6000*minute)/1000);
          milSecond = Math.floor((countingTime%1000)/10);
          seccountingTime = countingTime - this.state.recordTime;
          secminute = Math.floor(seccountingTime/(60*1000));
          secsecond = Math.floor((seccountingTime-6000*secminute)/1000);
          secmilSecond = Math.floor((seccountingTime%1000)/10);
          this.setState({
            totalTime: (minute<10? "0"+minute:minute)+":"+(second<10? "0"+second:second)+"."+(milSecond<10? "0"+milSecond:milSecond),
            sectionTime: (secminute<10? "0"+secminute:secminute)+":"+(secsecond<10? "0"+secsecond:secsecond)+"."+(secmilSecond<10? "0"+secmilSecond:secmilSecond),
          })
          if (this.state.stopWatch) {
            this.setState({
              timeAccumulation: countingTime 
            })
            clearInterval(interval)
          };
        },10);
  }

  _stopWatch() {
    this.setState({
      stopWatch: true
    })
  }

  _addRecord() {
    let {recordCounter, record} = this.state;
    recordCounter++;
    if (recordCounter<8) {
      record.pop();
    }
    record.unshift({title:"计次"+recordCounter,time:this.state.sectionTime});
    this.setState({
      recordTime: this.state.timeAccumulation + this.state.currentTime - this.state.initialTime,
      recordCounter: recordCounter,
      record: record
    })
    //use refs to call functions within other sub component
    //can force to update the states
    // this.refs.record._updateData();
  }

  _clearRecord() {
    this.setState({
      stopWatch: false,
      resetWatch: true,
      intialTime: 0,
      currentTime:0,
      recordTime:0,
      timeAccumulation:0,
      totalTime: "00:00.00",
      sectionTime: "00:00.00",
      recordCounter: 0,
      record:[
        {title:"",time:""},
        {title:"",time:""},
        {title:"",time:""},
        {title:"",time:""},
        {title:"",time:""},
        {title:"",time:""},
        {title:"",time:""}
      ],
     });
  }


  render() {
    const {navigation, themeColor} = this.props;
    const gitHubStr = 'https://github.com/aijason';
    const csdnStr = 'https://blog.csdn.net/u010379595';
    return (
      <View style={globalStyles.container}>
        <NavBar title={'Demo'} navigation={navigation} />
        <View style={styles.content}>
          <Image style={styles.logo} source={images.logoIcon} />
          <Text style={styles.desc}>
            {i18n('wanAndroid-client-based-on-Facebook-react-native')}
          </Text>
          <View style={styles.item}>
            <Text style={styles.itemText}>
              {i18n('email')}：
              <Text style={{color: themeColor}}>977854695@qq.com</Text>
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>
              CSDN：
              <Text
                style={[styles.underlineText, {color: themeColor}]}
                onPress={() => {
                  navigation.navigate('WebView', {
                    title: 'CSDN',
                    url: csdnStr,
                  });
                }}>
                {csdnStr}
              </Text>
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>
              GitHub：
              <Text
                style={[styles.underlineText, {color: themeColor}]}
                onPress={() => {
                  navigation.navigate('WebView', {
                    title: 'GitHub',
                    url: gitHubStr,
                  });
                }}>
                {gitHubStr}
              </Text>
            </Text>
          </View>
          <Text style={styles.bottomText}>
            {i18n(
              'This project is for learning purposes only, not for commercial purposes',
            )}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: Color.WHITE,
    alignItems: 'center',
    paddingVertical: dp(150),
  },
  logo: {
    width: dp(180),
    height: dp(189),
    borderRadius: dp(90),
    marginBottom: dp(50),
  },
  desc: {
    fontSize: dp(30),
    color: Color.TEXT_MAIN,
    marginTop: dp(20),
    marginBottom: dp(100),
  },
  blogStyle: {
    width: dp(200),
    height: dp(200),
    borderRadius: dp(100),
    backgroundColor: '#FF7256',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: dp(20),
    marginHorizontal: dp(20),
  },
  githubStyle: {
    width: dp(200),
    height: dp(200),
    borderRadius: dp(100),
    backgroundColor: '#5F9EA0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: dp(20),
    marginHorizontal: dp(20),
  },
  item: {
    paddingHorizontal: dp(50),
    marginBottom: dp(50),
    width: DEVICE_WIDTH,
  },
  itemText: {
    fontSize: dp(30),
    color: Color.TEXT_MAIN,
  },
  bottomText: {
    fontSize: dp(24),
    color: Color.TEXT_MAIN,
    position: 'absolute',
    marginVertical: dp(50),
    paddingHorizontal: dp(28),
    bottom: getBottomSpace(),
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
});

const mapStateToProps = state => {
  return {
    themeColor: state.user.themeColor,
  };
};

export default Day1;
