from behave import *
from features.lib.pages import *
import time
use_step_matcher("re")

@when("打开网站")
def step_impl(context):
    page = HomePage(context)
    page.visit()
    #time.sleep(1000)

@when(u"加载cookies")
def step_impl(context):
    page = HomePage(context)
    #page.browser.
    COOKIES = 'loginUserName=tomfanxiaojun; token_pass=5370d059cebf4951f2c460b2ee5b7769; loginUserName_wanandroid_com=tomfanxiaojun; token_pass_wanandroid_com=5370d059cebf4951f2c460b2ee5b7769; Hm_lvt_90501e13a75bb5eb3d067166e8d2cad8=1574647072,1575344880,1575864016,1576119281; JSESSIONID=DB48781F0BFD04EEDACEC63F24CDC849; Hm_lpvt_90501e13a75bb5eb3d067166e8d2cad8=1576632420'
    for item in COOKIES.split(';'):
        name,value = item.split('=',1)
        name=name.replace(' ','').replace('\r','').replace('\n','')
        value = value.replace(' ','').replace('\r','').replace('\n','')
        cookie_dict={
            'name': name,
            'value': value
        }
        page.browser.add_cookie(cookie_dict)
    page.browser.refresh()
    #time.sleep(10)
    
    #获取token
    # token=browser.execute_script('window.localStorage.getItem("token")')
    # print(token)
    # #添加token
    # js='window.localStorage.setItem("token","token值")
    # browser.execute_script(js)

    # browser.refresh()#刷新
 
  

@when('点击注册按钮')
def step_impl(context):
    page = HomePage(context)
    page.registerBtn.click()

@when('点击登录按钮')
def step_impl(context):
    page = HomePage(context)
    page.loginBtn.click()
    

@then(u'验证注册成功')
def step_impl(context):
    page = HomePage(context)
    page.assertEqual(page.userAccountInfo.text , context.username, "'{}'帐号注册成功".format(context.username))

@then(u'验证登录成功')
def step_impl(context):
    page = HomePage(context)
    page.assertEqual(page.userAccountInfo.text ,context.username, "'{}'帐号登录成功".format(context.username))

@then(u'退出登录')
def step_impl(context):
    page = HomePage(context)
    page.hover(page.userAccountInfo)
    page.logoutBtn.click()

@then(u'点击"待办清单"按钮')
def step_impl(context):
    page = HomePage(context)
    page.click(page.todoBtn)
    page.switchToNewWindow()

@then(u'跳转到首页')
def step_impl(context):
    page = HomePage(context)
    page.click(page.logoImg)