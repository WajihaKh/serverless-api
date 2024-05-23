const dynamoose = require("dynamoose");

const schema = new dynamoose.Schema({
  "id": String,
  "name": String,
  "phone": String
});

const friendModel = dynamoose.model('people', schema);

exports.handler = async (event) => {
  const response = { statusCode: null, body: null };
  
  if (!event.pathParameters || !event.pathParameters.id) {
    response.statusCode = 400;
    response.body = { message: "Missing path parameter: id" };
    return response;
  }

  const id = event.pathParameters.id;

  try {
    await friendModel.delete({ id });
    response.statusCode = 200;
    response.body = { message: "Record deleted successfully" };
  } catch (e) {
    response.statusCode = 500;
    response.body = { message: e.message };
  }
  
  return response;
};
