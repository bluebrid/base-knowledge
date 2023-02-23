// Remove the 'kind' property
type RemoveField<T, R extends keyof T> = {
  [K in keyof T as Exclude<K, R>]: T[K];
};

interface Circle {
  kind: "circle";
  radius: number;
  age: number;
}

type KindlessCircle = RemoveField<Circle, 'kind' | 'age'>;
//   type KindlessCircle = {
//       radius: number;
//   };
