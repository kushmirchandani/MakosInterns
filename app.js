function isWithinCoordinates(latitude, longitude) {
    // Define your allowed coordinates (e.g., for a specific classroom)
    const allowedLatitude = 25.73942868813645;
    const allowedLongitude = -80.16674834425794;

    // Set a threshold for the allowed range (you can adjust this)
    const threshold = 0.01; // Adjust as needed

    return (
        Math.abs(latitude - allowedLatitude) < threshold &&
        Math.abs(longitude - allowedLongitude) < threshold
    );
}
function isAllowedTime() {
    const currentDate = new Date();
    const currentHour = currentDate.getUTCHours() - 5; // Convert to EST
    const currentMinute = currentDate.getUTCMinutes();

    // Check if it's 1:10 PM EST
    return currentHour === 13 && currentMinute === 10;
}

// Function to fill in form fields based on location
function fillFormBasedOnLocation(latitude, longitude) {
    const locationStatus = document.getElementById('locationStatus');
    const timeStatus = document.getElementById('timeStatus');

    if (isWithinCoordinates(latitude, longitude)) {
        locationStatus.innerText = 'Inside School';
        if (isAllowedTime()) {
            timeStatus.innerText = 'Allowed Time';
        } else {
            timeStatus.innerText = 'Not Allowed Time';
        }
    } else {
        locationStatus.innerText = 'Outside School';
        timeStatus.innerText = 'Not Allowed Time';
    }
}

// Request the user's location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Check if the user is within the allowed coordinates and fill the form
        fillFormBasedOnLocation(latitude, longitude);
    });
}

document.getElementById("attendance-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
  
    // Serialize the form data
    var formData = new FormData(this);
  
    // Send an AJAX request to your Google Apps Script
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://script.google.com/macros/s/AKfycbzxadU2a2cPBlm90wN0wrWZRKrlNTuZwsCOGJ6eIh3k8YIJo4yUPukxkAUNXOEIqIG2/exec", true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            // Redirect to the success.html page
            window.location.href = "https://www.apple.com/";
          } else {
            console.error("Error:", xhr.responseText);
          }
        };
    // Send the form data
    xhr.send(formData);
  });
  