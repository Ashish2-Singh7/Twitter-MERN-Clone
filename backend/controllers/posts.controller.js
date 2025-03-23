import { v2 as cloudinary } from "cloudinary";

import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";

export const createPost = async (req, res) => {
    try {
        let { text, img, vid } = req.body;
        const userId = req.user._id.toString();

        const user = await User.findById(userId);
        if (!user) return res.staus(404).json({ error: "User not found" });

        if (!text && !img && !vid) {
            return res.status(400).json({ error: "Post must have text or image or video" });
        }

        if (img) {
            const uploadedRespones = await cloudinary.uploader.upload(img);
            img = uploadedRespones.secure_url;
        }
        if (vid) {
            const uploadedRespones = await cloudinary.uploader.upload(vid, {
                resource_type: "video"
            });
            vid = uploadedRespones.secure_url;
        }

        const newPost = new Post({
            user: userId,
            text,
            img,
            vid
        });

        await newPost.save();
        return res.status(201).json(newPost);

    } catch (error) {
        console.log("Error in create post controller", error.message);
        return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
}

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "You are not authorized to delete this post" });
        }

        if (post.img) {
            const imgId = post.img.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(imgId);
        }
        if (post.vid) {
            const vidId = post.vid.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(vidId);
        }

        await Post.findByIdAndDelete(req.params.id);

        return res.status(200).json({ message: "Post deleted successfully" });

    } catch (error) {
        console.log("Error in deletePost controller", error.message);
        return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
}

export const commentOnPost = async (req, res) => {
    try {

        const { text } = req.body;
        const postId = req.params.id;
        const userId = req.user._id;

        if (!text) {
            return res.status(400).json({ error: "Text field is required" });
        }
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const comment = { user: userId, text };

        post.comments.push(comment);
        await post.save();

        // return res.status(200).json(post);
        const updatedPost = await post.populate({ path: "comments.user", select: "-password" });
        const updatedComments = updatedPost.comments;
        return res.status(200).json(updatedComments);

    } catch (error) {
        console.log("Error in commentOnPost controller ", error.message);
        return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
}

export const likeUnlikePost = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id: postId } = req.params;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const userLikedPost = post.likes.includes(userId);

        if (userLikedPost) {
            // unlike the post
            await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
            await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });

            const updatedLikes = post.likes.filter((id) => id.toString() !== userId.toString());
            return res.status(200).json(updatedLikes);
            // return res.status(200).json({ message: "Post unliked successfully" });
        }
        else {
            // like the post
            post.likes.push(userId);
            await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
            await post.save();

            const notification = new Notification({
                from: userId,
                to: post.user,
                type: "like",
            });

            await notification.save();

            const updatedLikes = post.likes;
            return res.status(200).json(updatedLikes);
            // return res.status(200).json({ message: "Post liked successfully" });
        }

    } catch (error) {
        console.log("Error in linkUnlikePost controller", error.message);
        return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .populate({
                path: "user",
                select: "-password"
            })
            .populate({
                path: "comments.user",
                select: "-password"
            }); // by putting -1 here we will get the latest post on the top;
        // method is fine but a better way of doing it can be a method in which the details of the creator of the posts should populate and we get that in response

        if (posts.length === 0) {
            return res.status(200).json([]);
        }

        return res.status(200).json(posts);

    } catch (error) {
        console.log("Error in getAllPosts controller", error.message);
        return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
}

export const getLikedPosts = async (req, res) => {

    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        const likedPosts = await Post.find({ _id: { $in: user.likedPosts } })
            .populate({
                path: "user",
                select: "-password",
            }).populate({
                path: "comments.user",
                select: "-password",
            });

        return res.status(200).json(likedPosts);

    } catch (error) {
        console.log("Error in getLikedPosts controller", error.message);
        return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
}

export const getFollowingPosts = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) return res.status(200).json({ error: "User not found" });

        const following = user.following;

        const feedPosts = await Post.find({ user: { $in: following } })
            .sort({ createdAt: -1 })
            .populate({
                path: "user",
                select: "-password",
            })
            .populate({
                path: "comments.user",
                select: "-password",
            });

        return res.status(200).json(feedPosts);

    } catch (error) {
        console.log("Error in getFollowingPosts", error.message);
        return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
}

export const getUserPosts = async (req, res) => {
    try {

        const { username } = req.params;

        const user = await User.findOne({ username });

        if (!user) return res.status(404).json({ error: "User not found" });

        const posts = await Post.find({ user: user._id })
            .sort({ createdAt: -1 })
            .populate({
                path: "user",
                select: "-password",
            })
            .populate({
                path: "comments.user",
                select: "-password",
            });

        return res.status(200).json(posts);

    } catch (error) {
        console.log("Error in getUsersPosts controller", error.message);
        return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
}