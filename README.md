# cloud-user-registry
A microservice for "Intro to the cloud technologies" responsible for abstracting away database access

## Build
Prerequesits: `node v12`, optionally `docker`

- Install yarn if not installed already: `npm install -g yarn`
- Install dependancies: `yarn install`
- Build sources: `yarn build`
- Start: `yarn start`

If you want to put everything into docker container:
- First build with: `yarn build`
- Build container: `docker build -t invictamotum/user-registry .`
- Start container: `docker run -p <mapped_port>:5505 -d invictamotum/user-registry`

For more info on docker refer to the official doccumentation
