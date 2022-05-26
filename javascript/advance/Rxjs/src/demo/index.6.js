import { Subject } from '../esm2015/internal/Subject'

export default function subjectDemo() {

  let subject = new Subject()
  subject.subscribe({
      next: v => console.log('observerA:' + v)
  })
  subject.subscribe({
      next: v => console.log('observerB:' + v)
  })
  subject.next(1)
  subject.next(2)
}
