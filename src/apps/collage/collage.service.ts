import collageRepository from "./collage.repository.js";
import type {
  CreateCollageJobInput,
  CreateCollageJobRecord,
} from "./collage.types.js";

class CollageService {
  async createJob(jobData: CreateCollageJobInput) {
    const data: CreateCollageJobRecord = {
      ...jobData,
      status: "PENDING",
      images: [],
      resultKey: null,
      error: null,
    };
    const job = await collageRepository.createCollageJob(data);
    return job;
  }
}

export default new CollageService();
