var inputEl = document.querySelector('#search-term')

var modalEl = document.querySelector('.modal')
var modalClose = document.querySelector('.modal-close')
    modalClose.onclick = function() {
        modalEl.style.display = 'none'
    }
    window.onclick = function(event) {
        if (event.target.className === 'modal-background') {
            modalEl.style.display = 'none'
        }
    }

var searchBtn = document.querySelector('#search-form')
searchBtn.addEventListener('submit', searchOnClick)

function searchOnClick() {
    var userInput = upperFirst(document.getElementById('search-term').value) 
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
                modalEl.style.display = 'flex'
                $('.modal-content').text('Please enter a valid country name.')
                return
            } else {
                printCaseData(cases)
                document.getElementById('report-section').style.height = 'auto'
                inputEl.value = ''
                checkDuplicatesAndPush(userInput)
                }
            }
        )

    // fetching vaccines info
    fetch (
        'https://covid-api.mmediagroup.fr/v1/vaccines?country=' + userInput
        )
            .then(function(response) {
            return response.json()
            })
            .then(function(vaccines) {
            printVaccineData(vaccines)
            })
}

function checkDuplicatesAndPush (country) {
    countryList.push(country)

    if (countryList.every((e, i, a) => a.indexOf(e) === i)) {
        localStorage.setItem('countryList', JSON.stringify(countryList))
        showText()
        createBtn(country)
    } else {
        countryList.pop()
    }
}

function upperFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

function printCaseData (country) {
    var numbers = document.querySelector('#numbers')
        numbers.innerHTML = ''

        if (country["Active Cases_text"] === '') {
            var noDataActive = ('<p id="active-cases">Active Cases: no data</p>')
        } else {
            var actCaseNum = country["Active Cases_text"]
            var activeCases = ('<p id="active-cases">Active Cases: ' + actCaseNum + '</p>')
        }

        if(country["New Cases_text"] === ''){
            var noDataNew = ('<p id="active-cases">New Cases: no data</p>')
        } else {
            var newCaseNum = country["New Cases_text"]
            var newCases = ('<p id="new-cases">New Cases: ' + newCaseNum + '</p>')
        }

    $('#numbers').append(activeCases, newCases, noDataActive, noDataNew)


    var totalCaseNum = country['Total Cases_text']
    var totalRecovNum = country['Total Recovered_text']
    var totalDeaths = country['Total Deaths_text']


    JSC.Chart('chartDiv', {
        type: 'horizontal column',
        series: [
            {
                points: [
                {x: 'Total Cases', y: parseInt(totalCaseNum.replace(/,/g, '')) },
                {x: 'Total Recovered', y: parseInt(totalRecovNum.replace(/,/g, '')) },
                {x: 'Active Cases', y: parseInt(actCaseNum.replace(/,/g, '')) },
                {x: 'Total Deaths', y: parseInt(totalDeaths.replace(/,/g, '')) },
                ]
            }
        ]
    });
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

    $('#numbers').append(fullyVaccinated, partiallyVaccinated, noDataFully, noDataPartially)
}


var signUpButton = document.getElementById('btn')

signUpButton.addEventListener('click', function(event) {
    event.preventDefault();

    var name = document.getElementById('contact-name').value;
    var email = document.getElementById('contact-email').value;
    var destination = document.getElementById('destination').value;
    if (name === '') {
        modalEl.style.display = 'flex'
        $('.modal-content').text('Name cannot be blank')
        return
    } else if (email === '') {
        modalEl.style.display = 'flex'
        $('.modal-content').text('Email cannot be blank')
        return
    } else if (destination === '') {
        modalEl.style.display = 'flex'
        $('.modal-content').text('Please enter a county name')
        return
    } else {
        modalEl.style.display = 'flex'
        $('.modal-content').text('Registered successfully')

        userInfo = []
        userInfo.push(name, destination,email)
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }
})


function loadFromLocalStorage(){
    countryList = JSON.parse(localStorage.getItem("countryList"))
    if (!countryList) {
        countryList = []
    } else {
        showText()
        for (var i = 0; i < countryList.length; i++){    
            createBtn(countryList[i])
    }}
}
loadFromLocalStorage()

function createBtn (country) {
    var button = $('<button type="button" class="btn" data-attribute="' + country.toLowerCase() + '">' + country + '</button>')
    $('#btn-group').append(button)
}

function showText () {
    var text = document.getElementById('featured-countries-text')
    text.textContent = ('Click the button below to see results for your featured country:')
}

var featuredCountryClick = function(event) {
    var country = event.target.getAttribute('data-attribute')
    if (country) {
        apiRequests(upperFirst(country))
    }
}
var countryBtn = document.querySelector('#btn-group')
countryBtn.addEventListener('click', featuredCountryClick)
