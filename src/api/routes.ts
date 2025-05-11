import { NextApiRequest, NextApiResponse } from "next";
import { NextConnect } from "next-connect";
import bodyParser from "./middlewares/BodyParser";
import NewsController from "./controllers/NewsController";
import LocationsDonationsController from "./controllers/LocationsDonationsController";

export default function routes(
  api: NextConnect<NextApiRequest, NextApiResponse>
) {
  api.use(bodyParser);

  api.get("/news", NewsController.list);
  api.post("/news", NewsController.create);

  api.post("/locations-donations", LocationsDonationsController.create);

  return api;
}
