import { $mobx, IDerivationState, TraceMode, clearObserving, createInstanceofPredicate, endBatch, getNextId, globalState, isCaughtException, isSpyEnabled, shouldCompute, spyReport, spyReportEnd, spyReportStart, startBatch, trace, trackDerivedFunction } from "../internal";
export class Reaction {
    constructor(name = "Reaction@" + getNextId(), onInvalidate, errorHandler) {
        this.name = name;
        this.onInvalidate = onInvalidate;
        this.errorHandler = errorHandler;
        this.observing = []; // nodes we are looking at. Our value depends on these nodes
        this.newObserving = [];
        this.dependenciesState = IDerivationState.NOT_TRACKING;
        this.diffValue = 0;
        this.runId = 0;
        this.unboundDepsCount = 0;
        this.__mapid = "#" + getNextId();
        this.isDisposed = false;
        this._isScheduled = false;
        this._isTrackPending = false;
        this._isRunning = false;
        this.isTracing = TraceMode.NONE;
    }
    onBecomeStale() {
        // 调用schedule 方法
        this.schedule();
    }
    schedule() {
        /**
         * 1. 在运行autorun 方法时会直接调用这个方法
         * 2. 在设置某个属性的值得时候，reportChanged -> onBecomeStale 也会调用这个方法
         * 3. 运行runReactions() 方法
         * 4. 在runReactions() 方法中会运行this.onInvalidate(); 
         * 5. `onInvalidate()`方法其实就是从autorun(fn)中执行时传递的第一个参数fn, 如:
         *  autorun((reaction) => {
         *      incomeLabel.innerText = `${bankUser.name} income is ${bankUser.income}`
         *  })
         * 6. 在第二点设置某个值得时候，从而实现了执行了autorun方法传递的第一个参数，达到了UI的实时改变
         */
        if (!this._isScheduled) {
            this._isScheduled = true;
            // 在全局变量globalState的pendingReactions添加this
            globalState.pendingReactions.push(this);
            /**
              let reactionScheduler = f => f();
                export function runReactions() {
                    if (globalState.inBatch > 0 || globalState.isRunningReactions)
                        return;
                    reactionScheduler(runReactionsHelper);
                }
             */
            runReactions();
        }
    }
    isScheduled() {
        return this._isScheduled;
    }
    /**
     * internal, use schedule() if you intend to kick off a reaction
     */
    runReaction() {
        if (!this.isDisposed) {
            startBatch();
            this._isScheduled = false;
            if (shouldCompute(this)) {
                this._isTrackPending = true;
                try {
                    /**
                     * 
                      function reactionRunner() {
                        view(reaction); // view 就是autorun方法里面的参数
                      }
                      autorun(() => {
                            console.log('账户存款:', bankUser.income);
                        });
                        reaction = new Reaction(name, function () {
                            this.track(reactionRunner);
                        }, opts.onError);

                      onInvalidate 就是上面的创建Reaction 对象的第二个参数
                     */
                    this.onInvalidate();
                    if (this._isTrackPending &&
                        isSpyEnabled() &&
                        process.env.NODE_ENV !== "production") {
                        // onInvalidate didn't trigger track right away..
                        spyReport({
                            name: this.name,
                            type: "scheduled-reaction"
                        });
                    }
                }
                catch (e) {
                    this.reportExceptionInDerivation(e);
                }
            }
            endBatch();
        }
    }
    track(fn) {
        startBatch();
        const notify = isSpyEnabled();
        let startTime;
        if (notify && process.env.NODE_ENV !== "production") {
            startTime = Date.now();
            spyReportStart({
                name: this.name,
                type: "reaction"
            });
        }
        this._isRunning = true;
        //.build.es6/core/derivation.js
        /**
         export function trackDerivedFunction(derivation, f, context) {
            changeDependenciesStateTo0(derivation);
            derivation.newObserving = new Array(derivation.observing.length + 100);
            derivation.unboundDepsCount = 0;
            derivation.runId = ++globalState.runId;
            // 这个地方globalState.trackingDerivation 还是一个原始值
            const prevTracking = globalState.trackingDerivation;
            // console.log(globalState)
            // 每次运行autorun 方法，首先都会清空trackingDerivation
            globalState.trackingDerivation = derivation; 
            let result;
            if (globalState.disableErrorBoundaries === true) {
                result = f.call(context);
            }
            else {
                try {
                    result = f.call(context);
                }
                catch (e) {
                    result = new CaughtException(e);
                }
            }
            globalState.trackingDerivation = prevTracking;
            bindDependencies(derivation);
            return result;
        }
         */
        // 会直接运行：  result = f.call(context);
        /**
            reaction = new Reaction(name, function () {
                this.track(reactionRunner);
            },
            function reactionRunner() {
                view(reaction);
            }
            autorun(() => {
                incomeLabel.innerText = `${bankUser.name} income is ${bankUser.income}`
            });
            fn 也就是上面的reactionRunner， 而view 也就是运行autorun 方法的第一个参数，
            就会运行: incomeLabel.innerText = `${bankUser.name} income is ${bankUser.income}`,
            上面脚本就会引用 bankUser对象的name 属性， 而bankUser:
            const bankUser = observable({
                name: 'Ivan Fan',
                income: 3,
                debit: 2
            });
            利用Proxy 已经对bankUser里面的所有的属性进行了拦截： .build.es6/types/dynamicobject.js
            const objectProxyTraps = {
                has(target, name) {
                    if (name === $mobx || name === "constructor" || name === mobxDidRunLazyInitializersSymbol)
                        return true;
                    const adm = getAdm(target);
                    if (adm.values.get(name))
                        return true;
                    if (typeof name === "string")
                        return adm.has(name);
                    return name in target;
                },
                get(target, name) {
                    if (name === $mobx || name === "constructor" || name === mobxDidRunLazyInitializersSymbol)
                        return target[name];
                    const adm = getAdm(target);
                    const observable = adm.values.get(name);
                    if (observable instanceof Atom) {
                        return observable.get();
                    }
                    if (typeof name === "string")
                        adm.has(name);
                    return target[name];
                },
                set(target, name, value) {
                    if (typeof name !== "string")
                        return false;
                    set(target, name, value);
                    return true;
                },
                deleteProperty(target, name) {
                    if (typeof name !== "string")
                        return false;
                    const adm = getAdm(target);
                    adm.remove(name);
                    return true;
                },
                ownKeys(target) {
                    const adm = getAdm(target);
                    adm.keysAtom.reportObserved();
                    return Reflect.ownKeys(target);
                },
                preventExtensions(target) {
                    fail(`Dynamic observable objects cannot be frozen`);
                    return false;
                }
            };
            export function createDynamicObservableObject(base) {
                const proxy = new Proxy(base, objectProxyTraps);
                base[$mobx].proxy = proxy;
                return proxy;
            }
            然后进入get 方法
         */
        //

        const result = trackDerivedFunction(this, fn, undefined);
        this._isRunning = false;
        this._isTrackPending = false;
        if (this.isDisposed) {
            // disposed during last run. Clean up everything that was bound after the dispose call.
            clearObserving(this);
        }
        if (isCaughtException(result))
            this.reportExceptionInDerivation(result.cause);
        if (notify && process.env.NODE_ENV !== "production") {
            spyReportEnd({
                time: Date.now() - startTime
            });
        }
        endBatch();
    }
    reportExceptionInDerivation(error) {
        if (this.errorHandler) {
            this.errorHandler(error, this);
            return;
        }
        if (globalState.disableErrorBoundaries)
            throw error;
        const message = `[mobx] Encountered an uncaught exception that was thrown by a reaction or observer component, in: '${this}`;
        /** If debugging brought you here, please, read the above message :-). Tnx! */
        if (isSpyEnabled()) {
            spyReport({
                type: "error",
                name: this.name,
                message,
                error: "" + error
            });
        }
        globalState.globalReactionErrorHandlers.forEach(f => f(error, this));
    }
    dispose() {
        if (!this.isDisposed) {
            this.isDisposed = true;
            if (!this._isRunning) {
                // if disposed while running, clean up later. Maybe not optimal, but rare case
                startBatch();
                clearObserving(this);
                endBatch();
            }
        }
    }
    getDisposer() {
        const r = this.dispose.bind(this);
        r[$mobx] = this;
        return r;
    }
    toString() {
        return `Reaction[${this.name}]`;
    }
    trace(enterBreakPoint = false) {
        trace(this, enterBreakPoint);
    }
}
export function onReactionError(handler) {
    globalState.globalReactionErrorHandlers.push(handler);
    return () => {
        const idx = globalState.globalReactionErrorHandlers.indexOf(handler);
        if (idx >= 0)
            globalState.globalReactionErrorHandlers.splice(idx, 1);
    };
}
/**
 * Magic number alert!
 * Defines within how many times a reaction is allowed to re-trigger itself
 * until it is assumed that this is gonna be a never ending loop...
 */
const MAX_REACTION_ITERATIONS = 100;
let reactionScheduler = f => f();
export function runReactions() {
    if (globalState.inBatch > 0 || globalState.isRunningReactions)
        return;
    reactionScheduler(runReactionsHelper);
}
function runReactionsHelper() {
    globalState.isRunningReactions = true;
    const allReactions = globalState.pendingReactions;
    let iterations = 0;   
    while (allReactions.length > 0) {
        if (++iterations === MAX_REACTION_ITERATIONS) {
            console.error(`Reaction doesn't converge to a stable state after ${MAX_REACTION_ITERATIONS} iterations.` +
                ` Probably there is a cycle in the reactive function: ${allReactions[0]}`);
            allReactions.splice(0); // clear reactions
        }
        let remainingReactions = allReactions.splice(0);
        for (let i = 0, l = remainingReactions.length; i < l; i++) {
            // 运行Reaction对象的runReaction方法
            remainingReactions[i].runReaction();
        }
            
    }
    globalState.isRunningReactions = false;
}
export const isReaction = createInstanceofPredicate("Reaction", Reaction);
export function setReactionScheduler(fn) {
    const baseScheduler = reactionScheduler;
    reactionScheduler = f => fn(() => baseScheduler(f));
}
