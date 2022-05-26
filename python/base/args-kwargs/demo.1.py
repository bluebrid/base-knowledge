def test_var_args(f_arg, *argv):
    print("first normal arg:", f_arg)
    for arg in argv:
        print("another arg through *argv:", arg)
test_var_args('yasoob', 'python', 'eggs', 'test')

class linear:

    def __init__(self, a, b):
        self.a, self.b = a, b

    # def __call__(self, x):
    #     return self.a * x + self.b
taxes = linear(0.3, 2)
print(taxes(1))