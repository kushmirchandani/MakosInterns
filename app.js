// Function to check if the user's location is within certain coordinates
function isWithinCoordinates(latitude, longitude) {
    // Define your allowed coordinates (e.g., for a specific classroom)
    const allowedLatitude = 25.73942868813645;
    const allowedLongitude = -80.16674834425794;
    
    // Set a threshold for the allowed range (you can adjust this)
    const threshold = 0.011;

    return (
        Math.abs(latitude - allowedLatitude) < threshold &&
        Math.abs(longitude - allowedLongitude) < threshold
    );
}

// Function to fill in form fields based on location
function fillFormBasedOnLocation(latitude, longitude) {
    const form = document.getElementById('attendance-form');
    const nameInput = document.getElementById('name');
    const studentIdInput = document.getElementById('student-id');

    if (isWithinCoordinates(latitude, longitude)) {
        // Fill in form fields automatically
        nameInput.value = 'John Doe';
        studentIdInput.value = '12345';
        // You can fill in other fields as needed
    }
    else{
        Text("Get Your Ass Back To School!")
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

// Configure QuaggaJS
Quagga.init({
    inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: document.querySelector('#scanner-container'),
    },
    decoder: {
        readers: ['code_128_reader'], // Specify the barcode type you want to scan
    },
});

// Start QuaggaJS when the scan button is clicked
document.querySelector('#scan-barcode-button').addEventListener('click', function () {
    Quagga.start();
});

// Listen for a barcode detection event
Quagga.onDetected(function (result) {
    const barcode = result.codeResult.code;
    document.querySelector('#student-id').value = barcode;
    Quagga.stop();
});

