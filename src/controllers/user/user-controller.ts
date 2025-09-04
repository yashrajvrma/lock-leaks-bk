import prisma from "../../config/db-config";
import ApiError from "../../utils/api-error";
import ApiResponse from "../../utils/api-response";
import AsyncHandler from "../../utils/async-handler";

export const profile = AsyncHandler(async (req, res) => {
  console.log("test working");
  const user = req.user;
  console.log("user is", user?.email);

  if (!user || !user?.id) {
    throw new ApiError(400, "User is required");
  }

  const userData = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      id: true,
      email: true,
      platform: {
        select: {
          platform: true,
          username: true,
          contactWhatsappNumber: true,
          contactEmail: true,
          contactLiveChat: true,
          contactPhoneNumber: true,
        },
      },
      price: {
        select: {
          name: true,
          billed: true,
        },
      },
    },
  });

  if (!userData) {
    throw new ApiError(400, "Invalid user id");
  }

  return res.json(
    new ApiResponse(200, {
      userData,
    })
  );
});
