const grpc = require("grpc")
const messages = require("./src/protobuf-gen/user-registry_pb")
const services = require("./src/protobuf-gen/user-registry_grpc_pb")

const client = new services.UserRegistryClient("localhost:5505", grpc.credentials.createInsecure())
const request = new messages.UserQuery()
request.setId("5e6bf91dfbc420001deeea2d")
client.getUser(request, console.log)