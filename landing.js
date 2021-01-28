//Function which selects a random index from an array of quotes.

function getQuote() {
    let quoteArr = ['Art is never finished, only abandoned. -Leonardo Da Vinci', 'Every artist was once an amateur. -Ralph Waldo Emerson', 'Art washes away from the soul, the dust of everyday life. -Pablo Picasso', 'To be an artist is to believe in life. -Henry Moore'];
    let randomIndex = Math.floor(Math.random() * (quoteArr.length + 1));
    return quoteArr[randomIndex];
};

//Setting divs to variables for inserting the randomly generated quote.
const quoteDiv = $('div');
let newQuote = $('<h3>').text(getQuote());

//Appending the new quote to the div
quoteDiv.append(newQuote);