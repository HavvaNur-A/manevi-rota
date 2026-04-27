async function generateRoute() {
  const city = document.getElementById("city-select").value;
  const routeType = document.getElementById("route-type").value;

  if (!city) {
    alert("Please select a city!");
    return;
  }

  document.getElementById("result").innerHTML = "Generating your route...";

  const prompt = `Create a one-day spiritual and nature route for ${city}, Turkey.
Route type preference: ${routeType}.
List 4-5 places to visit. For each place include:
- Place name
- Short description (2-3 sentences)
- Why it is spiritually or naturally significant
Format it clearly with numbered list.`;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_KEY_HERE",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "google/gemma-3-4b-it:free",
      messages: [
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await response.json();
  const text = data.choices[0].message.content;

  // Convert markdown to readable HTML
  const formatted = text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n\n/g, "<br><br>")
    .replace(/\n/g, "<br>");

  document.getElementById("result").innerHTML = formatted;

  // Add save button below the result
  document.getElementById("save-btn").style.display = "block";

}
function saveRoute() {
  const city = document.getElementById("city-select").value;
  const routeType = document.getElementById("route-type").value;
  const content = document.getElementById("result").innerHTML;

  // Get existing saved routes or empty array
  const saved = JSON.parse(localStorage.getItem("savedRoutes") || "[]");

  // Add new route
  saved.push({
    id: Date.now(),
    city: city,
    type: routeType,
    content: content,
    date: new Date().toLocaleDateString()
  });

  // Save back to localStorage
  localStorage.setItem("savedRoutes", JSON.stringify(saved));

  alert("Route saved! 🎉");
}

//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