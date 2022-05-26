/**
 * Created by hjs on 2019-09-17
 */

const actionTypes = {
  // HOME
  FETCH_HOME_BANNER: 'FETCH_HOME_BANNER', // 请求首页轮播
  FETCH_HOME_LIST: 'FETCH_HOME_LIST', // 请求首页列表
  FETCH_HOME_LIST_FAILURE: 'FETCH_HOME_LIST_FAILURE', // 请求首页列表失败
  FETCH_HOME_LIST_MORE: 'FETCH_HOME_LIST_MORE', // 请求首页列表上拉加载更多
  FETCH_OFTEN_USED_WEBSITES: 'FETCH_OFTEN_USED_WEBSITES', // 请求常用网站数据
  FETCH_HOME_ADD_COLLECT: 'FETCH_HOME_ADD_COLLECT', // 请求收藏首页文章
  FETCH_HOME_CANCEL_COLLECT: 'FETCH_HOME_CANCEL_COLLECT', // 取消收藏首页文章
  // USER
  FETCH_TO_REGISTER: 'FETCH_TO_REGISTER', // 请求注册
  FETCH_TO_REGISTER_FAILURE: 'FETCH_TO_REGISTER_FAILURE', // 请求注册失败
  FETCH_TO_LOGIN: 'FETCH_TO_LOGIN', // 请求登录
  FETCH_TO_LOGIN_FAILURE: 'FETCH_TO_LOGIN_FAILURE', // 请求登录失败
  FETCH_TO_LOGOUT: 'FETCH_TO_LOGOUT', // 请求登出
  CHANGE_THEME_COLOR: 'CHANGE_THEME_COLOR', // 改变应用主题色
  INITIAL_AUTH_INFO: 'INITIAL_AUTH_INFO', // 初始化个人设置信息
  SWITCH_APP_LANGUAGE: 'SWITCH_APP_LANGUAGE', // 切换应用语言
  // SYSTEM
  FETCH_TO_SYSTEM_DATA: 'FETCH_TO_SYSTEM_DATA', // 请求体系数据
  // WX_ARTICLE
  FETCH_WX_ARTICLE_TABS: 'FETCH_WX_ARTICLE_TABS', // 请求公众号Tab列表
  FETCH_WX_ARTICLE_LIST: 'FETCH_WX_ARTICLE_LIST', // 请求某个公众号下的列表
  FETCH_ARTICLE_LOADING: 'FETCH_ARTICLE_LOADING', // Article loading
  // GUIDE
  FETCH_GUIDE_DATA: 'FETCH_GUIDE_DATA', // 请求导航数据
  UPDATE_SELECT_INDEX: 'UPDATE_SELECT_INDEX', // 更新选中索引值
  // PROJECT
  FETCH_PROJECT_TABS: 'FETCH_PROJECT_TABS', // 获取项目分类
  // SEARCH
  FETCH_SEARCH_HOT_KEY: 'FETCH_SEARCH_HOT_KEY', // 获取搜索热词
  FETCH_SEARCH_ARTICLE: 'FETCH_SEARCH_ARTICLE', // 根据关键词搜索文章
  FETCH_SEARCH_ARTICLE_MORE: 'FETCH_SEARCH_ARTICLE_MORE', // 根据关键词搜索文章列表上拉加载更多
  CLEAR_SEARCH_ARTICLE: 'CLEAR_SEARCH_ARTICLE', // 清空上一次加载记录
  FETCH_SEARCH_ARTICLE_ADD_COLLECT: 'FETCH_SEARCH_ARTICLE_ADD_COLLECT', // 搜索页收藏
  FETCH_SEARCH_ARTICLE_CANCEL_COLLECT: 'FETCH_SEARCH_ARTICLE_CANCEL_COLLECT', // 搜索页取消收藏
  // COLLECT
  FETCH_COLLECT_ARTICLE: 'FETCH_COLLECT_ARTICLE', // 请求收藏文章列表
  FETCH_COLLECT_ARTICLE_MORE: 'FETCH_COLLECT_ARTICLE_MORE', // 请求收藏文章列表上拉加载更多
  FETCH_MYCOLLECT_CANCEL_COLLECT: 'FETCH_MYCOLLECT_CANCEL_COLLECT', // 我的收藏页面取消收藏
  FETCH_MYCOLLECT_ADD_COLLECT: 'FETCH_MYCOLLECT_ADD_COLLECT', // 我的收藏页面收藏
  // COIN
  FETCH_MY_COIN_LIST: 'FETCH_MY_COIN_LIST', // 请求我的积分明细列表
  FETCH_MY_COIN_LIST_MORE: 'FETCH_MY_COIN_LIST_MORE', // 请求我的积分明细列表上拉加载更多
  FETCH_MY_COIN_INFO: 'FETCH_MY_COIN_INFO', // 获取个人积分，需要登录后访问
};

export default actionTypes;
