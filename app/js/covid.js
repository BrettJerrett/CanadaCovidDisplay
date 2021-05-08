fetch('http://api.opencovid.ca/summary')
.then(async function(response){

    const json = await response.json();

<<<<<<< HEAD
=======
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

>>>>>>> be6d2770d3cc4d31a51a6fca49793641336ec34b
    console.log(json);

    //Function that takes in a province array and updates the appropriate span IDs to display the right information
    function updateData(provinceObject) {
<<<<<<< HEAD
        document.getElementById("provinceName").textContent = provinceObject.province;
        document.getElementById("cases").textContent = provinceObject.cases;
        document.getElementById("active").textContent = provinceObject.active_cases;
        document.getElementById("totalCases").textContent = provinceObject.cumulative_cases;
        document.getElementById("deaths").textContent = provinceObject.deaths;
        document.getElementById("totalDeaths").textContent = provinceObject.cumulative_deaths;
        document.getElementById("recovered").textContent = provinceObject.recovered;
        document.getElementById("totalRecovered").textContent = provinceObject.cumulative_recovered;
        document.getElementById("tests").textContent = provinceObject.testing;
        document.getElementById("totalTests").textContent = provinceObject.cumulative_testing;
        document.getElementById("vaccinated").textContent = (provinceObject.cumulative_avaccine + provinceObject.cumulative_cvaccine + provinceObject.dvaccine);
        document.getElementById("date").textContent = provinceObject.date;
=======
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

>>>>>>> be6d2770d3cc4d31a51a6fca49793641336ec34b
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
<<<<<<< HEAD

                if(provinceId != "canada") {
                    //Pulling the corresponding id from the API and storing it in a const and passing it to updateData();
                    const currentObject = json.summary.filter(provinces => provinces.province === provinceId)[0];
                    updateData(currentObject);
                    break;
                } else {
                    getCountryData();
=======
                console.log(provinceId);
                if(provinceId != "canada") {
                    //Pulling the corresponding id from the API and storing it in a const and passing it to updateData();
                    const currentObject = json.summary.filter(provinces => provinces.province === provinceId);
                    updateData(currentObject);
                    break;
                } else {
                    console.log("testing");
                    totalCountry();
>>>>>>> be6d2770d3cc4d31a51a6fca49793641336ec34b
                }
            }

            element = element.parentNode;
        }
    }
<<<<<<< HEAD
    
    function getCountryData() {

        // This function takes the Provinces and squishes the data
        function combineData(accumulatedCountry, currentProvince) {
            // This grabs the keys (aka property names) of the Province Object
            const keys = Object.keys(currentProvince);
            return keys.reduce((accumulatedProvince, key) => {
                // This is data we don't want to accumulate
                if (key === "testing_info") return accumulatedProvince;

                if (key === "province") {
                    return {
                        ...accumulatedProvince,
                        province: "Canada"
                    }
                };
                
                if (key === "date") {
                    return {
                        ...accumulatedProvince,
                        date: currentProvince[key]
                    }
                };
                
                // This is the last total
                const accumulatedData = accumulatedCountry[key];
                // This is the current number, using a ternary to determine if null, give 0, else get value
                const currentData = currentProvince[key] === "NULL" ? 0 : currentProvince[key];
                // Sum of the above two
                const totalData = accumulatedData + currentData;
                // Spread out the accuulatedProvince object and add the current key and updatedValue to it
                return {
                    ...accumulatedProvince, 
                    [key]: totalData
                };
            }, {});
        }

        //Creating a new object for the Country
        // This function takes the Array of Province Objects and condenses them to 1 Object.
        const countryData =  json.summary.reduce((accumulatedCountry, currentProvince) => {
            return combineData(accumulatedCountry, currentProvince);
        });
        
        //Passing the Country object to the UpdateData function to update the appropriate span tags.
        updateData(countryData);
    }

    getCountryData();
    
=======

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

     totalCountry();
>>>>>>> be6d2770d3cc4d31a51a6fca49793641336ec34b
});