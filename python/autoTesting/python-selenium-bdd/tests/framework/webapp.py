from selenium import webdriver
from data.config import settings
from urllib.parse import urljoin
from webdriver_manager.chrome import ChromeDriverManager

class WebApp:
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
            print('==================')
            self.driver = webdriver.Chrome()
        else:
            self.driver = webdriver.Chrome(ChromeDriverManager().install())
       

    def get_driver(self):
        return self.driver

    def load_website(self):
        self.driver.get(settings['url'])

    def goto_page(self, page):
        print(page.lower())
        self.driver.get(urljoin(settings['url'], page.lower()))

    def verify_component_exists(self, component):
        # Simple implementation
        assert component in self.driver.find_element_by_tag_name('body').text, \
            "Component {} not found on page".format(component)


webapp = WebApp.get_instance()
