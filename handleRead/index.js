const dynamoose = require("dynamoose");

const schema = new dynamoose.Schema({
  "id": String,
  "name": String,
  "phone": String
});

const friendModel = dynamoose.model('people', schema);

exports.handler = async (event) => {
  const response = { statusCode: null, body: null };
  
  if (event.pathParameters) {
    console.log('Path parameters:', event.pathParameters);
  } else {
    console.log('No path parameters');
  }
  
  try {
    let results = await friendModel.scan().exec();
    console.log(results)
    response.body = results;
    response.statusCode = 200;
  } catch (e) {
    response.body = { message: e.message }; 
    response.statusCode = 500;
  }
  
  return response;
};
