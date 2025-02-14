import { StatusCodes } from "http-status-codes";
import { ErrorRequestHandler } from "express";

const errorHandlerMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };
  if (err.name == "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item: any) => item.message)
      .join(",");
    customError.statusCode = 400;
  }
  if (err.name == "CastError") {
    customError.msg = `No item found with id : ${err.value}`;
    customError.statusCode = 404;
  }
  if (err.code && err.code == 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
  }
  // return res.status(customError.statusCode).json({ err });
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

export default errorHandlerMiddleware;
