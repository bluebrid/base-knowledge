from .base_page_object import BasePage
from selenium.webdriver.common.by import By
class RegisterPage(BasePage):
    def __init__(self, context):
        BasePage.__init__(self, context)
    locator_dictionary = {
        "registerDialog": (By.ID, "registerDialog"),
        "dialogTitle": (By.CSS_SELECTOR, "#registerDialog .title span"),
        "dialogCloseBtn": (By.CSS_SELECTOR, "#registerDialog .title .closed"),
        "userNameInput": (By.CSS_SELECTOR, "#registerDialog [name='username']"),
        "passwordInput": (By.CSS_SELECTOR, "#registerDialog [name='password']"),
        "repasswordInput": (By.CSS_SELECTOR, "#registerDialog [name='repassword']"),
        "registerBtn": (By.CSS_SELECTOR, "#registerDialog .btn.save"),
        "toLoginDialogBtn": (By.CSS_SELECTOR, "#registerDialog .toLoginDialog"),
        "warnMsg": (By.CSS_SELECTOR, "#registerDialog .warn")
    }

    def reset(self):
        # send_keys 是在原有的基础上进行append
        self.userNameInput.clear()
        self.passwordInput.clear()
        self.repasswordInput.clear()

    def register(self, username='', password='', repassword=''):
        # iframe = self.loginIframe
        # self.switch_to_frame(iframe)
        self.reset()
        self.userNameInput.send_keys(username)
        self.passwordInput.send_keys(password)
        self.repasswordInput.send_keys(repassword)
        self.registerBtn.click()