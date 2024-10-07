const form = document.getElementById('farm-data-form');
const formsButton = document.getElementById('submit-form');
const loader = document.getElementById('loader');

const recommendations = {
    "VERY_LOW_RISK_WITH_CULTURE": "Very low risk. Favorable conditions, with no signs of imminent water stress. The likelihood of drought affecting production is minimal. Suggested action: Continue with standard agricultural management.; Routinely monitor soil moisture and plant conditions; however, no significant changes are required.; Use conservation practices, such as soil cover, to ensure moisture retention.",
    "LOW_RISK_WITH_CULTURE": "Low risk. Although the risk is low, taking light preventive measures can help avoid increased water stress if weather conditions change unexpectedly. Suggested action: Continue monitoring soil and plant health, with a focus on the crop growth stage.; Check the efficiency of the irrigation system and make preventive adjustments if necessary.; Implement water retention practices in the soil, such as mulching or soil preparation that minimizes moisture loss.",
    "MEDIUM_RISK_WITH_CULTURE_WITH_IRRIGATION": "Medium risk. There is a considerable risk of water stress, which justifies more direct interventions to prevent productivity losses. Suggested action: Adjust the irrigation plan, ensuring that water is applied efficiently, especially in the most critical areas of the field.; In addition to the irrigation system, consider alternative strategies such as supplemental sprinkler or drip irrigation.; Evaluate the use of biostimulants that help plants cope better with water stress.; Encourage the use of soil cover to reduce evaporation and improve moisture retention.",
    "MEDIUM_RISK_WITH_CULTURE_WITHOUT_IRRIGATION": "Medium risk. The suggested actions primarily aim to conserve soil moisture and minimize evapotranspiration, as the plants may be starting to experience water stress, but there is still room to prevent severe damage. Water retention through soil cover and the use of cover crops helps extend moisture availability, while careful management of weeding prevents the soil from drying out more quickly. Suggested action: Use of Soil Cover (Mulching), apply straw, crop residues, or vegetative cover on the soil around plants to reduce water evaporation. This can also help maintain lower soil temperatures and reduce competition from weeds for water.; Selective Weeding, avoid excessive removal of weeds that may serve as natural cover, but eliminate those that directly compete with the crop for water. Selective weeding can help conserve soil moisture.; Increase the Density of Cover Crops, using fast-growing cover crops between the rows of the main crop can help conserve soil moisture while also improving soil quality in the medium term.; Use of Water Retaining Additives (Polymers), if available, apply water-retaining polymers to the soil, which can increase the soil's capacity to store water for plants during periods of water stress.",
    "HIGH_RISK_WITH_CULTURE_WITH_IRRIGATION": "High risk. The situation of water deficit is imminent, and more intensive actions are necessary to prevent severe losses. Suggested Action: Apply immediate irrigation in the most critical areas, prioritizing the use of efficient systems, such as drip irrigation, to minimize water waste.; If possible, adjust the management calendar by advancing harvests in perennial crops or modifying fertilization to help plants cope with water stress.",
    "HIGH_RISK_WITH_CULTURE_WITHOUT_IRRIGATION": "High risk. At this level, water stress is a real threat, and the actions aim to concentrate the limited water resources on the most important plants. Thinning reduces competition for water, while management adjustments, such as early harvesting, help prevent significant losses. Containment barriers and strategic weeding minimize evaporation and water runoff. Suggested Actions: Thinning (Plant Reducing), reduce plant density by removing some of them to decrease competition for water. This may be a drastic measure, but in high-risk conditions, it can help the remaining plants survive with the limited available water.; Strategic Weeding, avoid intensive soil disturbance during weeding, as this can expose the soil to more sunlight and increase evaporation. Perform weeding only where absolutely necessary.; Soil and Water Conservation, create barriers or containment furrows to hold as much water as possible that may still be in the soil or that may be received from light rainfall, preventing surface runoff.; Reduced Fertilization, decrease the amount of nitrogen fertilization or suspend the use of fertilizers that may require more soil water for plant assimilation, as this can increase water stress.; Adjustment of Management Calendar, if possible, advance the harvest or pruning of perennial crops to reduce water demand during critical phases, especially when the plants are already in advanced stages of growth.",
    "VERY_HIGH_RISK_WITH_CULTURE_WITH_IRRIGATION": "Very high risk. The likelihood of significant losses is very high, necessitating swift and decisive responses to minimize the impact of drought on crops. Suggested Action: Implement emergency irrigation, prioritizing areas and crops of higher economic value or those more sensitive to water scarcity.; Reduce plant density in critical cases, if possible, to decrease competition for water resources.; Immediately adjust any operations that consume or expose the soil to additional water losses, such as frequent weeding or unplanned fertilization.; If feasible, consider implementing contingency strategies, such as adopting drought management techniques (e.g., pruning or thinning plants to reduce water demand).",
    "VERY_HIGH_RISK_WITH_CULTURE_WITHOUT_IRRIGATION": "Very high risk. In situations of very high risk, the primary goal is to save as much production as possible with extremely limited resources. Sacrificing part of the crop and emergency pruning reduce water demand, while the application of organic matter to the soil retains the little remaining moisture. These measures, although drastic, are necessary to ensure that at least part of the crop survives or is harvested before total collapse. Suggested Actions: Sacrifice Part of the Crop, in extreme cases, the producer may need to choose to sacrifice part of the crop to concentrate resources (available water in the soil and nutrients) in the more productive areas. This can help save part of the production.; Pruning or Early Cutting, for perennial crops, such as fruit trees, emergency pruning may be an option. This reduces leaf area and, consequently, water demand, helping the plant survive until conditions improve.; Reduction in Input Use, suspend the application of inputs that may increase the water demand of plants, such as nitrogen fertilizers, and reduce any practices that involve intensive crop management.; Application of Organic Materials to the Soil, spreading organic compost, manure, or other plant residues can help improve the soil's ability to retain the little available moisture, in addition to providing nutrients that can help plants cope with water stress.; Alter Harvesting Scheme, in cases of very high risk, it is essential to adjust the harvest to minimize losses. Harvesting crops that are close to maturity early can prevent total losses.",
    "LOW_RISK_WITHOUT_CULTURE_WITH_IRRIGATION_BEFORE_AFTER_PLANTING_PERIOD": "Start planting. For very low or low risks, planting can be safely done regardless of the period, although some caution should be exercised outside the ideal period.",
    "MEDIUM_RISK_WITHOUT_CULTURE_WITH_IRRIGATION_BEFORE_AFTER_PLANTING_PERIOD": "Wait to plant. For medium risks, planting is recommended only during the ideal period, with precautions to mitigate water stress.",
    "HIGH_RISK_WITHOUT_CULTURE_WITH_IRRIGATION_BEFORE_AFTER_PLANTING_PERIOD": "Wait to plant. For high or very high risks, planting should not be conducted, as dry conditions will make the establishment and growth of the crop unfeasible, especially outside the ideal period.",
    "LOW_RISK_WITHOUT_CULTURE_WITH_IRRIGATION_DURING_PLANTING_PERIOD": "Start planting. For very low, low or medium risks, planting can be safely done regardless of the period, although some caution should be exercised outside the ideal period. With greater caution in the case of medium risk.",
    "HIGH_RISK_WITHOUT_CULTURE_WITH_IRRIGATION_DURING_PLANTING_PERIOD": "Wait to plant. For high or very high risks, planting should not be conducted, as dry conditions will make the establishment and growth of the crop unfeasible, especially outside the ideal period.",
    "LOW_RISK_WITHOUT_CULTURE_WITHOUT_IRRIGATION_BEFORE_AFTER_PLANTING_PERIOD": "Start planting. For very low or low risks, planting is viable without irrigation, with some caution exercised outside the ideal period.",
    "MEDIUM_RISK_WITHOUT_CULTURE_WITHOUT_IRRIGATION_BEFORE_AFTER_PLANTING_PERIOD": "Wait to plant. For medium risk, planting is advised only during the ideal period, accompanied by water conservation measures.",
    "HIGH_RISK_WITHOUT_CULTURE_WITHOUT_IRRIGATION_BEFORE_AFTER_PLANTING_PERIOD": "Wait to plant. For high or very high risks, planting should not be conducted, as the lack of irrigation and elevated drought risk render production unfeasible.",
    "LOW_RISK_WITHOUT_CULTURE_WITHOUT_IRRIGATION_DURING_PLANTING_PERIOD": "Start planting. For very low or low risks, planting is viable without irrigation, with some caution exercised outside the ideal period.",
    "HIGH_RISK_WITHOUT_CULTURE_WITHOUT_IRRIGATION_DURING_PLANTING_PERIOD": "Wait to plant. For medium, high or very high risks, planting should not be conducted, as the lack of irrigation and elevated drought risk render production unfeasible."
};

