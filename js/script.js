$.ajax({
    url: 'https://randomuser.me/api/?results=12',
    dataType: 'json',
    success: function(data){
        generateUser(data);
        addClickListeners();
        addSearch();
    }
  });
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
        const birthday = user.dob.date.substring(0,10);
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
                                            .html(`Birthday: ${birthday}`)
                                    )
                                )
                            
                            )
                            .hide()
                    )     
    })
}
function addClickListeners(){
    const divs = $('div.card')
    const modals = $('div.modal-container')
// Adding click listeners to each div that will display the modal when clicked
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

function addSearch(){
    
    searchContainer = $('.search-container')
    $form = $("<form action='#' method='get'></form>");
    $form.append('<input type="search" id="search-input" class = "search-input" placeholder="Search..." >');
    $form.append('<input type="submit" id="search-submit" class = "search-submit" value="&#x1F50D;" >');
    searchContainer.append($form);
        
}