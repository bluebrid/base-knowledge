from selenium import webdriver
from data.config import settings
from urllib.parse import urljoin
from webdriver_manager.chrome import ChromeDriverManager
import unittest #https://docs.python.org/zh-cn/3/library/unittest.html#test-cases
import time

class WebApp(unittest.TestCase):
    instance = None

    @classmethod
    def get_instance(cls):
        if cls.instance is None:
            cls.instance = WebApp()
        return cls.instance

    def __init__(self):
        print(str(settings['browser']).lower())
        if str(settings['browser']).lower() == "firefox":
            self.driver = webdriver.Firefox()
        elif str(settings['browser']).lower() == "chrome":
            # self.driver = webdriver.Chrome()
            # 一般会安装最新的driver ,则需要更新
            self.driver = webdriver.Chrome(ChromeDriverManager().install())
            #time.sleep(1)
        else:
            self.driver = webdriver.Chrome(ChromeDriverManager().install())
       

    def get_driver(self):
        return self.driver

    def load_website(self):
        self.driver.maximize_window()
        self.driver.get(settings['url'])
        time.sleep(1)

    def goto_page(self, page):
        self.driver.get(urljoin(settings['url'], page.lower()))

    def get_element_by_id(self, id):
        return self.driver.find_element_by_id(id)

    def get_element_by_name(self, name):
        return self.driver.find_element_by_name(name)

    def get_element_by_tag_name(self, tagName):
        return self.driver.find_element_by_tag_name(tagName)

    def get_element_by_class_name(self, className):
        return self.driver.find_elements_by_class_name(className)

    def get_elements_by_selector(self, selector):
        return self.driver.find_elements_by_css_selector(selector)

    def switch_to_frame(self, iframe):
        self.driver.switch_to_frame(iframe)
        
    def switch_to_default_content(self):
        self.driver.switch_to_default_content()

    def verify_component_exists_by_id(self, component):
        assert self.driver.find_element_by_id(component), \
            "Component {} not found on page".format(component)
    def execute_script(self, js):
        self.driver.execute_script(js)

    def verify_component_exists_by_class(self, component):
        self.assertIsNone(self.driver.find_elements_by_class_name(component), msg="{}不应该为空".format(component))
        # assert self.driver.find_elements_by_class_name(component), \
        #     "Component {} not found on page".format(component)
        #self.driver.quit()
webapp = WebApp.get_instance()
