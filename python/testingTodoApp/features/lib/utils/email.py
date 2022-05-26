import smtplib,os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import base64
class SendMail(object):
    def __init__(self,username,passwd,recv,title,content,
                 file=None,ssl=False,
                 email_host='smtp.qq.com',port=25,ssl_port=465):
        '''
        :param username: 用户名
        :param passwd: 密码
        :param recv: 收件人，多个要传list ['a@qq.com','b@qq.com]
        :param title: 邮件标题
        :param content: 邮件正文
        :param file: 附件路径，如果不在当前目录下，要写绝对路径，默认没有附件
        :param ssl: 是否安全链接，默认为普通
        :param email_host: smtp服务器地址，默认为163服务器
        :param port: 非安全链接端口，默认为25
        :param ssl_port: 安全链接端口，默认为465
        '''
        self.username = username #用户名
        self.passwd = passwd #密码
        self.recv = recv #收件人，多个要传list ['a@qq.com','b@qq.com]
        self.title = title #邮件标题
        self.content = content #邮件正文
        self.file = file #附件路径，如果不在当前目录下，要写绝对路径
        self.email_host = email_host #smtp服务器地址
        self.port = port #普通端口
        self.ssl = ssl #是否安全链接
        self.ssl_port = ssl_port #安全链接端口
    def send_mail(self):
        msg = MIMEMultipart()
        #发送内容的对象
        if self.file:#处理附件的
            file_name = os.path.split(self.file)[-1]#只取文件名，不取路径
            try:
                f = open(self.file, 'rb').read()
            except Exception as e:
                raise Exception('附件打不开！！！！')
            else:
                att = MIMEText(f,"base64", "utf-8")
                att["Content-Type"] = 'application/octet-stream'
                #base64.b64encode(file_name.encode()).decode()
                new_file_name='=?utf-8?b?' + base64.b64encode(file_name.encode()).decode() + '?='
                #这里是处理文件名为中文名的，必须这么写
                att["Content-Disposition"] = 'attachment; filename="%s"'%(new_file_name)
                msg.attach(att)
        msg.attach(MIMEText(self.content))#邮件正文的内容
        msg['Subject'] = self.title  # 邮件主题
        msg['From'] = self.username  # 发送者账号
        msg['To'] = ','.join(self.recv)  # 接收者账号列表
        if self.ssl:
            self.smtp = smtplib.SMTP_SSL(self.email_host,port=self.ssl_port)
        else:
            self.smtp = smtplib.SMTP(self.email_host,port=self.port)
        #发送邮件服务器的对象
        self.smtp.login(self.username,self.passwd)
        try:
            self.smtp.sendmail(self.username,self.recv,msg.as_string())
            pass
        except Exception as e:
            print('出错了。。',e)
        else:
            print('发送成功！')
        self.smtp.quit()
        
if __name__ == '__main__':
    m = SendMail(
        username='test@qq.com',
        passwd='xxxxxx',
        recv=['test001@163.com','test002@qq.com'],
        title='发送邮件20180205',
        content='测试发送邮件，qq发件，接收方一个是163邮箱，另一个是qq邮箱。20180205',
        file=r'E:\\testpy\\python-mpp\\day7\\作业\\data\\mpp.xls',
        ssl=True,
    )
    m.send_mail()