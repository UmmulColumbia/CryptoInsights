

$(document).ready(function() {

    handler();
       
    });


async function handler() {
    const options = {
      method: "GET",
      url: "https://investing-cryptocurrency-markets.p.rapidapi.com/coins/get-news",
      params: {
        pair_ID: "1057391",
        time_utc_offset: "28800",
        lang_ID: "1",
      },
      headers: {
        'Cache-Control': 'no-cache',
        "x-rapidapi-host": "investing-cryptocurrency-markets.p.rapidapi.com",
        "x-rapidapi-key": '7a0a70e79cmsheba9b44bf470c54p10c2bajsn08c25edfe4b7',
      },
    };
    try {
        const response = await axios.request(options);
        console.log(response.data);
 
        displayNewsData(response.data);

    } catch (error) {
        console.error(error);
        document.getElementById('DataDisplay').textContent = 'Failed to fetch data.';
    }
}
  

function displayNewsData(response) {
    const container = document.getElementById('newsContainer');
    if (!container) {
        console.error('Container element not found');
        return;
    }

    container.innerHTML = ''; // Clear previous content

    if (response && Array.isArray(response.data) && response.data.length > 0 &&
        response.data[0].screen_data && Array.isArray(response.data[0].screen_data.news)) {
        const newsItems = response.data[0].screen_data.news;
        const container = document.getElementById('newsContainer');

        newsItems.forEach((item) => {
            const newsElement = document.createElement('div');
            newsElement.classList.add('news-item'); // Add a class for styling if needed

            // Create and append the headline
            const headline = document.createElement('h3');
            headline.textContent = item.HEADLINE;
            newsElement.appendChild(headline);

            // Create and append the sanitized body content
            const body = document.createElement('p');
            body.innerHTML = item.BODY.replace(/<[^>]*>?/gm, ''); // Basic sanitation to remove HTML tags
            newsElement.appendChild(body);

            // Create and append the link
            const link = document.createElement('a');
            link.href = item.news_link;
            link.textContent = 'Read more';
            link.target = '_blank'; // Open in a new tab
            newsElement.appendChild(link);

            // Append the news element to the container
            container.appendChild(newsElement);
        });
    } else {
        container.textContent = 'No news available.';
    }
}