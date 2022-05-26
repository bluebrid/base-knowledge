var MyQueue = function() {
    //准备两个栈
     this.stack1 = [];
     this.stack2 = [];
  };
  
  MyQueue.prototype.push = function(x) {//push的时候加入输入栈
     this.stack1.push(x);
  };
  
  MyQueue.prototype.pop = function() {
     const size = this.stack2.length;
     if(size) {//push的时候判断输出栈是否为空
         return this.stack2.pop();//不为空则输出栈出栈
     }
     while(this.stack1.length) {//输出栈为空，则把输入栈所有的元素加入输出栈
         this.stack2.push(this.stack1.pop());
     }
     return this.stack2.pop();
  };
  
  MyQueue.prototype.peek = function() {
     const x = this.pop();//查看队头的元素 复用pop方法，然后在让元素push进输出栈
     this.stack2.push(x);
     return x;
  };
  
  MyQueue.prototype.empty = function() {
     return !this.stack1.length && !this.stack2.length
  };