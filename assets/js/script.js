/* fetch(
    'https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/2020-09-01/2020-12-01'
)
    .then(function(response) {
    return response.json();
    })
    .then(function(data) {
    console.log(data);
    });

    https://covid-19.dataflowkit.com/v1 */





var searchBtn = document.querySelector('#search-btn')
searchBtn.addEventListener('click', searchOnClick)

function searchOnClick() {
    var userInput = upperFirst(document.getElementById('search-term').value)
    console.log(userInput)  
    apiRequests(userInput)  
}

function apiRequests(userInput) {

    // fetching active/total/new cases info
    fetch(
        'https://covid-19.dataflowkit.com/v1/' + userInput
        )
            .then(function(response) {
            return (response.json())
            })
            .then(function(cases) {
            if (userInput !==  cases.Country_text) {
                alert('Please enter a valid country name.')
            } else {
                console.log(cases)
                printCaseData(cases)
            }}
        )

    // fetching vaccines info
    fetch (
        'https://covid-api.mmediagroup.fr/v1/vaccines?country=' + userInput
        )
            .then(function(response) {
            return response.json()
            })
            .then(function(vaccines) {
            console.log(vaccines)
            printVaccineData(vaccines)
            })

            
}


function upperFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

function printCaseData (country) {
    var reportSecction = document.querySelector('#report-section')
        reportSecction.innerHTML = ''

    var reportEl = $('<div>').addClass('numbers')
        if (country["Active Cases_text"] === '') {
            var noDataActive = ('<p id="active-cases">Active Cases: no data</p>')
        } else {
            var activeCases = ('<p id="active-cases">Active Cases: ' + country["Active Cases_text"] + '</p>')
        }

        if(country["New Cases_text"] === ''){
            var noDataNew = ('<p id="active-cases">Active Cases: no data</p>')
        } else {
            var newCases = ('<p id="new-cases">New Cases: ' + country["New Cases_text"] + '</p>')
        }

    $('#report-section').append(reportEl)
    reportEl.append(activeCases, newCases, noDataActive, noDataNew)
}

function printVaccineData (vaccines) {
    if (vaccines.All.people_vaccinated === '') {
        var noDataFully = ('<p id="vaccinated">Fully Vaccinated: no data</p>')
    } else {
        var fullyVaccinated = $('<p id="vaccinated">Fully Vaccinated: ' + vaccines.All.people_vaccinated + '</p>')
    }

    if (vaccines.All.people_partially_vaccinated === '') {
        var noDataPartially = ('<p id="vaccinated">Partially Vaccinated: no data</p>')
    } else {
        var partiallyVaccinated = $('<p id="vaccinated">Partially Vaccinated: ' + vaccines.All.people_partially_vaccinated + '</p>')
    }

    $('#report-section').append(fullyVaccinated, partiallyVaccinated, noDataFully, noDataPartially)
}
var signUpButton = document.getElementById('btn')

signUpButton.addEventListener('click', function(event) {
    event.preventDefault();
  
    var name = document.getElementById('contact-name').value;
    var email = document.getElementById('contact-email').value;
  
    if (name === '') {
      alert('Name cannot be blank');
    } else if (email === '') {
      alert('Email cannot be blank');
    } else {
      alert('Registered successfully');
  
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);

    }
})
