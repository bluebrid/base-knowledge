from .base_page_object import BasePage
from selenium.webdriver.common.by import By
#import time
class LoginPage(BasePage):
    def __init__(self, context):
        BasePage.__init__(self, context)
    locator_dictionary = {
        "loginDialog": (By.ID, "loginDialog"),
        "dialogTitle": (By.CSS_SELECTOR, "#loginDialog .title span"),
        "dialogCloseBtn": (By.CSS_SELECTOR, "#loginDialog .title .closed"),
        "userNameInput": (By.CSS_SELECTOR, "#loginDialog [name='username']"),
        "passwordInput": (By.CSS_SELECTOR, "#loginDialog [name='password']"),
        "loginBtn": (By.CSS_SELECTOR, "#loginDialog .btn.save"),
        "toRegisterDialogBtn": (By.CSS_SELECTOR, "#loginDialog .toRegisterDialog"),
        "warnMsg": (By.CSS_SELECTOR, "#loginDialog .warn")
    }

    def reset(self):
        # send_keys 是在原有的基础上进行append
        self.userNameInput.clear()
        self.passwordInput.clear()

    def login(self, username='', password='', repassword=''):
        self.reset()
        self.userNameInput.send_keys(username)
        self.passwordInput.send_keys(password)
        #time.sleep(10)
        self.loginBtn.click()