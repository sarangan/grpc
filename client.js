const grpc = require('grpc');
const greets = require('../server/protos/greet_pb');
const service = require('../server/protos/greet_grpc_pb');

// const services = require('../server/protos/dummy_grpc_pb');


(function main(){

    console.log("client connected")
    // const client = new services.DummyServiceClient("localhost:50051", grpc.credentials.createInsecure());
    const client = new service.GreetServiceClient(
        "localhost:50051",
        grpc.credentials.createInsecure()
    );
    
    const request = new greets.GreetRequest();

    const greeting = new greets.Greeting(); // protobuf
    greeting.setFirstName("John");
    greeting.setLastName("Doe");

    //set the greeting like protobuf request
    request.setGreeting(greeting);

    //calling the function in server index.js greet(call, callback)
    client.greet(request, (error, response) => {
        if(error){
            console.error("Error ", error);
        }
        console.log("Greet response ", response.getResult());
    });

})();
