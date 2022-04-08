#https://www.jianshu.com/p/3857f2c3a8d4
Feature: Dashboard # Feature是所有测试的开头。后面跟一段描述性的文字，表明这个测试文件是干什么的。
    Scenario: 验证邮箱登录页面 # Example和Scenario是一对同义词，是一个具体的测试case，包含了多个step。一般情况下，都是由Given（给定一个初始条件），When（发生了什么），Then（结果是什么）组成的。
        # step是cucubmer的最小单元，每个step是由Given, When, Then, And, 或者But开头的。如果关键词后面的内容是完全一样的话，那么cucumber会认为这两句话是重复的，哪怕前面的关键词不一样，如
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
            
        