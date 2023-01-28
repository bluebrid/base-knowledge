type MyPop<T extends any[]> = T extends [...infer Header, infer Last] ? [...Header] : [];
type DemoPop = MyPop<[1,2,3,4]>