import { handleUnaryCall } from "./serviceHandler"
import { AddUserRequest, User } from "../protobuf-gen/user-registry_pb"

export default handleUnaryCall<AddUserRequest, User>(async (prisma, call) => {
    const user = call.request.toObject()
    const dbUser = await prisma.user.create({ data: user })
    const { id, name, hash, login } = dbUser

    const res = new User()
    res.setId(String(id))
    res.setName(name)
    res.setLogin(login)
    res.setHash(hash)
    res.setTokenRevision(0)
    return res
})

