import { Docker } from 'dockerode';


export default async function pullImage(imageName: string) {

    try {

        const docker = new Docker();
        return new Promise((resolve, reject) => {
            docker.pull(imageName, (err, stream) => {
                if (err) {
                    throw(err);
                }
                docker.modem.followProgress(stream, (err, output) => { //downloading the image is time consuming , it shows the how much image is downloaded
                    err ? reject(err) : resolve(output) , (event)=>{
                        console.log(event);
                    }

                });
            });
        });
        
    } catch (error) {
        console.log(error);
        
    }


   
}