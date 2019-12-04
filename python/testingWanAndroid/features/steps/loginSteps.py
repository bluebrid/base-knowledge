from behave import *
from features.lib.pages import *
import time
use_step_matcher("re")

# @when("打开邮箱网站")
# def step_impl(context):
#     page = LoginPage(context)
#     page.visit()
#     page.qqLoginTab.click()
# @when('用用户名 "([^"]*)" 密码 "([^"]*)"登录邮箱')
# def step_impl(context, username, password):
#     page = LoginPage(context)
#     page.login(username=username,password=password)

# @then("验证登录是否成功")
# def step_impl(context):
#     print('-----------')
#     #AutomationHomePage(context).sign_out.click()

# @then("退出登录")
# def step_impl(context):
#     page = HomePage(context)
#     page.userAccountInfo.hover()

    #AutomationHomePage(context).sign_out.click()