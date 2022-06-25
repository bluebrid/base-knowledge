var a = {
    valueOf: function() {
        if (this.val === undefined) {
            this.val = 1
            return 1
        } else {
             this.val ++
             return this.val 
        }
    }
}

if (a == 1 && a ==2 && a == 3) {
    console.log(1)
}