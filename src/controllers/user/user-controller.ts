import prisma from "../../config/db-config";
import ApiError from "../../utils/api-error";
import ApiResponse from "../../utils/api-response";
import AsyncHandler from "../../utils/async-handler";

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

export const profile = AsyncHandler(async (req, res) => {
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

  return res.json(
    new ApiResponse(200, {
      // profile: profileData,
      id: 1,
    })
  );
});
