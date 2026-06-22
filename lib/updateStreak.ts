import User from "@/models/User";

export async function updateStreak(userId: string) {

    const user = await User.findById(userId);

    const today = new Date().toDateString();

    if (user.lastActiveDate === today) {
        return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (user.lastActiveDate === yesterday.toDateString()) {

        user.streak += 1;

    } else {

        user.streak = 1;

    }

    user.lastActiveDate = today;

    await user.save();
}