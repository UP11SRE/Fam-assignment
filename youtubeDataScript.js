const axios = require("axios");



let publishedAfterParam = '2024-01-23T00:00:00.0Z'; 

const apikey1 = 'AIzaSyD7LtIGJGLd6vgfDQiBbkWseJB6jwy8zmo';
const apikey2 = 'AIzaSyDtQvekuq3SzmNCQsIdAeQMWiXUOBJpriY';
const apikey3 = 'AIzaSyCzlgK5AuT1MI0gC-B2YSOmnARcWzsrEIA';
const apikey4 = 'AIzaSyAEDBGJvLOY5n3n-WFT0VzIwi2I9KQAqFY';
const apikey5 = 'AIzaSyDEnMT6T0CnL7pHq35lgD120DevvXNguZk';

async function fetchDataAndStoreInElasticsearch(elasticClient) {
  try {
    const apiKeys = [apikey1,apikey2,apikey3,apikey4,apikey5];

    let successfulResponse = null;
    let errorCount = 0;

    for (const apiKey of apiKeys) {
      const youtubeApiResponse = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: apiKey,
          part: 'snippet',
          q: 'RamMandir',
          publishedAfter: publishedAfterParam,
          type: 'video',
          order: 'date',
          maxResults: 5,
          videoDuration: 'short',
        },
      });

      if (youtubeApiResponse.data.items && youtubeApiResponse.data.items.length > 0) {
        successfulResponse = youtubeApiResponse;
        break;
      } else {
        errorCount++;
      }
    }

    if (successfulResponse) {
    
      const videos = successfulResponse.data.items.map(item => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        thumbnails: item.snippet.thumbnails.default.url,
        
      }));

      console.log("videos", videos);

      if (videos.length > 0) {
        const firstVideoTimestamp = videos[0].publishedAt;
        console.log('Timestamp of the first video:', firstVideoTimestamp);
  
        publishedAfterParam = new Date(new Date(firstVideoTimestamp).getTime() + 2000).toISOString();

        console.log('Next API Request Published After:', publishedAfterParam);
  
        const elasticsearchResponse = await elasticClient.bulk({
          body: videos.flatMap(video => [
            { index: { _index: 'search-fampay' } }, 
            video,
          ]),
        });
        
     

    }} else {
      console.log(`All ${errorCount} attempts failed. No videos found in the API response.`);
    }

  } catch (error) {
    console.error('Error fetching data or storing in Elasticsearch:', error.message);
  }
}




module.exports = fetchDataAndStoreInElasticsearch;
