"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = void 0;
const api_response_1 = __importDefault(require("../../utils/api-response"));
const async_handler_1 = __importDefault(require("../../utils/async-handler"));
// export const profile = AsyncHandler(async (req, res) => {
//   console.log("test working");
//   const user = req.user;
//   console.log("user is", user?.email);
//   if (!user) {
//     throw new ApiError(400, "Invalid user id");
//   }
//   const profileData = await prisma.user.findUnique({
//     where: {
//       id: user.id,
//     },
//   });
//   return res.json(
//     new ApiResponse(200, {
//       profile: profileData,
//     })
//   );
// });
exports.profile = (0, async_handler_1.default)(async (req, res) => {
    console.log("test working");
    // const user = req.user;
    // console.log("user is", user?.email);
    // if (!user) {
    //   throw new ApiError(400, "Invalid user id");
    // }
    // const profileData = await prisma.user.findUnique({
    //   where: {
    //     id: user.id,
    //   },
    // });
    return res.json(new api_response_1.default(200, {
        // profile: profileData,
        id: 1,
    }));
});
//# sourceMappingURL=user-controller.js.map