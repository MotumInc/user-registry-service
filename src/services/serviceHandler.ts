import { handleUnaryCall as handleUnaryType, ServerUnaryCall } from "grpc"
import { PrismaClient } from "@prisma/client"
import { UserQuery } from "../protobuf-gen/user-registry_pb";

export type UnaryHandler<P, R> = (prisma: PrismaClient, call: ServerUnaryCall<P>) => Promise<R>

export const handleUnaryCall = <P, R>(handler: UnaryHandler<P, R>) =>
    (prisma: PrismaClient): handleUnaryType<P, R> =>
        (call, callback) =>
            handler(prisma, call)
                .then(res => callback(null, res))
                .catch(err => callback(err, null))

interface WhereClause {
    id?: number;
    login?: string;
}

export function whereClause(query: UserQuery): WhereClause {
    switch (query.getQualifierCase()) {
        case UserQuery.QualifierCase.ID:
            const id = parseInt(query.getId())
            if (isNaN(id)) throw new Error("id is expected to be an integer")
            return { id }
        case UserQuery.QualifierCase.LOGIN:
            return { login: query.getLogin() }
        case UserQuery.QualifierCase.QUALIFIER_NOT_SET:
            throw new Error("Expected either login or id to be set")
    }
}
