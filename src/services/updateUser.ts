import { handleUnaryCall, whereClause } from "./serviceHandler";
import { UpdateUserQuery, VoidResponse } from "../protobuf-gen/user-registry_pb";

export default handleUnaryCall<UpdateUserQuery, VoidResponse>(async (prisma, call) => {
    const query = call.request.getQuery();
    const data: any = {}
    if (call.request.hasHash()) data.hash = call.request.getHash()
    if (call.request.hasLogin()) data.login = call.request.getLogin()
    if (call.request.hasTokenRevision()) data.tokenRevision = call.request.getTokenRevision()
    if (call.request.hasName()) data.tokenRevision = call.request.getName()
    if (!query) throw Error("Invalid querry format")
    await prisma.user.update({
        data,
        where: whereClause(query)
    })
    return new VoidResponse()
})
