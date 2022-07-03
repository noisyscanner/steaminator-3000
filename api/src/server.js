import Koa from "koa";
import Router from "koa-router";
import cors from "@koa/cors";
import { connect } from "./db.js";

const app = new Koa();
const router = new Router();

const client = await connect();

// TODO:
// - ignore "non dispensable" ingredients when filtering. Eg ice or sugar cubes - return drinks containing these even if not provided in ingredients var
// - add an ingredient category field - ie rum, so we can filter out brands and stuff

router.get("/drinks", async (ctx) => {
  const ingredients = ctx.query.ingredients?.split(",");
  if (!ingredients) {
    throw Error("No ingredients provided");
  }

  const coll = client.db("recipes").collection("recipes");
  const drinks = await coll
    .aggregate([
      {
        $addFields: {
          ingredients: {
            // filter out non dispensable here
            $map: { input: "$ingredients", as: "i", in: "$$i.name" },
          },
        },
      },
      {
        $addFields: {
          matches: { $setIsSubset: ["$ingredients", ingredients] },
        },
      },
      { $match: { matches: true } },
    ])
    .toArray();

  console.log(drinks);

  ctx.body = {
    drinks,
  };
});

app
  .use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      // will only respond with JSON
      ctx.status = err.statusCode || err.status || 500;
      ctx.body = {
        error: err.message,
      };
    }
  })

  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(8081);
