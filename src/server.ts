import { Server, ServerCredentials } from "grpc"
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv-safe"

import { UserRegistryService } from "./protobuf-gen/user-registry_grpc_pb"
import services from "./services"
import { mapValues } from "./util";

config()
const { BIND_ADDRESS, PORT, MONGO_URL } = process.env

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

const prisma = new PrismaClient()

const main = async () => {
    try {
        const server = await grpcServer(BIND_ADDRESS!, PORT!, prisma)
        server.start()
    } catch (e) {
        console.error(e)
        prisma.disconnect()
        process.exit(1)
    }
}

main()
