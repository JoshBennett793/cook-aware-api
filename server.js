import express from 'express'
const app = express()

app.set('port', process.env.PORT || 3001)
app.locals.title = 'Cook Aware API'
app.locals.recipes = [
  {
    id: 1,
    title: 'Ceaser Salad'
  },
  {
    id: 2,
    title: 'Lembas Bread'
  }
]

app.listen(app.get('port'), () => {
  console.log(
    `${app.locals.title} is running on http://localhost:${app.get('port')}`
  )
})

app.get('/api/v1/recipes', (request, response) => {
  const { id } = request.query
  if (id) {
    // If 'id' query parameter is provided, find the recipe by ID
    const recipe = app.locals.recipes.find(recipe => recipe.id === parseInt(id))
    if (!recipe) {
      return response.sendStatus(404)
    }
    return response.status(200).json(recipe)
  } else {
    // If 'id' query parameter is not provided, return the entire array of recipes
    return response.json({ recipes: app.locals.recipes })
  }
})
