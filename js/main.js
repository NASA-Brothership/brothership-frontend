const form = document.getElementById('farm-data-form');
const formsButton = document.getElementById('submit-form');

// Function to get GPS coordinates
function getCoordinates(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            callback(latitude, longitude);
        }, function(error) {
            alert('Error fetching GPS coordinates: ' + error.message);
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}

formsButton.addEventListener('click', function(event) {
    event.preventDefault();
    
    // Retrieve GPS coordinates
    getCoordinates(function(latitude, longitude) {
        const cropType = document.getElementById('crop-type').value.toUpperCase();
        const isIrrigated = document.querySelector('input[name="irrigation"]:checked').value;
        const plantingPeriod = document.querySelector('input[name="plantingPeriod"]:checked').value;
        const existingCrops = document.querySelector('input[name="existingCrops"]:checked').value;

        const requestData = {
            crop_type: cropType,
            latitude: latitude,
            longitude: longitude,
            radius_km: 1,
            is_irrigated: isIrrigated,
            planting_period: plantingPeriod,
            existing_crops: existingCrops
        };

        // Perform REST API call
        fetch('http://localhost:8000/drought-analysis', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            // Display results
            const resultsSection = document.getElementById('results');
            const analysisResults = document.getElementById('analysis-results');
            analysisResults.innerHTML = `
                <p><strong>ndmi_medium (debug):</strong> ${data.ndmi_medium}</p>
                <p><strong>Bad Water Balance Susceptibility:</strong> ${data.sb}</p>
                <p><strong>Moisture Deficit Susceptibility:</strong> ${data.su}</p>
                <p><strong>Crop Susceptibility:</strong> ${data.susceptibility}</p>
                <p><strong>wbi_medium (debug):</strong> ${data.wbi_medium}</p>
            `;
            resultsSection.style.display = 'block';

            // Scroll to the results section smoothly
            resultsSection.scrollIntoView({ behavior: 'smooth' });
        })
        .catch(error => console.error('Error:', error));
    });
});

function resetForm() {
    form.reset();
    document.getElementById('results').style.display = 'none';
}
