from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import *
#https://selenium-python.readthedocs.io/api.html#selenium.webdriver.remote.webelement.WebElement
import traceback
import time

class BasePage(object):

    def __init__(self, context, base_url='https://www.wanandroid.com/'):
        self.base_url = base_url
        #print(self.base_url)
        self.browser = context.browser
        self.timeout = 30

    #   js = 'document.querySelector(".nui-tree-item-text[title=已发送]").click()'
    #     webapp.runJs(js)
    def runJs(self, js):
        self.browser.execute_script(js)
        
    def find_element(self, *loc):
        return self.browser.find_element(*loc)

    def visit(self):
        self.browser.get(self.base_url)

    def switch_to_frame(self, iframe):
        self.browser.switch_to_frame(iframe)
        time.sleep(5)

    def switchToNewWindow(self):
        window_after  = self.browser.window_handles[1]
        self.browser.switch_to_window(window_after)

    def click(self, element):
        # ActionChains(self.browser).move_to_element(element).perform()
        ActionChains(self.browser).click(element).perform()

    def hover(self,element):
            ActionChains(self.browser).move_to_element(element).perform()
            # I don't like this but hover is sensitive and needs some sleep time
            time.sleep(5)

    def __getattr__(self, what):
        try:
            if what in self.locator_dictionary.keys():
                try:
                    element = WebDriverWait(self.browser,self.timeout).until(
                        EC.presence_of_element_located(self.locator_dictionary[what])
                    )
                except(TimeoutException,StaleElementReferenceException):
                    traceback.print_exc()
                    print(self.locator_dictionary[what])

                try:
                    element = WebDriverWait(self.browser,self.timeout).until(
                        EC.visibility_of_element_located(self.locator_dictionary[what])
                    )
                except(TimeoutException,StaleElementReferenceException):
                    traceback.print_exc()
                    self.locator_dictionary[what]
                # I could have returned element, however because of lazy loading, I am seeking the element before return
                #print(self.locator_dictionary[what].size())
                return self.find_element(*self.locator_dictionary[what])
        except AttributeError:
            super(BasePage, self).__getattribute__("method_missing")(what)

    def method_missing(self, what):
        print ("No {} here!".format(what))