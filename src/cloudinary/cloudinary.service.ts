import { Injectable, Logger } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);

  /**
   * Uploads a base64 string or file buffer/URL to Cloudinary
   * @param fileOrBase64 Base64 Data URL, file path, or remote URL
   * @param folder Target folder in Cloudinary
   */
  async uploadImage(
    fileOrBase64: string,
    folder = 'products',
  ): Promise<{ secure_url: string; public_id: string }> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        fileOrBase64,
        {
          folder,
          resource_type: 'auto',
        },
        (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
          if (error) {
            this.logger.error('Cloudinary upload error:', error);
            return reject(error);
          }
          if (!result) {
            return reject(new Error('Cloudinary upload failed: No result returned'));
          }
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        },
      );
    });
  }

  /**
   * Deletes an asset from Cloudinary by public ID
   * @param publicId Public ID of asset in Cloudinary
   */
  async deleteImage(publicId: string): Promise<any> {
    if (!publicId) return;
    try {
      const result = await cloudinary.uploader.destroy(publicId, { resource_type: 'auto' });
      this.logger.log(`Deleted Cloudinary asset ${publicId}:`, result);
      return result;
    } catch (err) {
      this.logger.error(`Failed to delete Cloudinary asset ${publicId}:`, err);
    }
  }

  /**
   * Helper method to extract public_id from a Cloudinary URL
   * @param url Cloudinary secure_url string
   */
  extractPublicId(url: string): string | null {
    if (!url || typeof url !== 'string' || !url.includes('cloudinary.com')) {
      return null;
    }
    try {
      const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)\.[a-zA-Z0-9]+$/);
      return match ? match[1] : null;
    } catch {
      return null;
    }
  }
}
