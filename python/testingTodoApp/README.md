https://blog.csdn.net/u013314786/article/details/83216390

**添加allure**
先运行下面的脚本生成报告
>1. behave -f allure_behave.formatter:AllureFormatter -o allure_result_folder ./features
 在运行下面的脚本可以查看报告
>2. allure serve allure_result_folder