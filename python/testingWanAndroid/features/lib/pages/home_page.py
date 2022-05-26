from .base_page_object import BasePage
from selenium.webdriver.common.by import By

class HomePage(BasePage):
    def __init__(self, context):
        BasePage.__init__(self, context)
    locator_dictionary = {
        "loginBtn": (By.LINK_TEXT, "登录"),
        "registerBtn": (By.LINK_TEXT,  "注册"),
        "userAccountInfo": (By.CSS_SELECTOR, '.userNav .account > a'),
        "logoutBtn": (By.LINK_TEXT, "退出登录"),
        "todoBtn": (By.CSS_SELECTOR, ".user_opt .btn:nth-child(2) span"),
        "logoImg": (By.CSS_SELECTOR, ".header .logo img")
    }
