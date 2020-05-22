const amqp = require('amqplib');

async function producer() {
    // 创建链接对象
    const connection = await amqp.connect('amqp://localhost:5672');

    // 获取通道
    const channel = await connection.createChannel();

    // 声明参数
    const exchangeName = 'topic_koala_exchange';
    const routingKey1 = 'topic_routingKey.test1';
    const routingKey2 = 'topic_routingKey.test2';
    const routingKey3 = 'topic_routingKey.test3.1';
    const routingKey4 = 'topic_routingKey2.test4';
    const routingKey5 = 'topic_routingKey2.test5.1';
    const msg = 'hello koala';

    // 交换机
    await channel.assertExchange(exchangeName, 'topic', {
        durable: true,
    });

    await channel.assertQueue(routingKey1, {durable: false});
    await channel.assertQueue(routingKey2, {durable: false});
    await channel.assertQueue(routingKey3, {durable: false});
    await channel.assertQueue(routingKey4, {durable: false});
    await channel.assertQueue(routingKey5, {durable: false});

    // 发送消息
    await channel.sendToQueue( routingKey1, Buffer.from(msg + routingKey1));
    await channel.sendToQueue( routingKey2, Buffer.from(msg + routingKey2));
    await channel.sendToQueue( routingKey3, Buffer.from(msg + routingKey3));
    await channel.sendToQueue( routingKey4, Buffer.from(msg + routingKey4));
    await channel.sendToQueue( routingKey5, Buffer.from(msg + routingKey5));

    // 关闭链接
    await channel.close();
    await connection.close();
}

producer();