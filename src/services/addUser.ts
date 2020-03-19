import { handleUnaryCall } from "./serviceHandler"
import UserModel from "../models/User"
import { AddUserRequest, User } from "../protobuf-gen/user-registry_pb"

const addUser = handleUnaryCall<AddUserRequest, User>(async call => {
    const user = call.request.toObject()
    const dbUser = new UserModel(user)
    await dbUser.save()
    const { id, name, hash, login } = dbUser.toObject()

    const res = new User()
    res.setId(id)
    res.setName(name)
    res.setLogin(login)
    res.setHash(hash)
    res.setTokenrevision(0)
    return res
})

export default addUser
