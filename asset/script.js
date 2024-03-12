
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

    document.getElementById('clearInputBtn').addEventListener('click', function() {
    // Capture the current value before clearing
    var previousValue = document.getElementById('stockInput').value;

    // Clear the input field
    document.getElementById('stockInput').value = '';

    console.log("Previous Value:", previousValue);

    // For persistent storage across sessions:
    localStorage.setItem('previousInput', previousValue);
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
            $('#priceDisplay').text(`Latest Crypto Price: $${price}`);
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



