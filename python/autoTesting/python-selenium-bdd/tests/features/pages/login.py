from framework.webapp import webapp
import time
from data.config import settings

class Login():
    instance = None

    @classmethod
    def get_instance(cls):
        if cls.instance is None:
            cls.instance = Login()
        return cls.instance

    def __init__(self):
        self.driver = webapp.get_driver()

    def click_login_by_password_btn(self):
        loginBtn = webapp.get_element_by_id('switchAccountLogin')
        loginBtn.click()
        iframe = webapp.get_element_by_tag_name('iframe')
        webapp.switch_to_frame(iframe)
    
    def set_username_and_password(self):
        email = webapp.get_element_by_name('email')
        password = webapp.get_element_by_name('password')
        email.send_keys(settings['username'])
        password.send_keys(settings['password'])
    
    def click_login_btn(self):
        loginBtn = webapp.get_element_by_id('dologin')
        loginBtn.click()

    def click_write_email_btn(self):
        writeBtn = webapp.get_elements_by_selector('#dvNavTop > ul > li')[1]
        writeBtn.click()
    def write_email(self, address, title, content):
        addressEl = webapp.get_elements_by_selector('.nui-editableAddr-ipt')[0]
        titleEl = webapp.get_elements_by_selector('[id$="_subjectInput"]')[0]
        addressEl.send_keys(address)
        titleEl.send_keys(title)
        iframe = webapp.get_elements_by_selector('.APP-editor-iframe')[0]
        webapp.switch_to_frame(iframe)
        emailBodyEl = webapp.get_elements_by_selector('body')[0]
        emailBodyEl.send_keys(content)
        webapp.switch_to_default_content()
        #time.sleep(5)
        sendBtn = webapp.get_elements_by_selector('footer > div')[0]
        sendBtn.click()

    def verify_component_exists_by_class(self, component):
        webapp.verify_component_exists_by_class(component)

    def check_result(self):
        resultEl = webapp.get_elements_by_selector('[id$="_succInfo"]')[0]
        assert resultEl is not None, \
            "邮件发送失败，结果是 {}".format(resultEl.text)

    def click_already_sended(self):
        sendBoxLink = webapp.get_elements_by_selector('#dvNavTree ul li')[6]
        sendBoxLink.click()
        time.sleep(4)

login = Login.get_instance()