// Carregar lista de plantas ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    const cropTypeSelect = document.getElementById('crop-type');

    // Fetch the list of plants from the backend
    fetch('http://localhost:8000/plants')
        .then(response => response.json())
        .then(plants => {
            // Clear existing options
            cropTypeSelect.innerHTML = '';
            
            // Add default option
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Select Crop';
            cropTypeSelect.appendChild(defaultOption);

            // Populate the select input with the list of plants
            plants.forEach(plant => {
                const option = document.createElement('option');
                option.value = plant;  // Use lowercase value
                option.textContent = plant;
                cropTypeSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching plant list:', error);
            cropTypeSelect.innerHTML = '<option value="">Error loading crops</option>';
        });
});

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

    // Show the loader
    loader.style.display = 'block';

    // Retrieve GPS coordinates
    getCoordinates(function(latitude, longitude) {
        const cropType = document.getElementById('crop-type').value;
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
            loader.style.display = 'none';
        
            const recommendationKey = data.recomentation;  
            const recommendation = recommendations[recommendationKey] || 'No recommendation available for this risk level.';

            const resultsSection = document.getElementById('results');
            const analysisResults = document.getElementById('analysis-results');
            analysisResults.innerHTML = `
                <p><strong>Drought risk:</strong> ${data.drought_risk}</p>
                <p><strong>Sum Precipitation (Next 14 weeks):</strong> ${data.precipitation_mean.toFixed(2)} mm</p>
                <p><strong>Cultural Susceptibility (sc):</strong> ${data.sc}</p>
                <p><strong>Moisture Susceptibility (su):</strong> ${data.su}</p>
                <p><strong>Hydro Balance Susceptibility (sb):</strong> ${data.sb}</p>
                <p><strong>Precipitation Prediction Susceptibility (spt):</strong> ${data.spt}</p>
                <p><strong>Recommendation:</strong> ${recommendation}</p>
            `;
            resultsSection.style.display = 'block';
            resultsSection.scrollIntoView({ behavior: 'smooth' });
        })
        .catch(error => {
            loader.style.display = 'none';
            console.error('Error:', error);
        });
    });
});

function resetForm() {
    form.reset();
    document.getElementById('results').style.display = 'none';
}
