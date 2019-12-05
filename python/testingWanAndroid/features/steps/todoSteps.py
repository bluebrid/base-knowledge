from behave import *
from features.lib.pages import *
from features.lib.utils import *
import time
use_step_matcher("re")

@then(u'检查默认的清单类型是否为"([^"]*)"')
def step_impl(context, defalutType):
    page = TodoPage(context)
    assert page.onlyOneType.get_attribute('class') == 'active', "默认的清单类型应该是:'{}'".format(defalutType)

@then(u'点击添加待办事项按钮')
def step_impl_click_addBtn(context):
    page = TodoPage(context)
    page.addBtn.click()

@then(u'验证添加事项失败信息')
def step_impl(context):
    page = TodoPage(context)
    for row in context.table:
        page.saveTodo(row["title"], row["detail"], row["date"])
        assert page.warnMsg.text == row["errorMsg"], row["assertMsg"].format(row["title"], row["detail"], row["date"], row["errorMsg"], page.warnMsg.text)
        time.sleep(1)

@then(u'生成随机字符串添加待办事项')
def step_impl(context):
    page = TodoPage(context)
    utils = Utils()
    title= utils.randomString()
    detail= utils.randomString()
    date= '2019-12-05'
    page.saveTodo(title, detail, date)
    context.title = title
    context.detail = detail
    context.date = date
    # todos = utils.readExcel(page.sheetName)    
    # for row in todos:
    #     title= row["title"]
    #     detail= row["detail"]
    #     date= '2019-12-05'
    #     page.saveTodo(title, detail, date)
    #     time.sleep(1)
    #     #step_impl_click_addBtn(context)
    #     context.execute_steps('''
    #     Then 点击添加待办事项按钮
    #     ''')
        
# @then(u'检查是待办事项添加成功')
# def step_impl(context):
