document.addEventListener('DOMContentLoaded', function() {
    attendanceForm.style.display = 'none'
    function isWithinCoordinates(latitude, longitude) {
        const allowedLatitude = 25.739485570895898;
        const allowedLongitude = -80.16671002055492;

        // Set a threshold for the allowed range (you can adjust this)
        const threshold = 0.02; // Adjust as needed

        return (
            Math.abs(latitude - allowedLatitude) < threshold &&
            Math.abs(longitude - allowedLongitude) < threshold
        );
    }

    function isAllowedTime() {
        const currentDate = new Date();
        const currentHour = currentDate.getUTCHours(); // Convert to EST
        const currentMinute = currentDate.getUTCMinutes();

        // Check if it's within the allowed time period (adjust as needed)
        return currentHour >= 13 && currentHour < 23; // Example: 8 AM to 1 PM EST
    }

    // Function to update form fields based on location and time
    function updateFormFields(latitude, longitude) {
        const locationStatus = document.getElementById('locationStatus');
        const timeStatus = document.getElementById('timeStatus');
        const submitButton = document.getElementById('submitButton'); // Added ID to the submit button

        // Log the received latitude and longitude for debugging
        console.log('Received latitude:', latitude);
        console.log('Received longitude:', longitude);
        if (isWithinCoordinates(latitude, longitude)) {
            locationStatus.innerText = 'Inside School';
            attendanceForm.style.display = 'block' // Show the submit button
        } else {
            locationStatus.innerText = 'Outside School';
            attendanceForm.style.display = 'none' // Hide the submit button
        }
        if(isAllowedTime()){
            timeStatus.innerText = 'Allowed Time';
            attendanceForm.style.display = 'block'
        } else {
            timeStatus.innerText = 'Not Time Yet';
            attendanceForm.style.display = 'none'
        }
        // if (isWithinCoordinates(latitude, longitude) && isAllowedTime()) {
        //     locationStatus.innerText = 'Inside School';
        //     timeStatus.innerText = 'Allowed Time';
        //     submitButton.style.display = 'block'; // Show the submit button
        // } else {
        //     locationStatus.innerText = 'Outside School';
        //     timeStatus.innerText = 'Not Allowed Time';
        //     submitButton.style.display = 'none'; // Hide the submit button
        // }
    }

    // Request the user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            // console.log(location.coords.latitude);
            // console.log(location.coords.longitude);
            
           console.log('Received latitude:', latitude);
            console.log('Received longitude:', longitude);

            // Update form fields based on location and time
            updateFormFields(latitude, longitude);
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
                // Show the "Received" message
                document.getElementById("receivedMessage").style.display = "block";
            } else {
                console.error("Error:", xhr.responseText);
            }
        };
        // Send the form data
        xhr.send(formData);
    });
});
