from behave import given, when, then
from framework.webapp import webapp


@given(u'加载登录页面')
def step_impl_load_website(context):
    webapp.load_website()


@when(u'I go to "{page}" page')
def step_impl_goto_page(context, page):
    print('======================',page)
    webapp.goto_page(page)


@then(u'检查元素："{component}"')
def step_impl_verify_component(context, component):
    webapp.verify_component_exists_by_id(component)
