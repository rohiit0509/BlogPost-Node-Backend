import { Response, Request } from "express";
import getDataModel from "../models/getData";

export const fetchBlog = async (req: Request, res: Response) => {
  // const body= req.body.userId;
  try {
    const title = req.params.title;
    const findData = await getDataModel.findOne({ title: title });
    if (findData) res.status(200).send(findData.body);
    else throw new Error("Post no found");
  } catch (err) {
    res.status(203).send({ msg: err.message });
  }
};
