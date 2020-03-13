import { Server, credentials, ServerCredentials } from "grpc"
import mongoose from "mongoose"
import { promises as fs } from "fs"
import { config } from "dotenv-safe"

import { UserRegistryService } from "./protobuf-gen/user-registry_grpc_pb"
import services from "./services"

config()
const { BIND_ADDRESS, PORT, CERT_PATH, MONGO_URL } = process.env

const asyncBind = (server: Server, address: string, credentials: ServerCredentials) =>
    new Promise((resolve, reject) => {
        server.bindAsync(address, credentials, (err, port) => {
            if (err) reject(err)
            resolve(port)
        })
    })

const grpcServer = async (address: string, port: string | number, certPath: string) => {
    const cert = await fs.readFile(CERT_PATH!)
    const server = new Server()
    server.addService(UserRegistryService, services)
    await asyncBind(server, `${BIND_ADDRESS}:${PORT}`, credentials.createSsl(cert))
    return server
}

;(async () => {
    const [mongo, server] = await Promise.all([mongoose.connect(MONGO_URL!, {}), grpcServer(BIND_ADDRESS!, PORT!, CERT_PATH!)])
    server.start()
})()
