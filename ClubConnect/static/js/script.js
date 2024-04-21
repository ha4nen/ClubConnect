let clubsContainer = document.querySelector('.clubs-container');
let searchByName = document.getElementById('search-by-name');
let FilterList = document.querySelector('.filter-list');
let blurry = document.querySelector('.blur');
let addToListBtns = document.querySelectorAll('.add-to-list-btn');
let filterCategories = document.querySelectorAll('.filter-list ul li');
let NoResultsMatches = document.querySelector('.no-clubs-events-matches');
let dateInputFrom = document.getElementById("search-by-date-from");
let dateInputTo = document.getElementById("search-by-date-to");
let cardEventDesc = document.querySelectorAll(".card-body .card-text");
let cardEventTitle = document.querySelectorAll(".card-title");
let eventCards = document.querySelectorAll('.event-card');
let listedEventsCount = document.querySelector('.header-my-list h3 span')
let clubsFound;
let eventsFound;
let dataPro;
if (localStorage.product) {
    dataPro = JSON.parse(localStorage.product);
}   else {
 dataPro = [];
}

/*Start My-List Pgae JS*/
if(document.body.id === 'my-list'){
    showData();
}
function showData() {
    let table = '';
    if(dataPro.length === 0){
        NoResultsMatches.classList.remove('hidden-div');
        listedEventsCount.innerHTML = `(0)`;
      }
      else{
        for (let i = 0; i < dataPro.length; i++) {
                table += `
                    <tr data-category="${dataPro[i].category}" class="card-to-filter">
                        <td><img src="${dataPro[i].image}" alt="Event Image"></td>
                        <td>${dataPro[i].title}</td>
                        <td class="event-date" data-date="${dataPro[i].date}">${dataPro[i].day} ${dataPro[i].month}, ${dataPro[i].time}</td>
                        <td><button class="main-btn more-info-btn smaller-more-info-btn">More Info</button></td>
                        <td><i onclick ="deleteFromList(${i})" class="fa-solid fa-trash"></i></td>
                    </tr>`;
                    listedEventsCount.innerHTML = `(${i+1})`;
            }
             NoResultsMatches.classList.add('hidden-div');
      }
    
    document.querySelector('tbody').innerHTML = table;
}

  function deleteFromList(i){
      dataPro.splice(i,1);
      localStorage.setItem('product', JSON.stringify(dataPro));
      let successfulMessage = document.querySelector('.successful-message');
      successfulMessage.style.display = 'block';
      setTimeout(function(){
          successfulMessage.style.display = 'none';
      },800);
      showData();
      
  }

/*End My-List Pgae JS*/
   
let cards = document.querySelectorAll('.card-to-filter');

//show filters and blur
function showFilters(){
    FilterList.style.transform = 'translateX(0)';
    blurry.classList.add('show-blur');
    document.body.classList.add('unable-scroll');
}
// hide filters and blur
function hideFilters(){
    FilterList.style.transform = 'translateX(100%)';
    blurry.classList.remove('show-blur');
    document.body.classList.remove('unable-scroll');
}

//filter the cards from the chosen cards in searches
function filterCards(chosenCategory){
    clubsFound = false;
    eventsFound = false;
   for(let i = 0; i< cards.length; i++){
    if(cards[i].dataset.category.includes(chosenCategory.dataset.category) ){
       cards[i].classList.remove('hidden-card-category');
       clubsFound = true;
       
    }
    else{
       cards[i].classList.add('hidden-card-category');
    }
   }
}

