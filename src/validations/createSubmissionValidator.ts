//validation middleware

import { ZodSchema } from "zod";

import { NextFunction, Request, Response } from "express";


export const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        ...req.body,
      });

      next();
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        error: {
          message: error,
        },

        data: {},
      });
    }
  };