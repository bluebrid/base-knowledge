## 启动Django 服务（manage.py）

我们在开发时启动一个Django 的服务直接运行`python manage.py runserver`就起来了一个服务。

我们来分析下这个命令，其实就是一个很简单的用`python` 运行了`manage.py` 文件， 

而`manage.py`就是我们在执行`django-admin startproject djangoDemo` 创建一个项目的时候自动生成的.

我们可以查看下`manage.py`代码：
```python
#!/usr/bin/env python
import os
import sys

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "DjangoBlog.settings")
    try:
        from django.core.management import execute_from_command_line
    except ImportError:
        # The above import may fail for some other reason. Ensure that the
        # issue is really that Django is missing to avoid masking other
        # exceptions on Python 2.
        try:
            import django
        except ImportError:
            raise ImportError(
                "Couldn't import Django. Are you sure it's installed and "
                "available on your PYTHONPATH environment variable? Did you "
                "forget to activate a virtual environment?"
            )
        raise
    execute_from_command_line(sys.argv)

```

1. 上面的代码就是`python` 执行的入口文件 首先设置了一个环境变量`DJANGO_SETTINGS_MODULE` 为`DjangoBlog.settings`
2. 导入了`django` 的`execute_from_command_line` 方法
3. 执行了`execute_from_command_line` 方法， 并且传入了执行命名后面的参数(`sys.argv`)，如：
`['D:\\private\\bluebrid\\base-knowledge\\python\\Django\\Demos\\DjangoBlog\\manage.py', 'runserver', '--noreload', '--nothreading']`

这些参数都是我们在执行命令`python manage.py runserver`时配置的，但是我们发现我们上面看到的值好像多了两个`'--noreload', '--nothreading'`,

其实是因为我用VSCode 调试运行，对应的launch.json 文件如下:
```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Python: Django Blog",
            "type": "python",
            "request": "launch",
            "program": "${workspaceFolder}\\manage.py",
            "args": [
                "runserver",
                "--noreload",
                "--nothreading"
            ],
            "django": true,
            "console": "integratedTerminal"
        }
    ]
}
```
`args`就是对应的参数.
我们其实可以查看下`runserver` 的具体是用方式`python manage.py help runserver`, [Django常用命令介绍，新手建议阅读](https://www.django.cn/article/show-26.html)

其实我们可以运行`python manage.py runserver dev` Or `python manage.py runserve pro`,
然后在在manage.py 中通过`os.environ.setdefault("ENV_MODE", sys.argv[2])`将我们的运行环境`dev, pro` 保存在环境变量中。

然后我们可以将`setting.py` 中获取`ENV_MODE`, 可以将生产环境和开发环境中的不同的配置放在不同的文件中，
然后根据`ENV_MODE` 来加载不同的配置

## __init__.py

我们通过命令行`django-admin startproject djangoDemo`进行创建项目, 会在对应的文件夹`djangoDemo` 创建一个`__init__.py` 文件，

这是一个空文件， 只是告诉Python 该目录是一个`Python` 包， 但是我们可以在这个文件做一些初始化的工作，比如说创建mysql的连接，如:
```python
import pymysql
pymysql.install_as_MySQLdb()
````

## 文件说明
1. `wsgi.py`: 一个 WSGI 兼容的 Web 服务器的入口，以便运行你的项目。
2. `settings.py`: 该 Django 项目的设置/配置。
这里面的配置可以这样使用：
```python
from django.conf import settings
settings.BAIDU_NOTIFY_URL
```
`BAIDU_NOTIFY_URL`就是其中的一个配置。

3. `urls.py`: 该 Django 项目的 URL 声明; 一份由 Django 驱动的网站"目录"。
4. `__init__.py`: 一个空文件，告诉 Python 该目录是一个 Python 包。
5. `manage.py`: 一个实用的命令行工具，可让你以各种方式与该 Django 项目进行交互。
