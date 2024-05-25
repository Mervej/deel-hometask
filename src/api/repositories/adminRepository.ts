import { Op } from "sequelize";
import { QueryTypes, Sequelize } from "sequelize";
const models = require("./../../models/model");
const { sequelize, Profile, Contract, Job } = models;

class AdminRepository {
  async fetchBestProfession(start: any, end: any) {
    try {
      // fetch the job data with contract and profile details and where job amount is not paid
      const query = `
        SELECT SUM(j1.price) as total_price, p1.profession
        FROM Profiles p1, Contracts c1, Jobs j1 
        WHERE p1.id = c1.ClientId
        and j1.ContractId = c1.id
        and j1.paymentDate between :start and :end
        group by p1.profession
        order by total_price desc
        limit 1;
        `;

      // Execute the raw query
      const results = await sequelize.query(query, {
        type: QueryTypes.SELECT,
        replacements: { start, end }, // Replace :condition placeholder with actual value
      });

      if (results[0]) return results[0].profession;
      else return "No such profession found for the given date range";
    } catch (err) {
      throw err;
    }
  }

  async fetchBestClient(start: any, end: any) {
    try {
      // fetch the job data with contract and profile details and where job amount is not paid
      const query = `
            SELECT p1.id, SUM(j1.price) as paid, concat(p1.firstName," ",p1.lastName) as fullName
            FROM Profiles p1, Contracts c1, Jobs j1 
            WHERE p1.id = c1.ContractorId
            and j1.ContractId = c1.id
            and j1.paymentDate between :start and :end
            group by p1.id
            order by paid desc
            limit 2;
            `;

      // Execute the raw query
      const results = await sequelize.query(query, {
        type: QueryTypes.SELECT,
        replacements: { start, end }, // Replace :condition placeholder with actual value
      });

      console.log(results);

      if (results[0]) return results;
      else return "No such profession found for the given date range";
    } catch (err) {
      throw err;
    }
  }
}

export default new AdminRepository();
