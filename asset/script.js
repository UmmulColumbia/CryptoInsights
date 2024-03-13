
$('#fetchStockDataBtn').click(function(e) {
    e.preventDefault(); // Prevent the default form submission behavior
  
    const crypto = $('#stockInput').val().toLowerCase(); // Get the value from the input field and convert the crypto name to lowercase.
    if (!crypto) {
        showModal("Please enter a Crypto name."); // showModal instead of alert
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
    $('#priceDisplay').text(''); // Clear the displayed price 

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
// Get the modal
var modal = document.getElementById("customModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close-button")[0];

// When the user clicks on the button, open the modal 
function showModal(message) {
  document.getElementById("modalText").textContent = message;
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}





