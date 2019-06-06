from django.db import models

# Create your models here.
 
 
 
class Person(models.Model):
    name = models.CharField(max_length=30)
    age = models.IntegerField()
    def __str__(self):
        return '{}'.format(self.name) # 在admin 管理平台显示记录的名称
    class Meta:
        verbose_name = '人员管理' # 在admin 管理平台显示的名称
        verbose_name_plural = '人员管理' # 复数的重命名
