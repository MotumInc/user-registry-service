import { handleUnaryCall } from "./serviceHandler";
import UserModel from "../models/User";
import { UpdateUserQuery, VoidResponse } from "../protobuf-gen/user-registry_pb";

const updateUser = handleUnaryCall<UpdateUserQuery, VoidResponse>(async call => {
    const { query, ...updates } = call.request.toObject()
    if (!query) throw Error("Invalid querry format")
    await UserModel.update(query, updates)
    return new VoidResponse()
})

export default updateUser