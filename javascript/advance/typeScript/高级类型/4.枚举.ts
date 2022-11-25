 
enum Str {
    A=1, B="b", C="C"
}
type strUnion = keyof typeof Str; // 'A' | 'B' | 'C'
type strValue = `${Str}` // 

function func(a: strValue) {
    return a;
}
func('cc')