import { ApiResponse } from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";
export const healthCheck = asyncHandler(async (req, res, next) => {
    return res.status(200).json(new ApiResponse(200,"Health check passed","OK"));
})