from behave import *
from features.lib.pages import *
from features.lib.utils import *
import time
use_step_matcher("re")

@then("验证注册弹出框")
def step_impl(context):
    page = RegisterPage(context)
    page.assertEqual(page.registerDialog.is_displayed() , True, "注册弹出框应该显示出来")
    page.assertEqual(page.dialogTitle.text , "注册", "标题应该是'注册',但是显示的是'{}'".format(page.dialogTitle.text))
    page.assertEqual(page.userNameInput.get_property('placeholder') , "请输入用户名", "placeholder 应该是'请输入用户名'")
    page.assertEqual(page.passwordInput.get_property('placeholder') , "请输入密码", "placeholder 应该是'请输入密码'")
    page.assertEqual(page.repasswordInput.get_property('placeholder') , "请输入确认密码", "placeholder 应该是'请输入确认密码'")
    page.assertEqual(page.registerBtn.text , "注册", "button 应该是'注册',但是显示的是'{}'".format(page.registerBtn.text))
    page.assertEqual(page.toLoginDialogBtn.text , "去登录", "连接 应该是'去登录',但是显示的是'{}'".format(page.toLoginDialogBtn.text))

@then(u'验证注册失败错误信息')
def step_impl(context):
     page = RegisterPage(context)
     for row in context.table:
         page.register(row["username"], row["password"], row["repassword"])
         page.assertEqual(page.warnMsg.text , row["errorMsg"], row["assertMsg"].format(row["username"], row["password"], row["repassword"], row["errorMsg"], page.warnMsg.text))
         time.sleep(1)
 
@then(u'随机生成用户名,随机生成密码,点击注册按钮，注册成功')
def step_impl(context):
    page = RegisterPage(context)
    username = Utils().randomString(10)
    password = repassword = Utils().randomString(10)
    page.register(username, password, repassword)
    context.username = username
    utils = Utils()
    utils.writeExcel(page.sheetName, (username, password))
    utils.readExcel(page.sheetName)
    

    
    

    