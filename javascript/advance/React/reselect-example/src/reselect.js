function defaultEqualityCheck(a, b) {
    return a === b
}

function areArgumentsShallowlyEqual(equalityCheck, prev, next) {
    if (prev === null || next === null || prev.length !== next.length) {
        return false
    }

    // Do this in a for loop (and not a `forEach` or an `every`) so we can determine equality as fast as possible.
    const length = prev.length
    for (let i = 0; i < length; i++) {
        if (!equalityCheck(prev[i], next[i])) {
            return false
        }
    }

    return true
}

export function defaultMemoize(func, equalityCheck = defaultEqualityCheck) {
    let lastArgs = null
    let lastResult = null
    // we reference arguments instead of spreading them for performance reasons
    return function () {
        if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {
            // apply arguments instead of spreading for performance.
            lastResult = func.apply(null, arguments)
        }
        // 将对应的参数保存起来，下次计算的时候，判断当前参数和上一次的参数是否相等，如果相等则直接返回上一次的计算结果，否则重新计算对应的计算结果
        lastArgs = arguments
        return lastResult
    }
}

function getDependencies(funcs) {
    const dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs

    if (!dependencies.every(dep => typeof dep === 'function')) {
        const dependencyTypes = dependencies.map(
            dep => typeof dep
        ).join(', ')
        throw new Error(
            'Selector creators expect all input-selectors to be functions, ' +
            `instead received the following types: [${dependencyTypes}]`
        )
    }

    return dependencies
}

export function createSelectorCreator(memoize, ...memoizeOptions) {
    return (...funcs) => {
        let recomputations = 0
        const resultFunc = funcs.pop()
        const dependencies = getDependencies(funcs)

        const memoizedResultFunc = memoize(
            function () {
                recomputations++
                // apply arguments instead of spreading for performance.
                return resultFunc.apply(null, arguments)
            },
            ...memoizeOptions
        )

        // If a selector is called with the exact same arguments we don't need to traverse our dependencies again.
        const selector = memoize(function () {
            /**
             * createSelector 就是对应的selector,
             * 执行createSelector 就是运行memoize, subtotalSelectorValue.innerText = subtotalSelector(exampleState)， 传递的exampleState就是arguments
             * const subtotalSelector = createSelector(
                    shopItemsSelector,
                    items => items.reduce((acc, item) => acc + item.value, 0)
                )
             */
            const params = []
            const length = dependencies.length

            for (let i = 0; i < length; i++) {
                // apply arguments instead of spreading and mutate a local list of params for performance.
                // 执行每一个dependenice， 传递的参数arguments都是 subtotalSelectorValue.innerText = subtotalSelector(exampleState)，也就是对应的exampleState
                // 并且将每一个dependience返回的结果作为参数params保存在params数组中
                params.push(dependencies[i].apply(null, arguments))
            }

            // apply arguments instead of spreading for performance.
            // 将dependices中每一个函数返回的结果作为参数， 执行memoizedResultFunc
            return memoizedResultFunc.apply(null, params)
        })

        selector.resultFunc = resultFunc
        selector.dependencies = dependencies
        selector.recomputations = () => recomputations
        selector.resetRecomputations = () => recomputations = 0
        /**
         * // selector 就是用memeory 封装的一个新的函数， 并且其实一个闭包，能引用上一次的参数lastArgs和上一次的计算结果lastResult
            export function defaultMemoize(func, equalityCheck = defaultEqualityCheck) {
                let lastArgs = null
                let lastResult = null
                // we reference arguments instead of spreading them for performance reasons
                return function () {
                    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {
                        // apply arguments instead of spreading for performance.
                        lastResult = func.apply(null, arguments)
                    }
                    // 将对应的参数保存起来，下次计算的时候，判断当前参数和上一次的参数是否相等，如果相等则直接返回上一次的计算结果，否则重新计算对应的计算结果
                    lastArgs = arguments
                    return lastResult
                }
            }
         */
        return selector
    }
}

export const createSelector = /* #__PURE__ */ createSelectorCreator(defaultMemoize)

export function createStructuredSelector(selectors, selectorCreator = createSelector) {
    if (typeof selectors !== 'object') {
        throw new Error(
            'createStructuredSelector expects first argument to be an object ' +
            `where each property is a selector, instead received a ${typeof selectors}`
        )
    }
    const objectKeys = Object.keys(selectors)
    return selectorCreator(
        objectKeys.map(key => selectors[key]),
        (...values) => {
            return values.reduce((composition, value, index) => {
                composition[objectKeys[index]] = value
                return composition
            }, {})
        }
    )
}