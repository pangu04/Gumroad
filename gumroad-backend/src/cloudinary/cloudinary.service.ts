import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(file: Express.Multer.File, folder = 'gumroad_clone'): Promise<string> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error('Upload failed: No result from Cloudinary'));
          resolve(result.secure_url);
        },
      );
      toStream(file.buffer).pipe(upload);
    });
  }
}
