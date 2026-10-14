import storageService from "../../services/storage.service.js";
import collageRepository from "./collage.repository.js";
import type {
  CollageJob,
  CreateCollageJobInput,
  CreateCollageJobRecord,
  ImageToUpload,
} from "./collage.types.js";

class CollageService {
  async createJob(jobData: CreateCollageJobInput, images: ImageToUpload[]) {
    const keys = await storageService.uploadImages(images);
    const data: CreateCollageJobRecord = {
      ...jobData,
      status: "PENDING",
      images: keys,
      resultKey: null,
      error: null,
    };
    const job = await collageRepository.createCollageJob(data);

    return job;
  }

  async findCollageJobById(id: string): Promise<CollageJob | null> {
    const job = await collageRepository.findCollageJobById(id);
    return job;
  }
}

export default new CollageService();
