import { Op } from "sequelize";
const models = require("./../../models/model");
const { Profile, Contract, Job } = models;

class ContractRepository {
  async getContractById(contractId: string, profileData: any) {
    try {
      // fetch data for contract if profile id is amoung client or contractor id
      let contractData = await Contract.findOne({
        where: {
          id: contractId,
          ...(profileData.type == "client" && { ClientId: profileData.id }),
          ...(profileData.type == "contractor" && {
            ContractorId: profileData.id,
          }),
        },
      });

      if (!contractData) return "No such contract found for client";
      else return contractData.dataValues;
    } catch (err) {
      throw err;
    }
  }

  async getContracts(profileData: any) {
    try {
      // fetch all contract data for the profile and not in terminated state
      let contractData = await Contract.findAll({
        raw: true,
        where: {
          status: { [Op.ne]: "terminated" },
          ...(profileData.type == "client" && { ClientId: profileData.id }),
          ...(profileData.type == "contractor" && {
            ContractorId: profileData.id,
          }),
        },
      });

      return contractData;
    } catch (err) {
      throw err;
    }
  }
}

export default new ContractRepository();
