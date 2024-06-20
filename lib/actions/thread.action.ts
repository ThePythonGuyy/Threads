"use server";
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { fetchUser } from "./user.actions";
import Community from "../models/community.model";

interface ParamsCreateThread {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

interface ParamsAddComments {
  threadId: string;
  commentText: string;
  userId: string;
  path: string;
}

export async function createThread({
  text,
  author,
  communityId,
  path,
}: ParamsCreateThread) {
  

  try {
    connectToDB();



    const communityObject = await Community.findOne(
      {id: communityId },
      { _id: 1 }
    );

    console.log("In actions",communityObject._id)

    const currentUser = await fetchUser(author);
    author = currentUser._id;
    console.log("actions author", author);
    const createThread = await Thread.create({
      text,
      author,
      communityId : communityObject?._id,
      path,
    });

    //Updating user model
    await User.findByIdAndUpdate(author, {
      $push: { threads: createThread._id },
    });

    if(communityObject){
      await Community.findByIdAndUpdate(communityObject, {
        $push: { threads: createThread._id},
      })
    }

    revalidatePath(path);
  } catch (error: any) {
    // throw new Error(`Failed to create thread ${error.message}`);
    console.log(error.message);
  }
}

export async function fetchThreads(pageNumber = 1, pageSize = 20) {
  connectToDB();

  //number of post to skip for current page
  const skipAmount = (pageNumber - 1) * pageSize;

  //Fetch posts with no parents
  const threadsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({ path: "author", model: User })
    .populate({ path: "community", model: Community})
    .populate({
      path: "children",
      populate: {
        path: "author",
        model: User,
        select: "_id name username",
      },
    });

  const totalThreadsCount = await Thread.countDocuments({
    parentId: { $in: [null, undefined] },
  });

  const threads = await threadsQuery.exec();

  const isNext = totalThreadsCount > skipAmount + threads.length;

  return { threads, isNext };
}

export async function fetchThreadById(id: string) {
  connectToDB();

  try {
    const thread = await Thread.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id name parentId image",
          },
          {
            path: "children",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "_id id name parentId image",
            },
          },
        ],
      })
      .exec();
    return thread;
  } catch (error: any) {
    throw new Error(`Error fetching thread: ${error.message}`);
  }
}

export async function addCommentToThread({
  threadId,
  commentText,
  userId,
  path,
}: ParamsAddComments) {
  connectToDB();

  try {
    //finding original thread

    const originalThread = await Thread.findById(JSON.parse(threadId));
    if (!originalThread) {
      throw new Error("Thread not found");
    }
    console.log("hyy");
    //Creating a new thread with the comment text
    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId,
    });

    console.log("hello");

    //Saving new thread
    const savedCommentThread = await commentThread.save();

    //updating original thread by adding comments as children
    originalThread.children.push(savedCommentThread._id);

    //Save the original thread
    await originalThread.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error adding comment to thread:${error.message}`);
  }
}
