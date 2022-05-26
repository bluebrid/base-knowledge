from behave import *
from features.lib.pages import *
from features.lib.utils import *
import time
use_step_matcher("re")

@then("验证登录弹出框")
def step_impl(context):
    page = LoginPage(context)
    page.assertEqual(page.loginDialog.is_displayed() , True, "注册弹出框应该显示出来")
    page.assertEqual( page.dialogTitle.text , "登录", "标题应该是'登录',但是显示的是'{}'".format(page.dialogTitle.text))
    page.assertEqual( page.userNameInput.get_property('placeholder') , "请输入用户名", "placeholder 应该是'请输入用户名'")
    page.assertEqual( page.passwordInput.get_property('placeholder') , "请输入密码", "placeholder 应该是'请输入密码'")
    page.assertEqual( page.loginBtn.text , "登录", "button 应该是'登录',但是显示的是'{}'".format(page.loginBtn.text))
    page.assertEqual( page.toRegisterDialogBtn.text , "去注册", "连接 应该是'去注册',但是显示的是'{}'".format(page.toRegisterDialogBtn.text))


@then(u'验证登录失败错误信息')
def step_impl(context):
     page = LoginPage(context)
     for row in context.table:
         page.login(row["username"], row["password"])
         time.sleep(1)
         page.assertEqual( page.warnMsg.text , row["errorMsg"], row["assertMsg"].format(row["username"], row["password"], row["errorMsg"], page.warnMsg.text))

@then(u'从excel获取登录用户名和密码进行登录')
def step_impl(context):
    utils = Utils()
    page = LoginPage(context)
    users = utils.readExcel(page.sheetName)
    username = users[0]['username']
    password = users[0]['password']    
    page.login(username, password)
    context.username = username


         
 