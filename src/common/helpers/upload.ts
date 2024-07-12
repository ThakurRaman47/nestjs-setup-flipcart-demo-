import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync, unlinkSync } from 'fs';

export const multerOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = extname(file.originalname);
      callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
  }),
};

export const FileUploadInterceptor = FileInterceptor('file', multerOptions);

export const fileExists = (filePath: string): boolean => {
    return existsSync(filePath);
};
  
export const deleteFile = (filePath: string): void => {
    return unlinkSync(filePath);    
}
