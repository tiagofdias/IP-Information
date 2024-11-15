const IPIFY_URL = "https://api64.ipify.org?format=json";
const IPSTACK_API_KEY = "b4085840bb07785acfac12a989a27842";

// Function to fetch the user's IP
async function getUserIP() {
    try {
        const response = await fetch(IPIFY_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.ip; // Return the user's IP
    } catch (error) {
        console.error("Failed to fetch user IP:", error);
        throw error;
    }
}

// Function to fetch IP data from IPStack
async function fetchIPData(ip) {
    const IPSTACK_URL = `https://api.ipstack.com/${ip}?access_key=${IPSTACK_API_KEY}`;

    try {
        const response = await fetch(IPSTACK_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();

        // Populate the HTML with JSON data
        document.getElementById("ip").textContent = jsonData.ip;
        document.getElementById("type").textContent = jsonData.type;
        document.getElementById("continent_name").textContent = jsonData.continent_name;
        document.getElementById("country_name").textContent = jsonData.country_name;
        document.getElementById("region_name").textContent = jsonData.region_name;
        document.getElementById("city").textContent = jsonData.city;
        document.getElementById("country_flag").src = jsonData.location.country_flag;
    } catch (error) {
        console.error("Failed to fetch IP data:", error);
        document.getElementById("ip-data").innerHTML = `
            <p>Failed to fetch IP data. Please try again later.</p>
        `;
    }
}

// Main function to initialize the app
async function init() {
    try {
        const userIP = await getUserIP(); // Get the user's IP
        await fetchIPData(userIP);       // Fetch data from IPStack using the IP
    } catch (error) {
        console.error("Initialization failed:", error);
        document.getElementById("ip-data").innerHTML = `
            <p>Initialization failed. Please try again later.</p>
        `;
    }
}

// Event listener for the form submission
document.getElementById("ip-form").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent page reload
    const customIP = document.getElementById("custom-ip").value.trim();

    if (customIP) {
        await fetchIPData(customIP); // Fetch data for the custom IP
    } else {
        init();
    }
});

// Call the main function when the page loads
init();

