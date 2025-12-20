const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

// Parse JSON bodies for REST endpoints
app.use(express.json());

// Track tests expect BASE_URL ("/") to return 404
app.get("/", (req, res) => res.status(404).type("text").send("Not Found"));

// Optional: keep the old landing page at a different path
app.get("/hello", (req, res) => res.type("html").send(html));

// --- Recipes REST API (for the Track challenge) ---
let recipes = [
  {
    id: 1,
    title: "チキンカレー",
    making_time: "45分",
    serves: "4人",
    ingredients: "玉ねぎ,肉,スパイス",
    cost: "1000",
  },
  {
    id: 2,
    title: "オムライス",
    making_time: "30分",
    serves: "2人",
    ingredients: "玉ねぎ,卵,スパイス,醤油",
    cost: "700",
  },
  {
    id: 3,
    title: "トマトスープ",
    making_time: "15分",
    serves: "5人",
    ingredients: "玉ねぎ,トマト,スパイス,水",
    cost: "450",
  },
];
let nextId = 4;

// POST /recipes
app.post("/recipes", (req, res) => {
  const { title, making_time, serves, ingredients, cost } = req.body || {};

  if (!title || !making_time || !serves || !ingredients || !cost) {
    return res.status(200).json({
      message: "Recipe creation failed!",
      required: "title, making_time, serves, ingredients, cost",
    });
  }

  const recipe = {
    id: nextId++,
    title,
    making_time,
    serves,
    ingredients,
    cost,
  };

  recipes.push(recipe);

  return res.status(200).json({
    message: "Recipe successfully created!",
    recipe: [recipe],
  });
});

// GET /recipes
app.get("/recipes", (req, res) => {
  return res.status(200).json({ recipes });
});

// GET /recipes/:id
app.get("/recipes/:id", (req, res) => {
  const recipe = recipes.find((r) => r.id === Number(req.params.id));

  if (!recipe) {
    return res.status(404).json({ message: "No Recipe found" });
  }

  return res.status(200).json({
    message: "Recipe details by id",
    recipe: [recipe],
  });
});

// PATCH /recipes/:id
app.patch("/recipes/:id", (req, res) => {
  const recipe = recipes.find((r) => r.id === Number(req.params.id));

  if (!recipe) {
    return res.status(404).json({ message: "No Recipe found" });
  }

  const { title, making_time, serves, ingredients, cost } = req.body || {};

  if (title !== undefined) recipe.title = title;
  if (making_time !== undefined) recipe.making_time = making_time;
  if (serves !== undefined) recipe.serves = serves;
  if (ingredients !== undefined) recipe.ingredients = ingredients;
  if (cost !== undefined) recipe.cost = cost;

  return res.status(200).json({
    message: "Recipe successfully updated!",
    recipe: [recipe],
  });
});

// DELETE /recipes/:id
app.delete("/recipes/:id", (req, res) => {
  const index = recipes.findIndex((r) => r.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: "No Recipe found" });
  }

  recipes.splice(index, 1);

  return res.status(200).json({
    message: "Recipe successfully removed!",
  });
});

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        color: lightpink;
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
      subsection {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: rotate(3deg) translate(-50%, -50%);
      }
      </style>
  </head>
  <body>
    <section>
      Hello from Render!
    </section>
    <subsection>
    無料でサービスをリリースしてみよう！
    </subsection>
  </body>
</html>
`
