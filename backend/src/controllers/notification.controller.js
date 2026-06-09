import Notification from "../models/Notification.js";

export const getNotifications = async(req, res)=>{
    try{
        const notifications = await Notificationotification.find({
            user:req.user._id,
        }).sort({createdAt:-1});

        return res.status(200).json({
            totalNotifications: notifications.length,
            notifications,
        });
    }catch(error){
        return res.status(500).json({
            message:"Server Error",
            error:error.message
        });
    }
};

//mark notification read
export const markAsRead = async(req, res)=>{
    try{
        const notification = await Notification.findById(req.params.id);
        if(!notification){
            return res.status(404).json({
                message:"Notification not found",
            });
        }
        if(notification.user.toString() !== req.user._id.toString()){
            return res.status(403).json({
                message:"Access Denied"
            });
        }

        notification.isRead = true;
        await notification.save();
        return res.status(200).json({
            message:"Notification mark as read",
            notification,
        });
    }catch(error){
        return res.status(500).json({
            message:"Server Error",
            error:error.message,
        });
    }
};

//Delete Notification
export const deleteNotification = async(req, res)=>{
    try{
        const notification = await Notification.findById(req.params.id);
        if(!notification){
            return res.status(404).json({
                message:"Notification not found",
            });
        }
        if(notification.user.toString() !== req.user._id.toString()){
            return res.status(403).json({
                message:"Access Denied"
            });
        }
        await notification.deleteOne();
        return res.status(200).json({
            message:"Notification Deleted"
        });
    }catch(error){
        return res.status(500).json({
            message:"Server Error",
            error:error.message,
        });
    }
};