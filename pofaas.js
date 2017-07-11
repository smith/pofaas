// # POFAAS: Pictures of Food as a Service
//
// With the rise of instagram, it is clearly understood that the real money to
// be made in the Web 3.0 world is on pictures of food.
//
// POFAAS is poised to dominate this world, by taking instagram to the next
// level. In the old world, people had to take pictures of their food to share
// on the internet to impress their friends. POFAAS as made this even easier:
// You don't even need to take pictures, just use our service to provide the
// pictures for you and gain popularity and status among your social media
// betters.
//
// To use, go to:
//
// https://wt-603a504476ed633721dd9ec40a813ded-0.run.webtask.io/pofaas/pizza
//
// in your web browser You will be served an image of delicious pizza.
//
// Try other endpoints like:
//
// https://wt-603a504476ed633721dd9ec40a813ded-0.run.webtask.io/pofaas/salmon
//
// or
//
// https://wt-603a504476ed633721dd9ec40a813ded-0.run.webtask.io/pofaas/paprika
//
// Data is provided by the [Nutritionix API](https://developer.nutritionix.com/).
//
// Please send all VC funding checks to POFAAS, c/o Nathan L Smith, PO Box 175, South Amana, IA 52334.

var request = require("request"),
    url = require("url");

function fetchItem(q, id, key, cb, err) {
  request({
    body: { query: q },
    headers: {
      "x-app-id": id,
      "x-app-key": key,
    },
    json: true,
    method: "POST",
    url: "https://trackapi.nutritionix.com/v2/natural/nutrients",
  }, function(error, response, body) {
    if (body.foods === undefined) {
      cb("Food not found");
    } else {
      cb(undefined, body.foods[0]);
    }
  });
}


function app(ctx, req, res) {
  var itemName = url.parse(req.url).pathname.split("/").pop();
  fetchItem(itemName, ctx.secrets.appId, ctx.secrets.appKey, function (err, item) {
    res.setHeader("Content-Type", "text/html");
    if (err) {
      res.write("Food not found :(");
    } else {
      res.write("<img src='" + item.photo.highres + "' />");
    }
    res.end();
  });
}

module.exports = app;