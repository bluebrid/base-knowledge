Feature: Dashboard
    Scenario: 验证邮箱登录页面
        Given 加载登录页面
        When 点击密码登录
        Then 输入帐号密码
        Then 点击登录按钮
        # Then 检查首页元素："<elements>"
        # Examples:
        #     | elements   |
        #     | frame-head |
        Then 点击已发送
        #Then 查看发件箱
        Then 点击写信按钮
        Then 编写邮件
        |address|title|content|
        |594774261@qq.com|Title1|Content1|
        |594774261@qq.com|Title2|Content2|
        |594774261@qq.com|Title3|Content3|
        |594774261@qq.com|Title4|Content4|
        #Then 检查发送结果
        #Then 查看发件箱
            
        