//search cards by name
function searchCardByName() {
    clubsFound = false;
    for (let i = 0; i < cards.length; i++) {
        let clubName = cards[i].querySelector('.card-title');
        if (clubName.textContent.toLowerCase().includes(searchByName.value.toLowerCase()) && !cards[i].classList.contains('hidden-card-category')) {
            cards[i].classList.remove('hidden-card');
            clubsFound = true;

        } else {
            cards[i].classList.add('hidden-card');
        }
    }
    checkClubsFound();
}
//search cards by date
function searchCardByDate(){
    eventsFound = false;
    let fromDate = new Date(dateInputFrom.value);
    let toDate = new Date(dateInputTo.value);
    if(!isNaN(fromDate.getTime()) || !isNaN(fromDate.getTime())){
        for(let i = 0; i< cards.length; i++){
          let eventDate = cards[i].querySelector('.event-date');
          let targetDate = new Date(eventDate.dataset.date);

          if( targetDate >= fromDate  && targetDate <= toDate && !cards[i].classList.contains('hidden-card-category')){
        
              cards[i].classList.remove('hidden-card');
              eventsFound = true;
    } 
          else {
              cards[i].classList.add('hidden-card');
             
    }
   }     
   checkEventsFound();
    } 
    
}
  
function resetPage() {
    window.location.reload();
}


//check if clubs or events found
function checkClubsFound(){
    if (!clubsFound) {
        NoResultsMatches.classList.remove('hidden-div');
    } else {
        NoResultsMatches.classList.add('hidden-div');
       
    }
}
function checkEventsFound(){
    if (!eventsFound) {
        NoResultsMatches.classList.remove('hidden-div');
    } else { 
        NoResultsMatches.classList.add('hidden-div');
    }
}

/*Start Home Page Js */
if(document.body.id === 'home'){

//Scroll previous next clubs
function scrollNextClub(){
    clubsContainer.scrollBy({
        left: 1200,
        behavior: "smooth"
    });
}
function scrollPreviousClub(){
    clubsContainer.scrollBy({
        left: -1200,
        behavior: "smooth"
    });
}
}
/*End Home Page Js */

/*Start Clubs Page JS */
if(document.body.id === 'clubs' || document.body.id === 'events' || document.body.id === 'my-list'){
    
    filterCategories.forEach(category => {
        category.addEventListener('click', function() {
            // Remove 'active-category' class from all categories
            filterCategories.forEach(cat => cat.classList.remove('active-category'));
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            // Add 'active-category' class to the clicked category
            this.classList.add('active-category');
            hideFilters();
            filterCards(category);
            // Reset the search input field
             if(document.body.id === 'clubs'){
                searchByName.value = '';
                // Clear the search results
                 searchCardByName();
            }
            else{
                searchCardByDate();
            }
        });
    });
}

    
/*End Clubs Page JS */


/*Start Clubs and Events Pages JS */



/*End Clubs and Events Pages JS */


/*Start Events Page JS*/
if(document.body.id === 'events'){

    // Add an event listener to prevent keyboard input on the date input field
    dateInputFrom.addEventListener("keydown", function(event) {
    event.preventDefault(); // Prevent any keyboard input
    });
    dateInputTo.addEventListener("keydown", function(event) {
        event.preventDefault(); // Prevent any keyboard input
    });


 // Add an event listener to listen for the "change" event on the date input
    // dateInput.addEventListener("change", function() {
    // // When the date is changed, set the value of the input field to the selected date
    // var selectedDate = dateInput.value;
    // var dateObject = new Date(selectedDate);
    // var day = dateObject.getDate();
    // var monthByName = dateObject.toLocaleString('default', { month: 'long' })
    // var month = dateObject.getMonth() + 1;
    // var year= dateObject.getFullYear();
    // // Here, you might want to perform additional actions with the selected date if needed
    // console.log("Selected date:", selectedDate);
    // console.log("day:", day);
    // console.log("month:", month);
    // console.log("month by name:", monthByName);
    // console.log("year:", year);
    // });
    
    }

    if(document.body.id === 'events' || document.body.id === 'home'){
        //make the paragraph withing 40 words
    cardEventDesc.forEach(description => {
        let cardText = description.textContent;
        let words = cardText.split(' ');
        let truncatedText = words.slice(0, 50).join(' ');
        if (words.length > 50) {
            truncatedText += '...';
        }
        description.textContent = truncatedText;
        });
        cardEventTitle.forEach(eventTitle => {
        let cardTitle = eventTitle.textContent;
        let words = cardTitle.split(' ');
        let truncatedTitle = words.slice(0, 4).join(' ');
        if (words.length > 4) {
            truncatedTitle += '...';
        }
        eventTitle.textContent = truncatedTitle;
        });
    }
        
