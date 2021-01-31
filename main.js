//This file is the JS for the search page AND results page due to common functions/variables needing to be referenced




//Function for Walters Collection search by author and set it in local storage

function getWaltersData(query) {
    let key = 'dQsyvNyQ9qRp3zhGJhVSf70Yc7utHj2eyGPZXEZ7VNAt1C8bmtH2cVFWQKLoS58Q';
    let queryURL = 'http://api.thewalters.org/v1/objects?apikey=' + key + '&creator=' + query;
   //  let userLimit = $('#userLimit').val(); commenting out this variable until its source is established   
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
       console.log(response);
       
         for (let i = 0; i < 10; i++) {
            let resArr = [response.Items[i].Title, response.Items[i].Creator, response.Items[i].Collection, response.Items[i].PrimaryImage.Medium];
            localStorage.setItem('item '+i, JSON.stringify(resArr));           
         }
    });
};

// function to append data drawn from local storage
function appendWalterData() {
   let walterDiv = $('#walterresults');
   for (let i = 0; i < 10; i++) {
      let resTitle = $('<h4>').text(JSON.parse(localStorage.getItem('item '+i))[0]);
      let resAuth = $('<h5>').text(JSON.parse(localStorage.getItem('item '+i))[1]);
      let resCollection = $('<p>').text(JSON.parse(localStorage.getItem('item '+i))[2]);
      let resImg = $('<img>').attr('src', JSON.parse(localStorage.getItem('item '+i))[3]);
      walterDiv.append(resTitle);
      walterDiv.append(resAuth);
      walterDiv.append(resCollection);
      walterDiv.append(resImg);      
   };   
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
      
      for (i=0; i < 10; i++){ 
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

//Event listener for search button on search page
$("#searchBtn").click(function(event){
   event.preventDefault();

   //Get data
   let query = $("#enterArtist").val().trim();
   console.log("The query is: " + query);

   getWaltersData(query);
   getMetData(query);

   //Redirect to results page
   setTimeout(() => {
      window.location.href = "results.html";
   }, 1500);

   //Execute function to display data

});