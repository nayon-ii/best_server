// src\app\middleware\checkSubscriptionExpiry.ts
import { Request, Response, NextFunction } from "express";
import { User } from "../../features/user/user.model";
import { logger } from "../utils/logger";

// Cache to avoid checking same user multiple times in short period
const checkedUsers = new Map<string, number>();
const CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes

export const checkSubscriptionExpiry = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Skip if no authenticated user
    if (!req.user?.id) {
      return next();
    }

    const userId = req.user.id;

    // Skip if recently checked (within CHECK_INTERVAL)
    const lastChecked = checkedUsers.get(userId);
    const now = Date.now();

    if (lastChecked && now - lastChecked < CHECK_INTERVAL) {
      return next();
    }

    // Mark as checked
    checkedUsers.set(userId, now);

    // Clean up old entries (prevent memory leak)
    if (checkedUsers.size > 1000) {
      const cutoff = now - CHECK_INTERVAL;
      for (const [id, time] of checkedUsers.entries()) {
        if (time < cutoff) {
          checkedUsers.delete(id);
        }
      }
    }

    // Find user with subscription data
    const user = await User.findById(userId).select(
      "isSubscribed subscription"
    );

    if (!user) {
      logger.warn(`User not found for subscription check: ${userId}`);
      return next();
    }

    // Uncomment when implementing subscription feature
    // if (user.isSubscribed && user.subscription?.endDate) {
    //   const subscriptionEndDate = new Date(user.subscription.endDate);

    //   // If subscription has expired
    //   if (now > subscriptionEndDate.getTime()) {
    //     logger.info(
    //       `Subscription expired for user ${user._id}, updating status`
    //     );

    //     await User.findByIdAndUpdate(user._id, {
    //       $set: {
    //         isSubscribed: false,
    //         "subscription.status": "expired",
    //       }
    //     });

    //     // Update req.user to reflect the change
    //     req.user.isSubscribed = false;
    //   }
    // }

    next();
  } catch (error) {
    logger.error("Error checking subscription expiry:", error);
    next(); // Continue even if check fails - don't block user
  }
};
