<<<<<<< HEAD
function createApp() {
  return {
    use(fn) { },
    run() { },
  }
}

const app = createApp();
app.use((next) => {
  setTimeout(function () {
    next();
  })
  console.log(new Date(), '1');
})

app.use((next) => {
  console.log(new Date(), '2');
  next();
})

app.use((next) => {
  console.log(new Date(), '3');
  next();
})

=======
function createApp() {
  return {
    use(fn) { },
    run() { },
  }
}

const app = createApp();
app.use((next) => {
  setTimeout(function () {
    next();
  })
  console.log(new Date(), '1');
})

app.use((next) => {
  console.log(new Date(), '2');
  next();
})

app.use((next) => {
  console.log(new Date(), '3');
  next();
})

>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
app.run();