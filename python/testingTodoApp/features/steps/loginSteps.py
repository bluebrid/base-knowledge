from behave import *
from features.lib.pages import *
from features.lib.utils import *
import time
use_step_matcher("re")

@when(u'点击登录按钮')
def step_impl(context):
    page = LoginPage(context)
    page.loginTypeBtn.click()

@then(u"输入帐号密码进行登录")
def step_impl(context):
    page = LoginPage(context)
    utils = Utils()
    users = utils.readExcel(page.sheetName)
    username = users[0]['username']
    password = users[0]['password']    
    page.login(username, password)
    context.username = username