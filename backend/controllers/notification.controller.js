import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
    try {
        const userId = req.user._id;

        const notifications = await Notification.find({ to: userId }).populate({
            path: "from",
            select: "username profileImg"
        });

        await Notification.updateMany({ to: userId }, { read: true });

        return res.status(200).json(notifications);

    } catch (error) {
        console.log("Error in getNotification controller", error.message);
        return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
}

export const deleteNotifications = async (req, res) => {
    try {
        const userId = req.user._id;

        await Notification.deleteMany({ to: userId });

        return res.status(200).json({ message: "Notifications deleted successfully" });

    } catch (error) {
        console.log("Error in deleteNotifications controller", error.message);
        return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
}

export const deleteNotification = async (req, res) => {
    try {

        const { id: notificationId } = req.params;
        const userId = req.user._id;
        const notificationToDelete = await Notification.findById(notificationId);

        if (!notificationToDelete) return res.status(404).json({ error: "Notification not found" });

        if (notificationToDelete.to.toString() !== userId.toString()) {
            return res.status(403).json({ error: "You are not allowed to delete this notification" });
        }

        await Notification.findByIdAndDelete(notificationId);
        return res.status(200).json({ message: "Notification deleted successfully" });


    } catch (error) {
        console.log("Error in deleteNotification controller", error.message);
        return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
}