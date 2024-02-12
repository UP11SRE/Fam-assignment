const repository = require("../repository/dataRepository");

const dataServices = {
  async searchLogs(title, page, pagesize, lastKe) {
    return await repository.searchLogs(title, page, pagesize);
  },
};

module.exports = dataServices;
