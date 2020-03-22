// Write your JavaScript code here!
window.addEventListener("load", function() {
   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
      let pilotName = document.querySelector("input[name=pilotName]");
      let copilotName = document.querySelector("input[name=copilotName]");
      let fuelLevel = document.querySelector("input[name=fuelLevel]");
      let cargoMass = document.querySelector("input[name=cargoMass]");
      let faultyItems = document.getElementById("faultyItems");

      if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
         alert("All fields are required!");
         event.preventDefault();
      } else {
         // stop the form submission
         event.preventDefault();
         let launchStatus = document.getElementById("launchStatus");
         let fuelStatus = "Fuel level high enough for launch";
         let cargoStatus = "Cargo mass low enough for launch";
      
         if (fuelLevel.value >= 10000 && cargoMass.value <= 10000){
            launchStatus.style.color = "green";
            launchStatus.innerHTML = "Shuttle is ready for launch";
            faultyItems.style.visibility = "hidden";
         }
         else {
            launchStatus.style.color = "red";
            launchStatus.innerHTML = "Shuttle not ready for launch";
            faultyItems.style.visibility = "visible";
            if (fuelLevel.value < 10000){
               fuelStatus = "There is not enough fuel for the journey";
            }
            if (cargoMass.value > 10000){
               cargoStatus = "There is too much mass for the shuttle to take off"
            }
            faultyItems.innerHTML = `<ol>
            <li id="pilotStatus">Pilot Ready: ${pilotName.value}</li>
            <li id="copilotStatus">Co-pilot Ready: ${copilotName.value}</li>
            <li id="fuelStatus">${fuelStatus}</li>
            <li id="cargoStatus">${cargoStatus}</li>
        </ol>`
         }
         
        
      }

  
   });
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then( function(json) {
         let jsonPlanets= json;
         let randomPlanet = Math.round(Math.random() * (jsonPlanets.length-1));
         let missionTarget = document.getElementById("missionTarget");
         missionTarget.innerHTML = `<h2>Mission Destination</h2>
         <ol>
            <li>Name: ${jsonPlanets[randomPlanet].name}</li>
            <li>Diameter: ${jsonPlanets[randomPlanet].diameter}</li>
            <li>Star: ${jsonPlanets[randomPlanet].star}</li>
            <li>Distance from Earth: ${jsonPlanets[randomPlanet].distance}</li>
            <li>Number of Moons: ${jsonPlanets[randomPlanet].moons}</li>
         </ol>
         <img src="${jsonPlanets[randomPlanet].image}">`
         
      });
      } );
});

