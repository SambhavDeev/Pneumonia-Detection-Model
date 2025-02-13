document.getElementById("uploadForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById("fileInput");
    const resultDiv = document.getElementById("result");
    const disclaimerDiv = document.getElementById("disclaimer");
    const uploadedImageDiv = document.getElementById("uploadedImage");

    if (!fileInput.files.length) {
        resultDiv.innerHTML = `<p class="text-danger">Please select an image.</p>`;
        return;
    }

    // Display the uploaded image
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
        uploadedImageDiv.innerHTML = `<img src="${event.target.result}" alt="Uploaded X-ray" style="max-width: 100%; max-height: 200px;">`;
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("/predict", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (data.error) {
            resultDiv.innerHTML = `<p class="text-danger">Error: ${data.error}</p>`;
        } else {
            // Blinking prediction result
            const predictionClass = data.class.toUpperCase();
            const confidence = data.confidence;
            let color = "green";
            let warning = "";

            if (predictionClass === "PNEUMONIA") {
                color = "red";
                warning = `<p class="text-warning small">⚠️ Warning: Please consult a doctor.</p>`;
            }

            resultDiv.innerHTML = `
                <p class="blinking-${color}"><strong>Prediction:</strong> ${predictionClass}</p>
                <p><strong>Confidence:</strong> ${confidence}%</p>
            `;
            resultDiv.insertAdjacentHTML("beforeend", warning);

            // Disclaimer
            disclaimerDiv.innerHTML = `
                <em>Disclaimer:</em> This prediction is for informational purposes only. 
                Please consult a healthcare professional for accurate diagnosis.
            `;
        }
    } catch (error) {
        resultDiv.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
    }
});

// Fetch dynamic health facts using NewsAPI
async function fetchHealthFacts() {
    const apiKey = "93c6b215ff8341abaecb4ed6082e987e"; // Replace with your actual NewsAPI key
    const url = `https://newsapi.org/v2/top-headlines?category=health&language=en&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data.articles && data.articles.length >= 3) {
            const facts = data.articles.slice(0, 3); // Get the first 3 articles
            document.getElementById("fact-1").textContent = `1. ${facts[0].title}`;
            document.getElementById("fact-2").textContent = `2. ${facts[1].title}`;
            document.getElementById("fact-3").textContent = `3. ${facts[2].title}`;
        } else {
            console.error("Not enough articles available.");
            fallbackHealthFacts();
        }
    } catch (error) {
        console.error("Failed to fetch health facts:", error.message);
        fallbackHealthFacts();
    }
}

// Fallback hardcoded health facts
function fallbackHealthFacts() {
    const defaultFacts = [
        "Regular exercise can reduce the risk of chronic diseases by up to 50%.",
        "Drinking enough water daily helps maintain healthy skin and boosts immunity.",
        "Smoking is a leading cause of pneumonia and other respiratory diseases."
    ];

    document.getElementById("fact-1").textContent = `1. ${defaultFacts[0]}`;
    document.getElementById("fact-2").textContent = `2. ${defaultFacts[1]}`;
    document.getElementById("fact-3").textContent = `3. ${defaultFacts[2]}`;
}

// Call the function to fetch health facts
fetchHealthFacts();