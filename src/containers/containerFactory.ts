import Dockerode from "dockerode";


async function createContainer(imageName : string, cmdExecutable : string){


  const docker = new Dockerode()
  const container = await docker.createContainer({ 
    Image: imageName,
    Cmd : cmdExecutable,
     AttachStdin: true, //standard input stream
    AttachStdout: true, //standard output stream
     AttachStderr: true, //standard error stream
     Tty: true, //allocate a pseudo-tty 
     OpenStdin: true, //open standard input kkep the input stream open even no interaction is there

     })

     return container;



}
export default createContainer;