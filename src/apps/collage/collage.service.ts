import type { CreateCollageJobInput } from "./collage.types.js";

class CollageService {
  async createJob(jobData: CreateCollageJobInput) {
    return { id: "123", status: "pending", ...jobData };
  }
}

export default new CollageService();
