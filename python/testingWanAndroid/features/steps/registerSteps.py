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

@then('用户名为"([^"]*)"的情况下点击注册按钮')
def step_impl(context, username):
    page = RegisterPage(context)
    page.register(username)
    assert page.warnMsg.text == "用户名最少3位", "用户名'{}'， 错误消息应该为'{}', 但是显示的是'{}'".format(username, '用户名最少3位', page.warnMsg.text)

@then('用户名为"([^"]*)",密码为"([^"]*)"的情况下点击注册按钮')
def step_impl(context, username, password):
    page = RegisterPage(context)
    page.register(username, password)
    assert page.warnMsg.text == "密码至少 6 位", "用户名'{}',密码为'{}', 错误消息应该为'{}', 但是显示的是'{}'".format(username, password, '密码至少 6 位', page.warnMsg.text)

@then(u'用户名为"([^"]*)",密码为"([^"]*)",确认密码为"([^"]*)"的情况下点击注册按钮')
def step_impl(context, username, password, repassword):
    page = RegisterPage(context)
    page.register(username, password, repassword)
    assert page.warnMsg.text == "确认密码与密码不符", "用户名'{}',密码为'{}', 确认密码为'{}', 错误消息应该为'{}', 但是显示的是'{}'".format(username, password, repassword, '确认密码与密码不符', page.warnMsg.text)

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
    

    
    

    