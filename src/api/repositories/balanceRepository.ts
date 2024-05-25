import sequelize from "sequelize";
import { Op, Sequelize } from "sequelize";
const models = require("./../../models/model");
const { Profile, Contract, Job } = models;

class BalanceRepository {
  async addBalance(profileId: string, amount: number) {
    console.log(profileId);

    // fetch the job data with contract and profile details and where job amount is not paid
    let jobData = await Job.findAll({
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("price")), "total_price"],
      ],
      include: [
        {
          attributes: [],
          model: Contract,
          include: [
            {
              attributes: [],
              model: Profile,
              as: "Client",
              where: { type: "client" },
            },
          ],
        },
      ],
      where: { paymentDate: null, "$Contract.ClientId$": profileId },
      group: ["Contract.ClientId"],
      raw: true,
    });

    // if no such data is available return not found respose
    if (!jobData || !jobData[0] || !jobData[0].total_price)
      return "no such client with jb amount found";

    // check if amount is greater the 25% of the job amount to be paid
    if (amount > jobData[0].total_price * 0.25)
      return "Amount is greater then 25% of current job amount to be paid";
    else {
      // update the balance for the contractor
      await Profile.update(
        { balance: sequelize.literal(`balance + ${amount}`) },
        { where: { id: profileId } }
      );

      return `Added ${amount} to Client!`;
    }
  }
}

export default new BalanceRepository();
