import { from } from '../esm2015';
import { scan } from '../esm2015/operators'
// import { async } from '../esm2015/internal/scheduler/async';

export default function fromtDemo() {
    var array = [10, 20, 30];
    var result = from(array);
    result = result.pipe(scan((init, next) => init + next, 100))
    result.subscribe(x => console.log(x));
}
