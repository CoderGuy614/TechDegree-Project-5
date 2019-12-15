// Getting the data from the randomuser API
$.ajax({
    url: 'https://randomuser.me/api/?results=12&nat=us,gb',
    dataType: 'json',
    success: function(data){
        generateUser(data);
        addClickListeners();
        addSearch(data);
    }
  });
  // This function handles the returned data and formats it into the html elements 
function generateUser(data){
    const resultsArray = data.results
    resultsArray.forEach( user => {
        const firstName = user.name.first;
        const lastName = user.name.last;
        const email = user.email;
        const city = user.location.city;
        const state = user.location.state;
        const picture = user.picture.thumbnail;
        const phone = user.phone;
        const streetAddress = user.location.street.number + " " + user.location.street.name + " " + user.location.postcode;
        const birthYear = user.dob.date.substring(0,4);
        const birthMonth = user.dob.date.substring(5,7);
        const birthDay = user.dob.date.substring(8,10);
        console.log(birthDay)
        console.log(user.dob.date)
        let modalId = 0;
// creating the user divs
        $('#gallery').append(
            $('<div/>')
              .attr("id", firstName + lastName)
              .addClass("card")
              .append(
                  $('<div>')
                    .addClass("card-img-container")
                    .append(
                        $('<img>')
                            .attr('src', picture)
                            .attr('alt', 'profile picture')
                            .addClass("card-img")
                       )

                )
              .append(
                    $('<div>')
                    .addClass("card-info-container")
                        .append(
                            $('<h3>')
                                .addClass('card-name cap')
                                .attr('id', 'name')
                                .html(`${firstName} ${lastName}`)
                                )
                        .append(
                            $('<p>')
                                .addClass('card-text')
                                .html(`${email}`)
                                )
                        .append(
                            $('<p>')
                                .addClass('card-text cap')
                                .html(`${city} ${state}`)
                                )
              )

        )
    // Creating the modals and hiding them for each user
            $('body').append(
                $('<div>')
                    .addClass('modal-container')
                    .addClass(firstName+lastName)
                    .append(
                        $('<div>')
                            .addClass('modal')
                            .append(
                                $('<button>')
                                    .addClass('modal-close-btn')
                                    .attr('id', 'modal-close-btn')
                                    .html('<strong>X</strong>')
                                    .click(function(){
                                        $('.modal-container').hide()
                                    })
                            )
                            .append(
                                $('<div>')
                                    .addClass('modal-info-container')
                                    .append(
                                        $('<img>')
                                        .attr('src', picture)
                                        .attr('alt', 'profile picture')
                                        .addClass("modal-img")
                                    )
                                    .append(
                                        $('<h3>')
                                        .addClass('modal-name')
                                        .attr('id', 'name')
                                        .html(`${firstName} ${lastName}`)
                                    )
                                    .append(
                                        $('<p>')
                                            .addClass('modal-text')
                                            .html(`${email}`)
                                    )
                                    .append(
                                        $('<p>')
                                            .addClass('modal-text cap')
                                            .html(`${city}`)
                                    )
                                    .append(
                                        $('<hr>')
                                    )
                                    .append(
                                        $('<p>')
                                            .addClass('modal-text')
                                            .html(`${phone}`)
                                    )
                                    .append(
                                        $('<p>')
                                            .addClass('modal-text')
                                            .html(`${streetAddress}`)
                                    )
                                    .append(
                                        $('<p>')
                                            .addClass('modal-text')
                                            .html(`Birthday: ${birthMonth}-${birthDay}-${birthYear}`)
                                    )
                                    .append(
                                        $('<button>')
                                            .text('Previous')
                                            .addClass('myButton')
                                            .click(function(e){
                                                showPrevious(e)
                                            })
                                    )
                                    .append(
                                        $('<button>')
                                            .addClass('myButton')
                                            .text('Next')
                                            .click(function(e){
                                                showNext(e)
                                            })
                                    )
                                )
                            
                            )
                            .hide()
                    )     
    })
}
// This function opens the modal that corresponds to the person whose div is clicked
function addClickListeners(){
    const divs = $('div.card')
    const modals = $('div.modal-container')
    for(let i = 0; i < divs.length; i++){
        divs[i].addEventListener('click', function(){
            const name =(divs[i].id)
            const modalName = (modals[i].classList[1])
            if(name === modalName){
                modals[i].style.display = 'block';
            }
        })
    }
}
   // Adding the search field to the top of the page
function addSearch(data){
    $form = $("<form action='#' method='get'></form>");
    $form.append('<input type="search" id="search-input" class = "search-input" placeholder="Search..." >');
    $form.append('<input type="submit" id="search-submit" class = "search-submit" value="&#x1F50D;" >');
    $('.search-container').append($form);

    // Adding keyup and click listeners to the search bar
    const searchSubmit = $('#search-submit');
    let input = $('#search-input');
    input.on('keyup', searchFunction);
    searchSubmit.on('click', searchFunction);
}
// Checks to see if the search input matches any names and shows the matches
function searchFunction(){
    const divs = $('div.card')
    let searchInput = $('#search-input').val();
        for(let i = 0; i < divs.length; i++) {
            const name =(divs[i].id)
            if(name.toLowerCase().includes(searchInput.toLowerCase())) {
            divs[i].style.display = "block"
            } else {
                divs[i].style.display = "none"
            }
    }
}
// Shows the next modal 
function showNext(e){
    let nextModal = e.target.parentElement.parentElement.parentElement.nextSibling
    if(nextModal){
        nextModal.style.display = "block"
        e.target.parentElement.parentElement.parentElement.style.display = "none"
    } 
}


// Shows the previous modal
function showPrevious(e){
    let previousModal = (e.target.parentElement.parentElement.parentElement.previousSibling)
    let currentModal =  (e.target.parentElement.parentElement.parentElement)
        if(previousModal.id !== 'gallery'){
            previousModal.style.display = "block"
            currentModal.style.display = "none"
        }
    }

