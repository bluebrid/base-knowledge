type MyAwaited<T extends Promise<unknown> >= 
T extends Promise< infer P> ? 
    (P extends Promise< unknown> ? MyAwaited< P> : P )
    : never