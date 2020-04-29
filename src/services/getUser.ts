import { handleUnaryCall } from "./serviceHandler";
import { UserQuery, User, UserResponse } from "../protobuf-gen/user-registry_pb";

export default handleUnaryCall<UserQuery, UserResponse>(async (prisma, call) => {
    const id = call.request.getId();
    const user = await prisma.user.findOne({ where: { id } })
    const response = new UserResponse()

    if (user) {
        const responseUser = new User()
        responseUser.setId(id)
        responseUser.setName(user.name)
        if (user.bio) responseUser.setBio(user.bio)
        if (user.avatar) responseUser.setAvatar(user.avatar)
        responseUser.setDistance(user.distance)
        responseUser.setPoints(user.points)
        responseUser.setSteps(user.steps)

        response.setUser(responseUser)
    }

    return response
})