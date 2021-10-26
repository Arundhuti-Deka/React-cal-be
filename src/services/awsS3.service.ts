import * as AWS from 'aws-sdk';
import * as fs from 'fs';
import config from '../config';

export class AWSS3Service {
    s3Instance = new AWS.S3({
        accessKeyId: config.AWS_S3_ACCESS_KEY,
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY
    });
    
    public uploadFile = async (file: any, name: any, folderName: any) =>{
        return new Promise((resolve, reject) =>{
            try{
                fs.readFile(file.path, (err, data) =>{
                    if(err) reject(err);
                    const params = {
                        Bucket: config.AWS_S3_BUCKET_NAME,
                        Key: `${folderName}/${name}`,
                        Body: data,
                        ACL: 'public-read'
                    };
                    this.s3Instance.upload(params, (awsError: any, awsResponse: any) =>{
                        if(awsError) {
                            console.log(awsError);
                            resolve(awsResponse);
                        } else {
                            console.log(awsResponse);
                            resolve(awsResponse);
                        }
                    })
                })
            } catch(err){
                resolve(err);
            }
        })
    }
}
