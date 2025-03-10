async function fetchRecipeDetails(){
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');

    if(!recipeId){
        document.getElementById('recipeDetails').innerHTML = "<p class='text-red-500'>Invalid recipe ID.</p>";
        return;
    }

    try{
        const response = await fetch(`http://localhost:3000/recipe/${recipeId}`);
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched recipe details:", data);

        document.getElementById('recipeDetails').innerHTML = `
            <h2 class="text-2xl font-bold">${data.title}</h2>
            <p class="mt-4">${data.summary || "No description available."}</p>
            <h3 class="text-xl font-semibold mt-4">Ingredients:</h3>
            <ul class="list-disc ml-6">
                ${data.extendedIngredients ? data.extendedIngredients.map(ing => `<li>${ing.original}</li>`).join('') : "<li>No ingredients listed.</li>"}
            </ul>
            <h3 class="text-xl font-semibold mt-4">Instructions:</h3>
            <p>${data.instructions || "No instructions available."}</p>
        `;

    } 
    catch(error){
        console.error("Error fetching recipe details:", error);
        document.getElementById('recipeDetails').innerHTML = "<p class='text-red-500'>Error fetching recipe details.</p>";
    }
}

fetchRecipeDetails();
