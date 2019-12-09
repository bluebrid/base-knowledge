https://selenium-python.readthedocs.io/api.html#module-selenium.webdriver.common.action_chains

https://behave.readthedocs.io/en/latest/tutorial.html

http://www.seleniumframework.com/python-basic/what-is-python/

http://www.seleniumframework.com/python-intermediate/test-data-with-excel/

https://docs.python.org/zh-cn/3/library/unittest.html#test-cases

https://pynative.com/python-generate-random-string/

https://github.com/hamcrest/PyHamcrest

https://docs.python.org/zh-cn/3/library/functions.html?highlight=setattr#setattr

https://python3-cookbook.readthedocs.io/zh_CN/latest/preface.html#id7

**添加allure**
先运行下面的脚本生成报告
>1. behave -f allure_behave.formatter:AllureFormatter -o allure_result_folder ./features
 在运行下面的脚本可以查看报告
>2. allure serve allure_result_folder
