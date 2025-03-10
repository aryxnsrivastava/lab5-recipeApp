document.getElementById('fetchRecipes').addEventListener('click', async() =>{
    const query = document.getElementById('query').value;
    const diet = document.getElementById('diet').value;

    try{
        const response = await fetch(`https://lab5-recipeapp.onrender.com/recipes?query=${query}&diet=${diet}`);
        const data = await response.json();

        if(data.results && data.results.length > 0){
            document.getElementById('recipeList').innerHTML = data.results.map(recipe => `
                <div class="recipe-item bg-white p-4 rounded-lg shadow-md mb-4 cursor-pointer" data-id="${recipe.id}">
                    <h3 class="text-lg font-semibold">${recipe.title}</h3>
                    <img src="${recipe.image}" class="w-full rounded-lg mt-2">
                    <button class="view-recipe-btn bg-green-500 text-white p-2 rounded mt-2" data-id="${recipe.id}">
                        View Recipe
                    </button>
                </div>
            `).join('');

            document.querySelectorAll('.view-recipe-btn').forEach(button =>{
                button.addEventListener('click', (event) => {
                    const recipeId = event.target.dataset.id;
                    window.location.href = `recipe.html?id=${recipeId}`
                });
            });
        } 
        else{
            document.getElementById('recipeList').innerHTML = "<p class='text-red-500'>No recipes found.</p>";
        }
    } 
    catch(error){
        console.error(error);
        document.getElementById('recipeList').innerHTML = "<p class='text-red-500'>Error fetching recipes.</p>";
    }
});
