import { handleUnaryCall } from "./serviceHandler";
import UserModel from "../models/User";
import { UserQuery, User } from "../protobuf-gen/user-registry_pb";

const getUser = handleUnaryCall<UserQuery, User>(async call => {
    const { id } = call.request.toObject()
    const user = await UserModel.findById(id)
    if (!user) throw Error("Cannot find specified user")
    const { name, login, hash, tokenRevision } = user.toObject()

    const responseUser = new User()
    responseUser.setId(id)
    responseUser.setName(name)
    responseUser.setLogin(login)
    responseUser.setHash(hash)
    responseUser.setTokenrevision(tokenRevision)

    return responseUser
})

export default getUser