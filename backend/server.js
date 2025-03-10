import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());

app.get('/recipes', async (req, res) =>{
    const query = req.query.query || "";
    const diet = req.query.diet || "";

    try{
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&diet=${diet}&number=8&apiKey=${process.env.API_KEY}`);
        const data = await response.json();
        res.json(data);
    } 
    catch(error){
        res.status(500).json({error: "Server error, please try later!"});
    }
});

app.get('/recipe/:id', async (req, res) =>{
    const recipeId = req.params.id;

    try{
        const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.API_KEY}`);
        const data = await response.json();
        res.json(data);
    } 
    catch(error){
        res.status(500).json({error: "Server error, please try later!" });
    }
});


app.listen(3000, () => console.log("Server running on port 3000"));