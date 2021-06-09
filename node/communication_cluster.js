var cluster = require('cluster')

var http = require('http')

if (cluster.isMaster) {
  var numCPUs = require('os').cpus().length

  var data = 0

  // 启动多个进程.

  for (var i = 0; i < numCPUs; i++) {
    //增加一个进程

    var worker_process = cluster.fork()
    console.log(worker_process)
    //侦听子进程的message事件

    worker_process.on('message', function (msg) {
      if (msg.cmd && msg.cmd == 'notifyRequest') {
        data++

        console.log('DATA VALUE : %d ', data)
      }
    })
  }
} else {
  process.send({ cmd: 'notifyRequest' })
}
