# coding:utf-8
from django.shortcuts import render
from django.http import HttpResponse
from .models import Person

def index(request):
    # return HttpResponse(u'欢迎光临，这是我的第一个Django 项目的主页')
    content = '欢迎光临，这是我的第一个Django 项目的主页'
    persons = Person.objects.all()
    return render(request, 'home.html', {
        'persons': persons
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
