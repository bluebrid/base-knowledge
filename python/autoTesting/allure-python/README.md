1. https://github.com/allure-framework/allure-python/blob/master/allure-behave/README.rst
2. pip install allure-behave
3. 安裝 scoop https://scoop.sh/ 
    3.1 powershell
    3.2 iex  (New-Object System.Net.WebClient).DownloadString('https://get.scoop.sh')
    3.3 scoop help
    3.4 scoop install allure , 安裝的路径C:\Users\Ivan_Fan.PRINCETON\scoop\apps
    3.5 设置环境变量C:\Users\Ivan_Fan.PRINCETON\scoop\apps\allure\2.13.0\bin
4. cd allure-behave
5. python setup.py install
6. behave -f allure_behave.formatter:AllureFormatter -o allure_result_folder ./features
7. allure serve allure_result_folder
