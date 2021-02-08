//This file is the JS for the search page AND results page due to common functions/variables needing to be referenced




//Function for Walters Collection search by author and set it in local storage

function getWaltersData(query) {
    let key = 'dQsyvNyQ9qRp3zhGJhVSf70Yc7utHj2eyGPZXEZ7VNAt1C8bmtH2cVFWQKLoS58Q';
    let queryURL = 'https://api.thewalters.org/v1/objects?apikey=' + key + '&creator=' + query;
   //  let userLimit = $('#userLimit').val(); commenting out this variable until its source is established   
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
       console.log(response);
       
         for (let i = 0; i < 10; i++) {
            localStorage.removeItem('item '+i);
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
      walterDiv.append('<hr>');      
   };   
};

//Function for The Met collection
function getMetData(query) {
   let queryURL = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=" + query;
   let userLimit = $('#userLimit').val();
   let metArr = [];
   
   //API call get get object IDs for query
   $.ajax({
      url: queryURL,
      method: "GET"
   }).then(function(queryResponse) {
      console.log(queryResponse);
      
      //Loop through requested number of results to get details with second API call
      for (i=0; i < 10; i++){ 
         let objectID = queryResponse.objectIDs[i];
         let objectURL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + objectID; 

         //API call to get details for the requested number of results
         $.ajax({
            url: objectURL,
            method: "GET"
         }).then(function(objectResponse) {
            
            
            //Build object with relevant details for each iteration and push into array of objects for this collection's responses
            let iterationObj = {
               title: objectResponse.title, 
               name: objectResponse.artistDisplayName, 
               date: objectResponse.objectDate, 
               image: objectResponse.primaryImageSmall,
               addl_info: objectResponse.objectWikidata_URL
            }
            

            metArr.push(iterationObj);
            
            //Store array of objects to local storage for retrieval in populating results cards
            localStorage.setItem("metArr", JSON.stringify(metArr));    
         })
      }
   })
   
   
}

//Function to append met data to results page
function popMetData(){
   var localMetData = JSON.parse(localStorage.getItem("metArr"));
   console.log(localMetData);

   for (let i = 0; i < 10; i++){
      let cardDetails = localMetData[i];

      //Card image
      let artCard = $("<div>").addClass("card mb-5").attr("id", "objectCard" + i);
      $("#metresults").append(artCard);

      let cardImage = $("<div>").addClass("card-image").attr("id", "cardImage" + i);
      $("#objectCard" + i).append(cardImage);

      let imageFig = $("<figure>").addClass("image is-3by2").attr("id", "imageFig" + i);
      $("#cardImage" + i).append(imageFig);

      let image = $("<img>").attr("src", cardDetails.image);      
      $("#imageFig" + i).append(image);
      
      //Card content - title and artist
      let cardContent = $("<div>").addClass("card-content has-background-grey").attr("id", "cardContent" + i);
      $("#cardImage" + i).append(cardContent);

      let cardMedia = $("<div>").addClass("media").attr("id", "cardMedia" + i);
      $("#cardContent" + i).append(cardMedia);

      let mediaContent = $("<div>").addClass("media-content").attr("id", "mediaContent" + i);
      $("#cardMedia" + i).append(mediaContent);

      let title = $("<p>").addClass("title is-5").text(cardDetails.title);
      let artist = $("<p>").addClass("subtitle is-6").text(cardDetails.name);
      $("#mediaContent" + i).append(title, artist);
      
      //Card content -- date and link to more info
      let mainContent = $("<div>").addClass("content").attr("id", "mainContent" + i).append("<br>");
      $("#cardContent"+ i).append(mainContent);
      let displayDate = $("<p>").addClass("is-size-6").text("Approx. date of creation: " + cardDetails.date);
      let additionalInfo = $("<a>").addClass("has-text-primary is-size-7").attr("href", cardDetails.addl_info).text("View more information on this piece!");
      $("#mainContent" + i).append(displayDate, additionalInfo);
   };
};


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
   
});

document.addEventListener('keyup',function(e){
   if (e.key === 'Enter') {
      e.preventDefault();

      //Get data
      let query = $("#enterArtist").val().trim();
      console.log("The query is: " + query);
   
      getWaltersData(query);
      getMetData(query);
   
      //Redirect to results page
      setTimeout(() => {
         window.location.href = "results.html";
      }, 1500);
 }
});



//Execute functions to display data

   popMetData();
   appendWalterData();

