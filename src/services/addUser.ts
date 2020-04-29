import { handleUnaryCall } from "./serviceHandler"
import { AddUserRequest, User } from "../protobuf-gen/user-registry_pb"

export default handleUnaryCall<AddUserRequest, User>(async (prisma, { request }) => {
    const user = await prisma.user.create({
        data: {
            id: request.getId(),
            name: request.getName(),
            usingMetric: request.getUsingMetric(),
            avatar: request.hasAvatarField() ? request.getAvatarField() : undefined,
            bio: request.hasBioField() ? request.getBioField() : undefined
        }
    })

    const res = new User()
    res.setId(user.id)
    res.setName(user.name)
    res.setDistance(user.distance)
    res.setPoints(user.points)
    res.setSteps(user.steps)
    res.setUsingMetric(user.usingMetric)
    if (user.bio) res.setBio(user.bio)
    if (user.avatar) res.setAvatar(user.avatar)

    return res
})

