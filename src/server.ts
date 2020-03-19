import { Server, ServerCredentials } from "grpc"
import mongoose from "mongoose"
import { config } from "dotenv-safe"

import { UserRegistryService } from "./protobuf-gen/user-registry_grpc_pb"
import services from "./services"

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
) => {
    const server = new Server()
    server.addService(UserRegistryService, services)
    await asyncBind(
        server,
        `${address}:${port}`,
        ServerCredentials.createInsecure()
    )
    return server
}

const mongoConnection = (url: string) =>
    mongoose.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
;(async () => {
    try {
        const [mongo, server] = await Promise.all([
            mongoConnection(MONGO_URL!),
            grpcServer(BIND_ADDRESS!, PORT!)
        ])
        server.start()
    } catch (e) {
        console.error(e)
        process.exit(-1)
    }
})()
