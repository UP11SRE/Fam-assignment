const Service = require("../services/dataServices");

const dataController = {

  async searchLogs(req, res, next) {
 
    try {
  
      const {title} = req.query;

      let {page, pagesize} = req.query
       
      if(!page){
        page = 1;
      }
      if(!pagesize){
        pagesize = 10;
      }
      

      const result = await Service.searchLogs(title, page, pagesize);
    

      function getNextPage(page, pageSize, totalDocs) {
        const possibleNextPage = Math.ceil(totalDocs / pageSize);
        return page >= possibleNextPage ? null : `${Number(page) + 1}`;
      }


      function parseElasticsearchResult(result, pageSize, currentPage) {

        const hits = result.hits.hits;
        const totalHits = result.hits.total.value; 
        
        const nextPage = getNextPage(page,pageSize,totalHits);
       
        return {
          status: true,
          code: 200,
          success: true,
          message: "success",
          docs: hits.map(hit => ({
            videoId: hit._source.videoId,
            title: hit._source.title,
            description: hit._source.description,
            publishedAt: hit._source.publishedAt,
            thumbnails: hit._source.thumbnails,
            key: hit._source.currentTime,
          })),
          nextPage: nextPage,
        };
      }
      
      
     
      
      
      const parsedResult = parseElasticsearchResult(result, pagesize, page);

     
      

      res.status(200).send(parsedResult);
    } catch (error) {
      console.error("Error searching logs:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  },
};

module.exports = dataController;