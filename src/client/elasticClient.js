const { Client } = require('@elastic/elasticsearch');


  const elasticClient = new Client({
    cloud: { 
      id: '3f437ed8fab44237a29edce38c21c8dd:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJGVhZTliNmIxMmZiMzQzZjA4YzhhZTQ2NDI3NmQ2NDEwJDRmZTYzNmFmNGM2MTQzMWE4ZGJlMGNmNTllMGJhMDIx'
    },
    auth: {
      apiKey: 'SURGM080MEJsMXMzamtRWW9ybjI6U1EtUDRWT2JRYW1nMVAzekVXTGxCQQ=='
    }
  });


  module.exports = elasticClient;


