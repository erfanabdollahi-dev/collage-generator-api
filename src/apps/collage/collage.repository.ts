import CollageJobModel from "./collage.model.js";
import type { CollageJob, CreateCollageJobRecord } from "./collage.types.js";

class CollageRepository {
  private toCollageJob(job: InstanceType<typeof CollageJobModel>): CollageJob {
    return {
      id: job._id.toString(),
      status: job.status,
      borderSize: job.borderSize,
      borderColor: job.borderColor,
      direction: job.direction,
      images: job.images,
      resultKey: job.resultKey ?? null,
      error: job.error ?? null,
      createdAt: job.createdAt,
      updatedAt: job.updatedAt,
    };
  }
  async createCollageJob(
    data: CreateCollageJobRecord,
  ): Promise<CollageJob | undefined> {
    const job = await CollageJobModel.create(data);
    return this.toCollageJob(job);
  }
}

export default new CollageRepository();
