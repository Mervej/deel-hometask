import { NextFunction, Request, Response } from "express";

class Middleware {
  async getProfile(req: Request, res: Response, next: NextFunction) {
    const { Profile } = req.app.get("models");
    const profile = await Profile.findOne({
      where: { id: req.get("profile_id") || 0 },
    });

    if (!profile)
      return res.status(401).send({
        message: "Invalid profile Id",
      });

    req.params.profile = profile.dataValues;
    next();
  }
}

export default new Middleware();
