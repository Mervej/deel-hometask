import sequelize from "sequelize";
import { Op } from "sequelize";
const models = require("./../../models/model");
const { Profile, Contract, Job } = models;

class JobRepository {
  async getAllUnpaidJobs(profileData: any) {
    try {
      let jobData = await Job.findAll({
        include: [
          {
            model: Contract,
            where: {
              status: "in_progress",
              ...(profileData.type == "client" && { ClientId: profileData.id }),
              ...(profileData.type == "contractor" && {
                ContractorId: profileData.id,
              }),
            },
          },
        ],
        where: { paymentDate: null },
        group: [`Job.id`],
        raw: true,
      });

      return jobData;
    } catch (err) {
      throw err;
    }
  }

  async payForJob(job_id: string) {
    try {
      // fetch the job data with contract and profile details and where job amount is not paid
      let jobData = await Job.findOne({
        include: [
          {
            model: Contract,
            include: [{ model: Profile, as: "Client" }],
          },
        ],
        where: { id: job_id, paymentDate: null },
        raw: true,
      });

      if (!jobData) return "no such job found or the job is already paid";

      // check if contractor available balance is > job amount
      if (jobData.price <= jobData["Contract.Client.balance"]) {
        // deduct the job amount from contractor and add the amount to the client
        await Promise.all([
          Profile.update(
            { balance: sequelize.literal(`balance + ${jobData.price}`) },
            { where: { id: jobData["Contract.ContractorId"] } }
          ),
          Profile.update(
            { balance: sequelize.literal(`balance - ${jobData.price}`) },
            { where: { id: jobData["Contract.ClientId"] } }
          ),
        ]);

        //update the paid status of job as paid
        await Job.update(
          {
            paid: true,
            paymentDate: Date.now(),
          },
          { where: { id: job_id } }
        );

        return `Amount ${jobData.price} is successfully transfered to contractor ${jobData["Contract.ContractorId"]} from client ${jobData["Contract.ClientId"]}`;
      } else {
        return "Client dosen't have suffcient balance";
      }
    } catch (err) {
      throw err;
    }
  }
}

export default new JobRepository();
