//This file is the JS for the search page AND results page due to common functions/variables needing to be referenced
let key = 'dQsyvNyQ9qRp3zhGJhVSf70Yc7utHj2eyGPZXEZ7VNAt1C8bmtH2cVFWQKLoS58Q';
let creatorQry = '&creator=';
function getWaltersData(query) {
    
    let queryURL = 'http://api.thewalters.org/v1/objects?apikey=' + key + '&title=' + query;

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response);
    });
};

