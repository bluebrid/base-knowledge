from behave import *
from features.lib.pages import *
import time
use_step_matcher("re")

@when("打开网站")
def step_impl(context):
    page = HomePage(context)
    page.visit()

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
    assert page.userAccountInfo.text == context.username, "'{}'帐号注册成功".format(context.username)

@then(u'验证登录成功')
def step_impl(context):
    page = HomePage(context)
    assert page.userAccountInfo.text == context.username, "'{}'帐号登录成功".format(context.username)

@then(u'退出登录')
def step_impl(context):
    page = HomePage(context)
    page.hover(page.userAccountInfo)
    page.logoutBtn.click()