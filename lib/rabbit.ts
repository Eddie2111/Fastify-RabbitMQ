import { Connection, Channel } from 'rabbitmq-client'; // Replace with actual import

class RabbitMQConnection {
  private static instance: RabbitMQConnection;
  private connection: Connection;
  private channel: Channel;

  private constructor(url: string) {
    this.connection = new Connection(url);

    this.connection.on('error', (err: Error) => {
      console.log('RabbitMQ connection error', err);
    });

    this.connection.on('connection', () => {
      console.log('Connection successfully established');
    });
  }

  public static async getInstance(url: string): Promise<RabbitMQConnection> {
    if (!RabbitMQConnection.instance) {
      RabbitMQConnection.instance = new RabbitMQConnection(url);
      await RabbitMQConnection.instance.acquireChannel();
    }
    return RabbitMQConnection.instance;
  }

  private async acquireChannel() {
    this.channel = await this.connection.acquire();

    this.channel.on('close', () => {
      console.log('Channel was closed');
    });

    // Declare the queue once the channel is acquired
    await this.channel.queueDeclare({ queue: 'message-queue' });

    // Enable publisher acknowledgments
    await this.channel.confirmSelect();
  }

  public async publishMessage(queue: string, message: any) {
    await this.channel.basicPublish({ routingKey: queue }, message);
    console.log(`Message sent to queue ${queue}:`, message);
  }

  public async getMessage(queue: string) {
    const msg = await this.channel.basicGet(queue);
    console.log('Received message:', msg);
    return msg;
  }

  public async deleteQueue(queue: string) {
    await this.channel.queueDelete(queue);
    console.log(`Queue ${queue} deleted`);
  }

  public async closeChannel() {
    await this.channel.close();
    console.log('Channel closed');
  }
}

export const rabbit = await RabbitMQConnection
  .getInstance('amqp://guest:guest@localhost:5672');
