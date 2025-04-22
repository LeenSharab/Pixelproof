document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("imageUpload");
  const resultCard = document.getElementById("resultCard");
  const resultText = document.getElementById("resultText");

  imageInput.addEventListener("change", async () => {
    const file = imageInput.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    // Reset state
    resultCard.classList.remove("success", "error", "visible");
    resultText.innerHTML = "⏳ Analyzing image...";

    try {
      const response = await fetch("https://3d50-35-245-51-18.ngrok-free.app/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Server error");

      const result = await response.json();
      const isReal = result.prediction === "Real";

      resultText.innerHTML = isReal
        ? "✅ <strong>This image is Real and Untampered.</strong>"
        : "⚠️ <strong>This image is likely Fake or AI-Generated.</strong>";

      resultCard.classList.add(isReal ? "success" : "error", "visible");
    } catch (error) {
      resultText.innerHTML = "❌ Error contacting the prediction server.";
      resultCard.classList.add("error", "visible");
      console.error("Prediction server error:", error);
    }
  });
});
