const {
    isMainThread,
    parentPort,
    workerData,
    threadId,
    MessageChannel,
    MessagePort,
    Worker
  } = require('worker_threads');
  
  const cpus = require('os').cpus().length
  console.log('start:')
  function mainThread() {
    for (let i = 0; i < cpus; i++) {
      const worker = new Worker(__filename, { workerData: i });
      worker.on('exit', code => { console.log(`main: worker stopped with exit code ${code}`); });
      worker.on('message', msg => {
        console.log(`main: receive ${msg}`);
        worker.postMessage(msg + 1 + '- from main thread');
      });
    }
  }
  
  function workerThread() {
    console.log(`worker: workerDate ${workerData}`);
    parentPort.on('message', msg => {
      console.log(`worker: receive ${msg}`);
    }),
    parentPort.postMessage(workerData + "- from worker thread");
  }
  
  if (isMainThread) {
      console.log('-------------------------')
    mainThread();
  } else {
      console.log('*****************************')
    workerThread();
  }
 