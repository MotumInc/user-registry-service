import { Server, ServerCredentials } from "grpc"
import { PrismaClient } from "@prisma/client";

import { UserRegistryService } from "./protobuf-gen/user-registry_grpc_pb"
import services from "./services"
import { mapValues } from "./util";

const { BIND_ADDRESS, PORT } = process.env

const asyncBind = (
    server: Server,
    address: string,
    credentials: ServerCredentials
) =>
    new Promise((resolve, reject) => {
        server.bindAsync(address, credentials, (err, port) => {
            if (err) reject(err)
            resolve(port)
        })
    })

const grpcServer = async (
    address: string,
    port: string | number,
    prisma: PrismaClient
) => {
    const server = new Server()
    server.addService(UserRegistryService, mapValues(services, init => init(prisma)))
    await asyncBind(
        server,
        `${address}:${port}`,
        ServerCredentials.createInsecure()
    )
    return server
}

const prisma = new PrismaClient({
    log: [
        {
            level: "info",
            emit: "stdout"
        },
        {
            level: "query",
            emit: "stdout"
        },
        {
            level: "warn",
            emit: "stdout"
        }
    ]
})

const main = async () => {
    try {
        const [server, _] = await Promise.all([grpcServer(BIND_ADDRESS!, PORT!, prisma), prisma.connect()])
        server.start()
    } catch (e) {
        console.error(e)
        prisma.disconnect()
        process.exit(1)
    }
}

main()
