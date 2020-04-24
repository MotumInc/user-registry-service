import { handleUnaryCall, whereClause } from "./serviceHandler";
import { UserQuery, User, UserResponse } from "../protobuf-gen/user-registry_pb";

export default handleUnaryCall<UserQuery, UserResponse>(async (prisma, call) => {
    const user = await prisma.user.findOne({ where: whereClause(call.request) })
    const response = new UserResponse()

    if (user) {
        const { id, name, login, hash, tokenRevision } = user

        const responseUser = new User()
        responseUser.setId(String(id))
        responseUser.setName(name)
        responseUser.setLogin(login)
        responseUser.setHash(hash)
        responseUser.setTokenRevision(tokenRevision)

        response.setUser(responseUser)
    }

    return response
})