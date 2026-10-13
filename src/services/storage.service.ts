import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { randomUUID } from "node:crypto";
import type { ImageToUpload } from "../apps/collage/collage.types.js";
import env from "../config/env.js";

class StorageService {
  private readonly client: S3Client;

  constructor() {
    this.client = new S3Client({
      endpoint: env.OBS_ENDPOINT,
      region: env.OBS_REGION,
      credentials: {
        accessKeyId: env.OBS_ACCESS_KEY,
        secretAccessKey: env.OBS_SECRET_KEY,
      },
      forcePathStyle: true,
    });
  }

  async uploadImages(images: ImageToUpload[]): Promise<string[]> {
    const results = await Promise.allSettled(
      images.map(async (image) => {
        const key = `originals/${randomUUID()}.${image.format}`;

        await this.client.send(
          new PutObjectCommand({
            Bucket: env.OBS_BUCKET_NAME,
            Key: key,
            Body: image.buffer,
            ContentType: `image/${image.format}`,
          }),
        );
        return key;
      }),
    );
    const uploadedKeys = results
      .filter(
        (result): result is PromiseFulfilledResult<string> =>
          result.status === "fulfilled",
      )
      .map((result) => result.value);

    const failedUpload = results.find(
      (result): result is PromiseRejectedResult => result.status === "rejected",
    );

    if (failedUpload) {
      const cleanupResults = await Promise.allSettled(
        uploadedKeys.map((key) =>
          this.client.send(
            new DeleteObjectCommand({
              Bucket: env.OBS_BUCKET_NAME,
              Key: key,
            }),
          ),
        ),
      );

      cleanupResults.forEach((result, index) => {
        if (result.status === "rejected") {
          console.error(
            `Failed to cleanup uploaded object : ${uploadedKeys[index]}`,
            result.reason,
          );
        }
      });

      throw failedUpload.reason;
    }
    return uploadedKeys;
  }
}

export default new StorageService();
