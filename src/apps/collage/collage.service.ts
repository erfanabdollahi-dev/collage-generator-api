class CollageService {
  async createJob(jobData: {
    borderSize: number;
    borderColor: string;
    direction: "horizontal" | "vertical";
  }) {

    return {id: "123", status : "pending", ...jobData}
    
  }
}


export default new CollageService;