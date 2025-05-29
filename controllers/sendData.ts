import { Request, Response } from "express";
import getDataModel from "../models/getData";

export const sendData = async (req: Request, res: Response) => {
    try {
        const fetchData = await getDataModel
            .find({})
            .populate("userId", "userName userProfile");

        if (fetchData) {
            res.status(200).send(fetchData);
        } else {
            throw new Error("Something went wrong");
        }
    } catch (err: any) {
        res.status(500).send({ msg: err.message });
    }
};
