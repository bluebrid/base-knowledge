type arr1Demo = ['a', 'b', 'c']
type arr2Demo= [3, 2, 1]
type MyFirstDemo<T extends any[]> = T extends [infer Header , ... infer rest] ? Header : never
type head1Demo = MyFirstDemo<arr1Demo> // expected to be 'a'
type head2Demo = MyFirstDemo<arr2Demo> // expected to be 3
type head3Demo = MyFirstDemo<[]> // expected to never 