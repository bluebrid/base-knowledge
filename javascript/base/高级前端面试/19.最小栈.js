class MinStack {
    _minVal = -Infinity
    constructor() {
        this.stack = []
        
    }
    push(value) {
        this.stack.push(value)
        if (this.stack.length === 1) {
            this._minVal = value
        } else {
            this._minVal = this._minVal > value ? value : this._minVal
        }
    }
    pop() {
        this.stack.shift()
    }
    top() {
        return this.stack[this.stack.length -1 ]
    }
    getMin() {
        return this._minVal
    }
}

const stack = new MinStack();
stack.push(-2)
stack.push(0)
stack.push(-3)
console.log(stack.getMin())
stack.pop()
console.log(stack.top())
console.log(stack.getMin())