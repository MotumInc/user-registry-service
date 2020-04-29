import { handleUnaryCall } from "./serviceHandler";
import { ActivityMetrics, ActivityMetricsRequest } from "../protobuf-gen/user-registry_pb";

export default handleUnaryCall<ActivityMetricsRequest, ActivityMetrics>(async (prisma, call) => {
    const id = call.request.getId()
    const { distance, points, steps } = call.request.getMetrics()!.toObject()
    // TODO: optimize querries to just one
    const user = await prisma.user.findOne({ 
        where: { id },
        select: {
            distance: true,
            points: true,
            steps: true
        }
    })
    if (!user) throw new Error("Cannot find user")

    const updatedUser = await prisma.user.update({
        data: {
            distance: user.distance + distance,
            points: user.points + points,
            steps: user.steps + steps
        },
        where: { id },
        select: {
            distance: true,
            points: true,
            steps: true
        }
    })

    const metrics = new ActivityMetrics()
    metrics.setDistance(updatedUser.distance)
    metrics.setPoints(updatedUser.points)
    metrics.setSteps(updatedUser.steps)

    return metrics
})
