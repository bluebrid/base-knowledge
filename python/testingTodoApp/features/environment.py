# from selenium import webdriver
from appium import webdriver
from appium.webdriver.common.touch_action import TouchAction
from appium.webdriver.common.multi_action import MultiAction
# If you don't see colors (RED and GREEN) on command line, add the below lines
# from colorama import init
# init()
from features.lib.utils import *
from config.config import settings
import os
# import zipfile
import shutil
import time
import logging
#from lib.pagefactory import on
# from webdriver_manager.chrome import ChromeDriverManager

PATH = lambda p: os.path.abspath(
    os.path.join(os.path.dirname(__file__), p)
)


def before_all(context):
     print("Executing before all")

def before_feature(context, feature):     
     print("Before feature\n")
     # Create logger
     # TODO - http://stackoverflow.com/questions/6386698/using-the-logging-python-class-to-write-to-a-file
     context.logger = logging.getLogger('seleniumframework_tests')
     hdlr = logging.FileHandler('./seleniumframework_tests.log')
     formatter = logging.Formatter('%(asctime)s %(levelname)s %(message)s')
     hdlr.setFormatter(formatter)
     context.logger.addHandler(hdlr)
     context.logger.setLevel(logging.DEBUG)

# Scenario level objects are popped off context when scenario exits

def before_scenario(context, scenario):
    print("User data:", context.config.userdata)
    desired_caps = settings["desiredCaps"]
    desired_caps['app'] = PATH(desired_caps['app'])
    context.driver = webdriver.Remote(settings['url'], desired_caps)

def after_scenario(context, scenario):
    #失败进行截图
    print("scenario status" + scenario.status.name)
    if scenario.status.name == "failed":
        if not os.path.exists("failed_scenarios_screenshots"):
            os.makedirs("failed_scenarios_screenshots")
        os.chdir("failed_scenarios_screenshots")
        context.driver.save_screenshot(scenario.name + "_failed.png")
        # 需要返回上一级目录，不然找不到failed_scenarios_screenshots， 因为当前的路径是在failed_scenarios_screenshots里面了
        os.chdir('../')
    context.driver.quit()

def after_feature(context, feature):
            print("\nAfter Feature")

def after_all(context):
    # 打包截图
    print("User data:", context.config.userdata)
    # behave -D ARCHIVE=Yes
    reportName = time.strftime("%d_%m_%Y")
    if 'ARCHIVE' in context.config.userdata.keys():
        if os.path.exists("failed_scenarios_screenshots") is False:
            #os.rmdir("failed_scenarios_screenshots")
            os.makedirs("failed_scenarios_screenshots")
        if context.config.userdata['ARCHIVE'] == "Yes":
            shutil.make_archive(
    reportName,
    'zip',
     "failed_scenarios_screenshots")
            shutil.rmtree("failed_scenarios_screenshots")
            print("Executing after all")
    # 发送邮件报告
    m = SendMail(
        username= settings["email"]["username"],
        passwd= settings["email"]["password"],
        recv= settings["email"]["receivers"],
        title= settings["email"]["emailTitle"].format(reportName),
        content= settings["email"]["emailContent"],
        file=r'{}.zip'.format(reportName),
        ssl=True,
    )
    m.send_mail()


