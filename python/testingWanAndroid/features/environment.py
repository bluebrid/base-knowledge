# import sys
# sys.path.append('./lib/utils')
from selenium import webdriver
# If you don't see colors (RED and GREEN) on command line, add the below lines
# from colorama import init
# init()
from lib.utils import *
from config.config import settings
import os
# import zipfile
import shutil
import time
import logging
#from lib.pagefactory import on
from webdriver_manager.chrome import ChromeDriverManager


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
    # behave -D BROWSER=chrome
    if 'BROWSER' in context.config.userdata.keys():
        if context.config.userdata['BROWSER'] is None:
            BROWSER = 'chrome'
        else:
            BROWSER = context.config.userdata['BROWSER']
    else:
        BROWSER = 'chrome'
    # For some reason, python doesn't have switch case -
    # http://stackoverflow.com/questions/60208/replacements-for-switch-statement-in-python
    if BROWSER == 'chrome':
        #context.browser = webdriver.Chrome()
        context.browser = webdriver.Chrome(ChromeDriverManager().install())
    elif BROWSER == 'firefox':
        context.browser = webdriver.Firefox()
    elif BROWSER == 'safari':
        context.browser = webdriver.Safari()
    elif BROWSER == 'ie':
        context.browser = webdriver.Ie()
    elif BROWSER == 'opera':
        context.browser = webdriver.Opera()
    elif BROWSER == 'phantomjs':
        context.browser = webdriver.PhantomJS()
    else:
        print("Browser you entered:", BROWSER, "is invalid value")

    context.browser.maximize_window()
    print("Before scenario\n")


def after_scenario(context, scenario):
    #失败进行截图
    print("scenario status" + scenario.status.name)
    if scenario.status.name == "failed":
        if not os.path.exists("failed_scenarios_screenshots"):
            os.makedirs("failed_scenarios_screenshots")
        os.chdir("failed_scenarios_screenshots")
        context.browser.save_screenshot(scenario.name + "_failed.png")
        # 需要返回上一级目录，不然找不到failed_scenarios_screenshots， 因为当前的路径是在failed_scenarios_screenshots里面了
        os.chdir('../')
    context.browser.quit()

def after_feature(context, feature):
            print("\nAfter Feature")

def after_all(context):
    # 打包截图
    print("User data:", context.config.userdata)
    # behave -D ARCHIVE=Yes
    reportName = time.strftime("%d_%m_%Y")
    if 'ARCHIVE' in context.config.userdata.keys():
        # if os.path.exists("failed_scenarios_screenshots"):
        #     os.rmdir("failed_scenarios_screenshots")
        #     os.makedirs("failed_scenarios_screenshots")
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


