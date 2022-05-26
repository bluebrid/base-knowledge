from .base_page_object import BasePage
from selenium.webdriver.common.by import By
#import time
class LoginPage(BasePage):
    def __init__(self, context):
        BasePage.__init__(self, context)
    sheetName = "usersiInfo"
    locator_dictionary = {
        "loginTypeBtn": (By.ID, "com.wunderkinder.wunderlistandroid:id/LoginButton"),
        "emailInput": (By.ID, "com.wunderkinder.wunderlistandroid:id/login_email_edittext"),
        "passwordInput": (By.ID, "com.wunderkinder.wunderlistandroid:id/login_password_edittext"),
        "loginBtn": (By.ID, "com.wunderkinder.wunderlistandroid:id/login_button")         
    }

    def reset(self):
        # send_keys 是在原有的基础上进行append
        self.emailInput.clear()
        self.passwordInput.clear()

    def login(self, username='', password=''):
        self.reset()
        self.emailInput.send_keys(username)
        self.passwordInput.send_keys(password)
        #time.sleep(10)
        self.loginBtn.click()