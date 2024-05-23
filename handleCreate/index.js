const dynamoose = require("dynamoose");
const uuid = require("uuid").v4;


const schema = new dynamoose.Schema({
  "id": String,
  "name": String,
  "phone": String
});

const friendModel = dynamoose.model('people', schema);

exports.handler = async (event) => {
  let parsedBody = event
  parsedBody.id = uuid()
  console.log(parsedBody);


  const response = {statusCode: null, body: null};
  
    try{
      
      let newFriend = await friendModel.create(parsedBody);
      response.body = newFriend;
      response.statusCode = 200
      
    }catch(e){
        response.body = e.message;
        response.statusCode = 500;
    }
    return response;
  };
  