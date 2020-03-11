const grpc = require("grpc")
const messages = require("./src/protobuf-gen/user-registry_pb")
const services = require("./src/protobuf-gen/user-registry_grpc_pb")

const client = new services.UserRegistryClient("localhost:5505", grpc.credentials.createInsecure())
const request = new messages.UserQuerry()
request.setId("idddd")
client.getUser(request, console.log)