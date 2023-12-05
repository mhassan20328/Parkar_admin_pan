    // Function to get the image source based on the spot type
    function getImageSrc(spotType) {
        return spotType + '.png';
    }
    // Sample data
    const parkingspots = ["empty", "occupied", "occupied", "empty", "occupied","occupied", "occupied", "occupied", "empty", "occupied",
    "occupied", "empty", "occupied", "occupied", "occupied","occupied", "empty", "occupied",
     "empty", "occupied","occupied", "empty", "occupied", "empty", "occupied", "occupied"];
    const spotTypes = ["parking", "electric", "electric", "parking","parking",
    "parking", "electric", "disabilty", "parking","parking","parking", "electric", "disabilty", "parking","parking","parking", "electric", "disabilty", "parking","parking",
    "parking", "electric", "disabilty", "parking","parking","parking"];
    const rowLimit = 15;
    console.log(parkingspots.length);
    console.log(spotTypes.length);
 



    const parkingContainer = document.getElementById('parkingContainer');
    const amountOfSpotsElement = document.getElementById('amountofspots');
    const spotsLeftElement = document.getElementById('spotsleft');
    const totalSpots = parkingspots.length;
    const availableSpots = parkingspots.filter(spot => spot === "empty").length;


    // Update the content of the amountOfSpotsElement
    amountOfSpotsElement.textContent = `Amount of Spots: ${totalSpots}`;

    // Update the content of the spotsLeftElement
    spotsLeftElement.textContent = `Amount of Spots Available: ${availableSpots}`;


    // Loop through the parking spots array
    for (let i = 0; i < parkingspots.length; i++) {
        // Create a div element for each parking spot
        const spotDiv = document.createElement('div');

        // Set the class based on the parking spot status (occupied/empty)
        spotDiv.classList.add(parkingspots[i]);

        const img = document.createElement('img');
        img.src = getImageSrc(spotTypes[i]); 
        img.alt = spotTypes[i] + ' spot';

        // Set the filter property based on the parking spot status
        if (parkingspots[i] === "occupied") {
            img.style.filter = "invert(37%) sepia(91%) saturate(745%) hue-rotate(0deg) brightness(89%) contrast(90%)";        } else {
            // Reset the filter for empty spots
            img.style.filter = "none";
        }

        // Append the image to the parking spot div
        spotDiv.appendChild(img);

        // Append the parking spot div to the container
        parkingContainer.appendChild(spotDiv);

        // Add a line break after every 'rowLimit' spots
        if ((i + 1) % rowLimit === 0) {
            parkingContainer.appendChild(document.createElement('br'));
        }
    }


;