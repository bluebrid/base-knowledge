from behave import *
from features.lib.pages import *
from features.lib.utils import *
import time
use_step_matcher("re")

@then("验证注册弹出框")
def step_impl(context):
    page = RegisterPage(context)
    assert page.registerDialog.is_displayed() is True, "注册弹出框应该显示出来"
    assert page.dialogTitle.text == "注册", "标题应该是'注册',但是显示的是'{}'".format(page.dialogTitle.text)
    assert page.userNameInput.get_property('placeholder') == "请输入用户名", "placeholder 应该是'请输入用户名'"
    assert page.passwordInput.get_property('placeholder') == "请输入密码", "placeholder 应该是'请输入密码'"
    assert page.repasswordInput.get_property('placeholder') == "请输入确认密码", "placeholder 应该是'请输入确认密码'"
    assert page.registerBtn.text == "注册", "button 应该是'注册',但是显示的是'{}'".format(page.registerBtn.text)
    assert page.toLoginDialogBtn.text == "去登录", "连接 应该是'去登录',但是显示的是'{}'".format(page.toLoginDialogBtn.text)

@then(u'验证注册失败错误信息')
def step_impl(context):
     page = RegisterPage(context)
     for row in context.table:
         page.register(row["username"], row["password"], row["repassword"])
         assert page.warnMsg.text == row["errorMsg"], row["assertMsg"].format(row["username"], row["password"], row["repassword"], row["errorMsg"], page.warnMsg.text)
         time.sleep(1)
 
@then(u'随机生成用户名,随机生成密码,点击注册按钮，注册成功')
def step_impl(context):
    page = RegisterPage(context)
    username = Utils().randomString(10)
    password = repassword = Utils().randomString(10)
    page.register(username, password, repassword)
    context.username = username
    utils = Utils()
    utils.writeExcel('usersInfo.xlsx', (username, password))
    utils.readExcel('usersInfo.xlsx')
    

    
    

    