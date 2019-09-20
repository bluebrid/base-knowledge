from behave import given, when, then
from pages.login import login
from framework.webapp import webapp
import time

@when(u'点击密码登录')
def click_login_by_password_btn(context):
    login.click_login_by_password_btn()

@then(u'输入帐号密码')
def set_username_and_password(context):
    login.set_username_and_password()

@then(u'点击登录按钮')
def click_login_btn(context):
    login.click_login_btn()
    time.sleep(4)

@then(u'检查首页元素："{component}"')
def click_login_btn(context, component):
    webapp.verify_component_exists_by_class(component)

@then(u'点击写信按钮')
def click_write_email_btn(context):
    login.click_write_email_btn()
    time.sleep(4)

# @then(u'编写邮件：地址"<address>",主题"<title>",内容"<content>"')
# def step_impl(context, address, title, content):
#      print(address, title, content)

@then(u'编写邮件')
def write_email(context):
    login.write_email(context.table)
    # for row in context.table:
        
    #     time.sleep(4)
    #     login.check_result()
    #     login.click_re_write_email()

@then(u'检查发送结果')
def check_result(context):
    login.check_result()

@then(u'点击已发送')
def click_already_sended(context):
    login.click_already_sended()