// 构建消费者
const amqp = require('amqplib');
// 可以参考amqplib 下面的examples
async function consumer() {
    // 1. 创建链接对象
    const connection = await amqp.connect('amqp://localhost:5672');

    // 2. 获取通道
    const channel = await connection.createChannel();

    // 3. 声明参数
    const queueName = 'helloKoalaQueue';
  
    // 4. 声明队列，交换机默认为 AMQP default
    await channel.assertQueue(queueName,  {durable: false});

    // 5. 消费
    await channel.consume(queueName, msg => {
        console.log('Consumer：', msg.content.toString());
        channel.ack(msg);
    }, {noAck: false}); // noAck 需要设置为false, 不然可能会报406错误
}

consumer();
