type MyOptional<T> = {
    [K in keyof T]?: T[K]
  }