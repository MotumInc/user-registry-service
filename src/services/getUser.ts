import { handleUnaryCall } from "./serviceHandler";
import UserModel from "../models/User";
import { UserQuery, UserResponse, User } from "../protobuf-gen/user-registry_pb";

const getUser = handleUnaryCall<UserQuery, UserResponse>(async call => {
    const { id } = call.request.toObject()
    const user = await UserModel.findById(id)
    if (!user) throw Error("Cannot find specified user")
    const { name } = user.toObject()

    const responseUser = new User()
    responseUser.setId(id)
    responseUser.setName(name)

    const response = new UserResponse()
    response.setUser(responseUser)
    return response
})

export default getUser