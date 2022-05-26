const Validator = function () {
    this.cache = []
    this.strategies = {
        isNonEmpty: (value) => {
            return /^\s*$/.test(value)
        },
        minLength: (value, opts) => {
            let { length } = opts
            return !value.replace(/^\s*|$\s*/, '').length < length
        },
        isMobile: (value) => {
            return /(^1[3|5|8][0-9]{9}$)/.test(value)
        }
    }
}

Validator.prototype.add = function (options) {
    const { el, rule, errorMsg, opts } = options
    this.cache.push({
        el, rule, errorMsg, opts
    })
}

Validator.prototype.start = function () {
    let flag = true;
    this.cache.forEach(cache => {
        let opts = cache.opts || {}
        if (this.strategies[cache.rule](cache.el.value, opts)) {
            flag = false;
            cache.el.parentElement.classList.add('validata-fail')
            cache.el.parentElement.setAttribute('data-errorMsg', cache.errorMsg)
        } else {
            cache.el.parentElement.classList.remove('validata-fail')
            cache.el.parentElement.removeAttribute('data-errorMsg', cache.errorMsg)
        }
    })
    return flag;
}

const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let validator = new Validator()
    validator.add({
        el: registerForm.userName,
        rule: 'isNonEmpty',
        errorMsg: '用户名不能为空'
    })
    validator.add({
        el: registerForm.password,
        rule: 'minLength',
        errorMsg: '密码长度不能少于 6位',
        opts: {
            length: 6
        }
    })
    validator.add({
        el: registerForm.phoneNumber,
        rule: 'isMobile',
        errorMsg: '手机号码格式不正确'
    })
    let result = validator.start()
    if (!result) {
        e.preventDefault()
    }
})