/*End Events Page JS*/

/*Start Club Profile Page JS*/ 
let biggerImage = document.querySelector('.bigger-profile');
let searchEvent = document.getElementById('search-for-event');
function openImage(){
    biggerImage.style.display = 'flex';
  }
  function closeImage(){
    biggerImage.style.display = 'none';
  }
  function searchForEvent(){
    eventsFound = false;
     for(let i = 0; i < eventCards.length; i++){
    let eventTitle = eventCards[i].querySelector('.card-title');
    if(eventTitle.textContent.toLowerCase().includes(searchEvent.value.toLowerCase())){
       eventCards[i].classList.remove('hidden-card');
       eventsFound = true;
    }
    else{
       eventCards[i].classList.add('hidden-card');
    }
  }
  checkEventsFound();
  }
  
  
  function checkEventsFound(){
    if (!eventsFound) {
        NoResultsMatches.classList.remove('hidden-div');
    } else {
        NoResultsMatches.classList.add('hidden-div');
       
    }
  }

  const eventPostsSlider = document.querySelector('.event-posts-slider');
  const profilePostCards = document.querySelectorAll('.profile-post-card');
  let currentIndex = 0;
  
  function moveNext() {
      const cardWidth = profilePostCards[0].offsetWidth;
      const cardsInView = Math.floor(eventPostsSlider.offsetWidth / cardWidth);
      const moveDistance = currentIndex < profilePostCards.length - cardsInView ? -(currentIndex + 1) * cardWidth : 0;
  
      profilePostCards.forEach(card => {
          card.style.transform = `translateX(${moveDistance}px)`;
      });
  
      currentIndex = currentIndex < profilePostCards.length - cardsInView ? currentIndex + 1 : 0;
  }
  
  function movePrevious() {
      const cardWidth = profilePostCards[0].offsetWidth;
      const cardsInView = Math.floor(eventPostsSlider.offsetWidth / cardWidth);
      const moveDistance = currentIndex > 0 ? -(currentIndex - 1) * cardWidth : -(profilePostCards.length - cardsInView) * cardWidth;
  
      profilePostCards.forEach(card => {
          card.style.transform = `translateX(${moveDistance}px)`;
      });
  
      currentIndex = currentIndex > 0 ? currentIndex - 1 : profilePostCards.length - cardsInView;
  }
/*End Club Profile Page JS*/

/*Start Event Page JS*/
if(document.body.id === "event-page"){
    let eventTimer = document.querySelector('.event-timer');
        let countDownDate = new Date(`${eventTimer.dataset.date} ${eventTimer.dataset.time}`).getTime();
        let x = setInterval(function(){
            let now = new Date().getTime();
            let distance = countDownDate - now;
        
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            days = days < 10 ? "0" + days : days;
            hours = hours < 10 ? "0" + hours : hours;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            
            document.getElementById("days").innerHTML = days;
            document.getElementById("hours").innerHTML = hours;
            document.getElementById("minutes").innerHTML = minutes;
            document.getElementById("seconds").innerHTML = seconds;
        
            if(distance < 0){
                clearInterval(x);
                document.getElementById("days").innerHTML = '00';
                document.getElementById("hours").innerHTML = '00';
                document.getElementById("minutes").innerHTML = '00';
                document.getElementById("seconds").innerHTML = '00';
            }
            
        },1000);
}
/*End Event Page JS*/
