

$('#fetchStockDataBtn').click(function(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    const crypto = $('#stockInput').val(); // Get the value from the input field
    if (!crypto) {
        alert("Please enter a Crypto name.");
        return;
    }
    console.log("Selected crypto Name:", crypto); 
    fetchPrice(crypto);
});


function fetchPrice(crypto) {
    var apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`;
    console.log("API URL:", apiUrl); // Check the output

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log("API Response Data:", data); // Adding this to inspect the API response structure
        if (data[crypto] && typeof data[crypto].usd !== 'undefined') {
            var price = data[crypto].usd;
            $('#priceDisplay').text(`Price: $${price}`);
        } else {
            $('#priceDisplay').text('Price: Price data not available');
            console.log(`Price data not available for ${crypto}`); // Adding debug log for missing data
        }
    })
    .catch(error => {
        console.error('Error:', error);
        $('#priceDisplay').text('Price: Unable to fetch price');
    });
}


document.getElementById('displayNews').addEventListener('click', handler);
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
const container = document.getElementById('DataDisplay');
if (!container) {
    console.error('Container element not found');
    return;
}

container.innerHTML = ''; // Clear previous content

if (response && Array.isArray(response.data) && response.data.length > 0 &&
    response.data[0].screen_data && Array.isArray(response.data[0].screen_data.news)) {
    const newsItems = response.data[0].screen_data.news;

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

document.getElementById('displayNews').addEventListener('click', handler);
