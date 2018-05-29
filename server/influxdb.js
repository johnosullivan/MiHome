const Influx = require('influxdb-nodejs');
const client = new Influx('http://127.0.0.1:8086/mydb');

const fieldSchema = {
  use: 'i',
  bytes: 'i',
  url: 's',
};

client.schema('sensor_points', fieldSchema, {
  stripUnknown: true,
});
client.write('sensor_points')
  .field({
    use: 100,
    bytes: 2000,
    url: '',
  })
  .then(() => {
    console.info('write point success')
  })
  .catch(console.error);


  client.query('sensor_points').then((data) => {
      console.log(data.results[0].series[0]);
  }).catch(console.error);
