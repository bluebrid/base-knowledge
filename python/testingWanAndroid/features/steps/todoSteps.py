from behave import *
from features.lib.pages import *
from features.lib.utils import *
from selenium.webdriver.common.by import By
import time
use_step_matcher("re")

@then(u'检查默认的清单类型是否为"([^"]*)"')
def step_impl(context, defalutType):
    page = TodoPage(context)
    page.assertEqual(page.onlyOneType.get_attribute('class') , 'active', "默认的清单类型应该是:'{}'".format(defalutType))

@then(u'先删除所有的待办事项')
def step_impl(context):
    page = TodoPage(context)
    allTodos = page.find_elements(By.CSS_SELECTOR, ".undoList .delete")
    lenSize = len(allTodos)
    while len(allTodos) > 0:
        page.click(allTodos[0])
        page.click(page.find_element(By.CSS_SELECTOR, "#deleteTodoDialog .btn.save"))
        allTodos = page.find_elements(By.CSS_SELECTOR, ".undoList .delete")
        # lenSize = lenSize - 1
        # if lenSize < 1:
        #     break
    page.assertEqual(len(allTodos), 0, "删除了所有的待办事项，所以应该剩下0个待办事项")

@then(u'完成所有的待办事项')
def step_impl(context):
    page = TodoPage(context)
    time.sleep(5)
    doneBtns = page.find_elements(By.CSS_SELECTOR, ".undoList .doneBtn", True)
    lenSize = len(doneBtns)
    while len(doneBtns) > 0:
        #print('---------------------------', doneBtns[0].get_property('title'))
        page.click(doneBtns[0])
        doneBtns = page.find_elements(By.CSS_SELECTOR, ".undoList .doneBtn")
    page.assertEqual(len(doneBtns), 0, "删除了所有的待办事项，所以应该剩下0个待办事项")
    #context.allDoneTodos = lenSize

@then(u'还原所有的待办事项')
def step_impl(context):
    page = TodoPage(context)
    time.sleep(5)
    doneBtns = page.find_elements(By.CSS_SELECTOR, ".doneList .revertBtn", True)
    lenSize = len(doneBtns)
    while len(doneBtns) > 0:
        #print('---------------------------', doneBtns[0].get_property('title'))
        page.click(doneBtns[0])
        doneBtns = page.find_elements(By.CSS_SELECTOR, ".doneList .revertBtn")
         


@then(u'点击添加待办事项按钮')
def step_impl_click_addBtn(context):
    page = TodoPage(context)
    page.click(page.addBtn)

@then(u'验证添加事项失败信息')
def step_impl(context):
    page = TodoPage(context)
    for row in context.table:
        page.saveTodo(row["title"], row["detail"], row["date"])
        page.assertEqual(page.warnMsg.text , row["errorMsg"], row["assertMsg"].format(row["title"], row["detail"], row["date"], row["errorMsg"], page.warnMsg.text))
        #time.sleep(1)

@then(u'从excel读取数据添加待办事项')
def step_impl(context):
    page = TodoPage(context)
    utils = Utils()
    allTodos = page.find_elements(By.CSS_SELECTOR, ".undoList li")
    context.allTodos = allTodos 
    todos = utils.readExcel(page.sheetName)    
    for i in range(0, len(todos)):
        row = todos[i]
        title= row["title"]
        detail= row["detail"] if row["detail"] is not None else ""
        date= row['date']
        #date= '2019-12-05'
        page.saveTodo(title, detail, date)
        time.sleep(1)
        if i < len(todos) - 1:
             page.click(page.addBtn)
    context.todos = todos   

@then(u'检查是待办事项添加成功')
def step_impl(context):
    page = TodoPage(context)
    allTodos = page.find_elements(By.CSS_SELECTOR, ".undoList li")
    newTodos = context.todos
    oldTodos = context.allTodos
    page.assertEqual(len(allTodos) - len(oldTodos), len(newTodos), "应该新增{}个待办事项，但是事实添加成功了{}个待办事项".format(len(newTodos), len(allTodos) - len(oldTodos)))

@then(u'删除第一个已完成的待办事项')
def step_impl(context):
    page = TodoPage(context)
    doneBtns = page.find_elements(By.CSS_SELECTOR, ".doneList .delete", True)
    doneSize = len(doneBtns)
    page.click(doneBtns[0])
    time.sleep(1)
    doneBtns = page.find_elements(By.CSS_SELECTOR, ".doneList .delete")
    page.assertEqual(doneSize -1, len(doneBtns), "删除了一个已经完成的待办事项, 应该还剩下{}个待办事项".format(len(doneBtns)))