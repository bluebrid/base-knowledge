from .base_page_object import BasePage
from selenium.webdriver.common.by import By
import time
class TodoPage(BasePage):
    def __init__(self, context):
        BasePage.__init__(self, context)
    sheetName = "todosInfo"
    locator_dictionary = {
        "onlyOneType": (By.LINK_TEXT, "只用这一个"),
        "workType": (By.LINK_TEXT, "工作"),
        "studyType": (By.LINK_TEXT, "学习"),
        "lifeType": (By.LINK_TEXT, "生活"),
        "addBtn": (By.CSS_SELECTOR, ".undoList .addTodo.add_btn"),
        "warnMsg": (By.CSS_SELECTOR, "#addTodoDialog .warn"),
        "titleInput": (By.CSS_SELECTOR, "#addTodoDialog [name='title']"),
        "contentInput": (By.CSS_SELECTOR, "#addTodoDialog [name='content']"),
        "dateInput": (By.CSS_SELECTOR, "#addTodoDialog [name='date']"),
        "saveBtn": (By.CSS_SELECTOR, "#addTodoDialog .opt_p .btn.save"),
        "cancelBtn": (By.CSS_SELECTOR, "#addTodoDialog .opt_p .btn.disabled"),
        "newTotoDate": (By.CSS_SELECTOR, ".undoList .border_bottom .date"),
        "newTotoTitle": (By.CSS_SELECTOR, ".undoList ul li .todo_detail .date"),
    }

    def reset(self):
        # send_keys 是在原有的基础上进行append
        self.titleInput.clear()
        self.contentInput.clear()
        self.dateInput.clear()

    def saveTodo(self, title='', detail='', date=''):
        self.reset()
        #print(title, detail, date)
        self.titleInput.send_keys(title)
        self.contentInput.send_keys(detail)
        self.dateInput.send_keys(date)  
        # 需要关闭日期弹出框
        
        js = 'document.querySelector("#addTodoDialog .opt_p .btn.save").click()'
        self.runJs(js)      
        #self.click(self.saveBtn)
        time.sleep(1)