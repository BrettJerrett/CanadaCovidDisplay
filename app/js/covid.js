fetch('http://api.opencovid.ca/summary')
.then(async function(response){

    const json = await response.json();


    //Function that takes in a province array and updates the appropriate span IDs to display the right information
    function updateData(provinceObject) {
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

                if(provinceId != "canada") {
                    //Pulling the corresponding id from the API and storing it in a const and passing it to updateData();
                    const currentObject = json.summary.filter(provinces => provinces.province === provinceId)[0];
                    updateData(currentObject);
                    break;
                } else {
                    getCountryData();

                }
            }

            element = element.parentNode;
        }
    }
    
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
    
});