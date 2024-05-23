const dynamoose = require("dynamoose");

const schema = new dynamoose.Schema({
  "id": String,
  "name": String,
  "phone": String
});

const friendModel = dynamoose.model('people', schema);

exports.handler = async (event) => {
  const response = { statusCode: null, body: null };
  
  // Check if path parameters contain the record ID
  if (!event.pathParameters || !event.pathParameters.id) {
    response.statusCode = 400;
    response.body = { message: "Missing path parameter: id" };
    return response;
  }

  const id = event.pathParameters.id;

  // Check if request body contains the updated data
  if (!event.body) {
    response.statusCode = 400;
    response.body = { message: "Missing request body" };
    return response;
  }

  const updatedData = JSON.parse(event.body);

  try {
    // Update the record in DynamoDB
    await friendModel.update({ id }, updatedData);
    response.statusCode = 200;
    response.body = { message: "Record updated successfully" };
  } catch (e) {
    response.statusCode = 500;
    response.body = { message: e.message };
  }
  
  return response;
};
