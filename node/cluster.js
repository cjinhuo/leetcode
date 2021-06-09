var cluster = require('cluster')

var data = 0 //这里定义数据不会被所有进程共享，各个进程有各自的内存区域

if (cluster.isMaster) {
  //主进程
  let numCPUs = require('os').cpus().length
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
  data++
  // 这边会打印 1
  console.log('DATA VALUE in MainProcess: %d ', data)
} else {
  //子进程,会被调用numCPUs次
  data++
  // 这边也会打印1 所以说明data不会共享
  console.log('DATA VALUE in ChildProcess %d: %d ' + cluster.worker.id, data)
}
