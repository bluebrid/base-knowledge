import "reflect-metadata";

class Point {
  constructor(public x: number, public y: number) {}
}

class Line {
  private _start: Point;
  private _end: Point;

  @validate
  set start(value: Point) {
    this._start = value;
  }

  get start() {
    return this._start;
  }

  @validate
  set end(value: Point) {
    this._end = value;
  }

  get end() {
    return this._end;
  }
}

function validate<T>(
  target: any,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<T>
) {
  let set = descriptor.set!;

  descriptor.set = function (value: T) {
    let type = Reflect.getMetadata("design:type", target, propertyKey);

    if (!(value instanceof type)) {
      throw new TypeError(
        `Invalid type, got ${typeof value} not ${type.name}.`
      );
    }

    set.call(this, value);
  };
}

// const line = new Line();
// line.start = new Point(0, 0);

// // @ts-ignore
// line.end = {
//     x:1,
//     y:1
// }

// Fails at runtime with:
// > Invalid type, got object not Point

class Line1 {
    private _start: Point;
    private _end: Point;
    @validate
    @Reflect.metadata("design:type1", Point)
    set start(value: Point) {
      this._start = value;
    }
    get start() {
      return this._start;
    }
    @validate
    @Reflect.metadata("design:type1", Point)
    set end(value: Point) {
      this._end = value;
    }
    get end() {
      return this._end;
    }
  }
  const line1 = new Line1();
  line1.start = new Point(0, 0);
  
  // @ts-ignore
  line1.end = {
      x:1,
      y:1
  }