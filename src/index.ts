import { Server, handleUnaryCall, ServerCredentials } from "grpc"

import { UserQuerry, UserResponse, User } from "./protobuf-gen/user-registry_pb"
import { UserRegistryService } from "./protobuf-gen/user-registry_grpc_pb"

const getUser: handleUnaryCall<UserQuerry, UserResponse> = (call, callback) => {
    const { id } = call.request.toObject()
    const user = new User()
    user.setId(id)
    user.setName("John")
    const response = new UserResponse()
    response.setUser(user)
    callback(null, response)
}

const server = new Server()
server.addService(UserRegistryService, { getUser })
server.bind("0.0.0.0:5505", ServerCredentials.createInsecure())
server.start()
