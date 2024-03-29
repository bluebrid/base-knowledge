from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import *
#https://selenium-python.readthedocs.io/api.html#selenium.webdriver.remote.webelement.WebElement
import traceback
import time

class BasePage(object):

    def __init__(self, context):
        self.driver = context.driver
        self.timeout = 30

    #   js = 'document.querySelector(".nui-tree-item-text[title=已发送]").click()'
    #     webapp.runJs(js)
    def runJs(self, js):
        self.driver.execute_script(js)
        
    def find_element(self, *loc):
        return self.driver.find_element(*loc)

    def find_elements(self, locType, selector, isNeedWatie = False):
        if isNeedWatie:
            try:
                element = WebDriverWait(self.driver,self.timeout).until(
                    EC.presence_of_element_located((locType, selector))
                )
            except(TimeoutException,StaleElementReferenceException):
                traceback.print_exc()
        return self.driver.find_elements(locType, selector)

    # def visit(self):
    #     self.driver.get(self.base_url)

    def switch_to_frame(self, iframe):
        self.driver.switch_to_frame(iframe)
        time.sleep(5)

    def switchToNewWindow(self):
        window_after  = self.driver.window_handles[1]
        self.driver.switch_to_window(window_after)

    def click(self, element):
        try:
           ActionChains(self.driver).click(element).perform()
        except Exception as e:
            print(str(e))
            pass
        

    def hover(self,element):
            ActionChains(self.driver).move_to_element(element).perform()
            # I don't like this but hover is sensitive and needs some sleep time
            time.sleep(5)

    def assertEqual(self, one, two, message):
        assert one == two, message
        # try:
        #     assert one == two, message
        # except Exception as e:
        #     print(str(e))

    def __getattr__(self, what):
        try:
            if what in self.locator_dictionary.keys():
                try:
                    element = WebDriverWait(self.driver,self.timeout).until(
                        EC.presence_of_element_located(self.locator_dictionary[what])
                    )
                except(TimeoutException,StaleElementReferenceException):
                    traceback.print_exc()
                    print(self.locator_dictionary[what])

                try:
                    element = WebDriverWait(self.driver,self.timeout).until(
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