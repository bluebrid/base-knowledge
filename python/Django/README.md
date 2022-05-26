https://docs.djangoproject.com/zh-hans/2.2/intro/tutorial07/
https://code.ziqiangxuetang.com/django/django-admin.html

1. `pip install Django==2.2.2` 安装Django

2. 检查`Django` 是否安装成功, 现在命令行执行`python`:
```python
import django

django.VERSION
```
3. 退出`python` 命令行`exit()`

4. 查看`django` 所有的命令: `django-admin`

5. 创建django 项目`django-admin startproject djangoDemo`

6. 我们已经创建了一个django 的项目，现在我们可以尝试启动一个django的服务`python manage.py runserver`,
   启动后，我们可以运行: http://localhost:8000, 就可以看到我们简单界面，我们运行http://localhost:8000/admin, 可以启动一个后台管理平台

7. 我想要创建用户来登录管理平台，我们需要创建数据库，我们可以通过如下两个脚本创建:
`python manage.py makemigrations`, `python manage.py makemigrations`

8. 我们现在来创建一个超级管理员帐号， 来登录后台管理平台`python manage.py createsuperuser`, 帐号密码都是`admin`, 现在我们就可以用`admin` 登录管理平台了

9. 我们现在来创建一个`learn` 的`app` 应用,`python manage.py startapp learn`

10. 我们把我们新定义的app添加到setting.py中的`INSTALLED_APPS`中：

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'learn'
]
```
<font size=5 color=red>备注:</font>
这一步是干什么呢? 新建的 app 如果不加到 INSTALL_APPS 中的话, django 就不能自动找到app中的模板文件(app-name/templates/下的文件)和静态文件(app-name/static/中的文件) , 后面你会学习到它们分别用来干什么.

11. 定义视图函数(访问页面时的内容)
```python
# coding:utf-8
from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse

def index(request):
    return HttpResponse(u'欢迎光临，这是我的第一个Django 项目')
```

12. 我们现在已经定义了一个视图，但是我们怎么才能访问这个视图呢，我们现在修改下`urls.py` 文件

```python
from django.contrib import admin
from django.urls import path
from learn import views as learn_views #new
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', learn_views.index),  # new： 路由是通过正则表达式来匹配的
]
```
我们添加了两行代码，然后重新启动下服务`python manage.py runserver`, 直接访问`http://localhost:8000/`就看到了已经输出了： 欢迎光临，这是我的第一个Django 项目的主页

13. 我们现在想实现一个`/add?a=1&b=2` 页面输出结果是`1 + 2 = 3`的效果，

我们首先修改views.py文件：
```python
def add(request):
    a = request.GET.get('a')    
    b = request.GET.get('b')
    # a = 0 if a is None else a
    # b = 0 if b is None else b
    try: 
        a = int(a)
    except Exception:
        a = 0
        pass
    # finally:
    #     a = 0
    try: 
        b = int(b)
    except Exception:
        b = 0
        pass
    # finally:
    #     b = 0
     
    c = a + b
    return HttpResponse('{} + {} = {}'.format(a, b, c))

```
我们在修改`urls.py` 文件:
```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', learn_views.index),  # new
    path('add/', learn_views.add),
]
```
我们就可以访问`http://localhost:8000/add/?a=1&b=6` 会输出：1 + 6 = 7 

14. 我们上面已经可以通过URL直接访问了，通过HttpResponse 将结果输出到页面上了.
但是如果我们的页面是一个很负责的HTML, 这种方式是行不通的, 下面我们来了解下 `templates`,
<font size=5 color=red>默认配置下，Django 的模板系统会自动找到app下面的templates文件夹中的模板文件。</font>
所以我们先创建一个`templates`的文件夹, 并且创建两个html 页面: home.html, add.html

然后修改views.py
```python
# coding:utf-8
from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    # return HttpResponse(u'欢迎光临，这是我的第一个Django 项目的主页')
    content = '欢迎光临，这是我的第一个Django 项目的主页'
    return render(request, 'home.html', {
        'content': content
    })

def add(request):
    a = request.GET.get('a')    
    b = request.GET.get('b')
    # a = 0 if a is None else a
    # b = 0 if b is None else b
    try: 
        a = int(a)
    except Exception:
        a = 0
        pass
    # finally:
    #     a = 0
    try: 
        b = int(b)
    except Exception:
        b = 0
        pass
    # finally:
    #     b = 0
     
    result = a + b
    # return HttpResponse('{} + {} = {}'.format(a, b, c))
    return render(request, 'add.html', {
        'a': a,
        'b': b,
        'result': result
    })


```

我们就可以通过http://localhost:8000/ 或者http://localhost:8000/add/?a=1访问对应的html 页面了



