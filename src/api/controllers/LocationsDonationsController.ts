import { LocationsDonationsType } from "@/service/LocationsDonationsApi";
import Prisma from "@/service/Prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default class LocationsDonationsController {
  static async create(req: NextApiRequest, res: NextApiResponse) {
    const location = req.body as LocationsDonationsType;

    try {
      const newLocation = await Prisma.locations.create({
        data: {
          name: location.name,
          url: location.url,
          address: location.address,
          city: location.city,
        },
      });

      return res.status(201).json(newLocation);
    } catch (error) {
      console.log(error);
      throw new Error("sla");
    }
  }
}
