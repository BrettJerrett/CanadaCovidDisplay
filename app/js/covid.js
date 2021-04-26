fetch('http://api.opencovid.ca/summary')
.then(async function(response){

    const json = await response.json();

    const provName = document.getElementById("provinceName");
    const cases = document.getElementById("cases");
    const active = document.getElementById("active");
    const totalCases = document.getElementById("totalCases");
    const deaths = document.getElementById("deaths");
    const totalDeaths = document.getElementById("totalDeaths");
    const recovered = document.getElementById("recovered");
    const totalRecovered = document.getElementById("totalRecovered");
    const test = document.getElementById("test");
    const totalTests = document.getElementById("totalTests");
    const vaccinated = document.getElementById("vaccinated");
    const date = document.getElementById("date");

    // console.log(json);

    //Function that takes in a province array and updates the appropriate span IDs to display the right information
    function updateData(provinceObject) {
        provName.textContent = provinceObject[0].province;
        cases.textContent = provinceObject[0].cases;
        active.textContent = provinceObject[0].active_cases;
        totalCases.textContent = provinceObject[0].cumulative_cases;
        deaths.textContent = provinceObject[0].deaths;
        totalDeaths.textContent = provinceObject[0].cumulative_deaths;
        recovered.textContent = provinceObject[0].recovered;
        totalRecovered.textContent = provinceObject[0].cumulative_recovered;
        tests.textContent = provinceObject[0].testing;
        totalTests.textContent = provinceObject[0].cumulative_testing;
        vaccinated.textContent = (provinceObject[0].cumulative_avaccine + provinceObject[0].cumulative_cvaccine + provinceObject[0].dvaccine);
        date.textContent = provinceObject[0].date;

        // console.log(provinceObject[0]);

    }

    if (document.addEventListener) {
        document.addEventListener("click", findClick, false);
    }
    else if (document.attachEvent) {
        document.attachEvent("onclick", findClick);
    }

    //Function that identifies that a button is being clicked by class "provinceButtons"
    function findClick(event) {
        event = event || window.event;
        event.target = event.target || event.srcElement;

        let element = event.target;

        //Climb up the document tree from the target of the event
        while (element) {
            if (element.nodeName === "BUTTON" && /provinceButtons/.test(element.className)) {

                //Identifying the id of the button being pressed.
                let provinceId = element.getAttribute("id");
                console.log(provinceId);
                if(provinceId != "canada") {
                    //Pulling the corresponding id from the API and storing it in a const and passing it to updateData();
                    const currentObject = json.summary.filter(provinces => provinces.province === provinceId);
                    updateData(currentObject);
                    break;
                } else {
                    console.log("testing");
                    totalCountry();
                }
            }

            element = element.parentNode;
        }
    }

    function totalCountry(){
        var casesFed = 0;
        var activeFed = 0;
        var totalCasesFed = 0;
        var deathsFed = 0;
        var totalDeathsFed = 0;
        var recoveredFed = 0;
        var totalRecoveredFed = 0;
        var testFed = 0;
        var totalTestsFed = 0;
        // var vaccinatedFed = document.getElementById("vaccinated");
        // var dateFed = document.getElementById("date");

        json.summary.forEach(async function(provSum) {
            if(typeof provSum.cases == 'number'){
                casesFed += provSum.cases;
            }

            if(typeof provSum.active_cases == 'number'){
                activeFed += provSum.active_cases;
            }

            if(typeof provSum.cumulative_cases == 'number'){
                totalCasesFed += provSum.cumulative_cases;
            }

            if(typeof provSum.deaths == 'number'){
                deathsFed += provSum.deaths;
            }

            if(typeof provSum.cumulative_deaths == 'number'){
                totalDeathsFed += provSum.cumulative_deaths;
            }

            if(typeof provSum.recovered == 'number'){
                recoveredFed += provSum.recovered;
            }

            if(typeof provSum.recovered == 'number'){
                totalRecoveredFed += provSum.recovered;
            }

            //Cycle back on this
            if(typeof provSum.testing == 'number'){
                testFed += provSum.testing;
            }

            if(typeof provSum.cumulative_testing == 'number'){
                totalTestsFed += provSum.cumulative_testing;
            }

            console.log(json.summary[0]);
        });

        provName.textContent = "Canada";
        cases.textContent = casesFed;
        active.textContent = activeFed;
        totalCases.textContent = totalCasesFed;
        deaths.textContent = deathsFed;
        totalDeaths.textContent = totalDeathsFed;
        recovered.textContent = recoveredFed;
        totalRecovered.textContent = totalRecoveredFed;
        tests.textContent = testFed;
        totalTests.textContent = totalTestsFed;
        // vaccinated.textContent = (provinceObject[0].cumulative_avaccine + provinceObject[0].cumulative_cvaccine + provinceObject[0].dvaccine);
         date.textContent = json.summary[0].date;
    }

    // totalCountry();


});