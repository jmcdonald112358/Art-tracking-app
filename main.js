//This file is the JS for the search page AND results page due to common functions/variables needing to be referenced




//Function for Walters Collection search by author

function getWaltersData(query) {
    let key = 'dQsyvNyQ9qRp3zhGJhVSf70Yc7utHj2eyGPZXEZ7VNAt1C8bmtH2cVFWQKLoS58Q';
    let queryURL = 'http://api.thewalters.org/v1/objects?apikey=' + key + '&creator=' + query;
    let userLimit = $('#userLimit').val();  
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
      for (let i = 0; i < userLimit; i++) {
         console.log(response);
      } 
      
    });
};

//Function for The Met collection
function getMetData(query) {
   let queryURL = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=" + query;
   let userLimit = $('#userLimit').val();

   $.ajax({
      url: queryURL,
      method: "GET"
   }).then(function(queryResponse) {
      console.log(queryResponse);
      
      for (i=0; i < userLimit; i++){ //Update index limiter to reference input req
         let objectID = queryResponse.objectIDs[i];
         let objectURL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + objectID; 

         $.ajax({
            url: objectURL,
            method: "GET"
         }).then(function(objectResponse) {
            console.log(objectResponse);
         })

         //Append data to results page here
      }
   })
}

