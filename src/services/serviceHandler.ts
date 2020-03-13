import { handleUnaryCall as handleUnaryType, ServerUnaryCall } from "grpc"

export type UnaryHandler<P, R> = (call: ServerUnaryCall<P>) => Promise<R>
export const handleUnaryCall = <P, R>(
    handler: UnaryHandler<P, R>
): handleUnaryType<P, R> => (call, callback) =>
    handler(call)
        .then(res => callback(null, res))
        .catch(err => callback(err, null))
