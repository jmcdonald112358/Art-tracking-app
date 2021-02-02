// setting starting variables
let quoteArr = ['Art is never finished, only abandoned. -Leonardo Da Vinci', 'Every artist was once an amateur. -Ralph Waldo Emerson', 'Art washes away from the soul, the dust of everyday life. -Pablo Picasso', 'To be an artist is to believe in life. -Henry Moore'];

let srcArr = ['images/DaVinci.jpg', 'images/Ralphie.jpg', 'images/Picasso.jpg', 'images/HenryM.jpg'];

let randomIndex = Math.floor(Math.random() * (quoteArr.length));

//Function which selects a random index from an array of quotes.
function getQuote() {
            return quoteArr[randomIndex];
};

// function to generate random img url src
function getPic() {    
    return srcArr[randomIndex];
}

//Setting divs to variables for inserting the randomly generated quote and img.
const quoteDiv = $('#quotediv');
const imgDiv = $('#imgdiv');
let newQuote = $('<h3>').text(getQuote());
let newImg = $('<img>').attr('src', getPic());

//Appending the new quote to the div
quoteDiv.append(newQuote); 
imgDiv.append(newImg);