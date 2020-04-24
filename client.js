const grpc = require("grpc")
const messages = require("./src/protobuf-gen/user-registry_pb")
const services = require("./src/protobuf-gen/user-registry_grpc_pb")

const client = new services.UserRegistryClient("localhost:5505", grpc.credentials.createInsecure())
const request = new messages.UserQuery()
request.setId("2")
client.getUser(request, (err, res) => {
    if (err) console.error(err)
    else console.log(res.toObject())
})