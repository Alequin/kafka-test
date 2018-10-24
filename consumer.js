const Kafka = require("node-rdkafka");

console.log(Kafka.librdkafkaVersion);

// https://github.com/edenhill/librdkafka/blob/v0.11.5/CONFIGURATION.md
const consumerConfig = {
  "group.id": "kafka",
  "metadata.broker.list": "fh1-kafka01:9092"
};
const topicConfig = {};

function consumeMethod1() {
  var stream = Kafka.KafkaConsumer.createReadStream(
    consumerConfig,
    topicConfig,
    {
      topics: ["chips-test-topic"]
    }
  );

  stream.on("data", function(message) {
    console.log("Got message");
    console.log(message.value.toString("utf8"));
  });
}

function consumeMethod2() {
  var consumer = new Kafka.KafkaConsumer(consumerConfig, topicConfig);

  consumer.connect();

  consumer
    .on("ready", function() {
      consumer.subscribe(["chips-test-topic"]);

      // Consume from the librdtesting-01 topic. This is what determines
      // the mode we are running in. By not specifying a callback (or specifying
      // only a callback) we get messages as soon as they are available.
      consumer.consume();
    })
    .on("data", function(message) {
      // Output the actual message contents
      console.log(message.value.toString("utf8"));
    });
}

//consumeMethod1();
//consumeMethod2();
