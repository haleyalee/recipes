import { Pool } from "pg";

// PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER,        
  host: process.env.DB_HOST,        
  database: process.env.DB_NAME,   
  password: process.env.DB_PASSWORD,
  port: 5432,                      
});

export default pool;

// --- List of Relations ---------------------
// public | categories         | table | haley        stores unique categories like "dinner", "dessert"
// public | ingredients        | table | haley        stores unique ingredients like "eggs", "spaghetti"
// public | recipe_categories  | table | haley        links recipes to categories since a recipe can belong to multiple categories
// public | recipe_data        | table | haley        stores instructions and optional notes for each recipe
// public | recipe_ingredients | table | haley        links recipes to ingredients since recipes have multiple ingredients
// public | recipes            | table | haley        stores basic recipe details like id and name