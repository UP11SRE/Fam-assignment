const  client = require('../client/elasticClient');
require("dotenv").config();

//fampay


const dataRepository = {
  async searchLogs(filter, page, pageSize) {
    try {

      const query = filter
      ? {
          bool: {
              must: [{
                  match: { title: filter },
              }],
          },
      }
      : { match_all: {} };
  

      
      
      const data = await client.search({
        index: 'search-fampay',
        body: {
          size: pageSize,
          from: (page - 1) * pageSize,
          query: query,
          sort: [
            {
              currentTime: {
                order: 'asc',
              },
            },
          ],
        },
      });

      console.log("Search result:", data);


      

      return data;
    } catch (error) {
      console.error("Error in repository:", error);
      throw error; 
    }
  },
};


module.exports = dataRepository;
