"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Thread from "../models/thread.model";
import { SortOrder } from "mongoose";
import { FilterQuery } from "mongoose";

interface userType {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

interface fetchUsersType {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder
}

export const updateUser = async ({
  userId,
  name,
  bio,
  image,
  path,
  username,
}: userType): Promise<void> => {
  connectToDB();

try {
    await User.findOneAndUpdate(
        { id: userId },
        {
          username: username.toLowerCase(),
          name,
          bio,
          image,
          onboarded: true,
        },
        { upsert: true }
      );
    
      if (path === '/profile/edit') {
        revalidatePath(path);
      }
} catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`)
}
};

export const fetchUser = async(userId: string) => {
    try {
        connectToDB();

        return await User.findOne({id: userId})
    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`)
    }
}

export const fetchUserThreads = async(userId: string) => {
  try {
    connectToDB();
    const threads = await User.findOne({ id: userId })
    .populate({
      path: 'threads',
      model: Thread,
      populate: [
        {
          path: 'children',
          model: Thread,
          populate: {
            path: 'author',
            model: User,
            select: 'name image id username',
          },
        },
        {
          path: 'author',
          model: User,
          select: 'name image id username',
        },
      ],
    });

    console.log(threads);
    return threads;
  } catch (error: any) {
    throw new Error(`Faile to fetch user threads: ${error.message}`)
  }
}

export const fetchUsers = async({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc"
} : fetchUsersType) => {
  try {
    connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    const regex = new RegExp(searchString, "i");
    
    const query : FilterQuery<typeof User> = {
      id: { $ne: userId}
    }

    if(searchString.trim() !== ''){
      query.$or = [
        { username: { $regex: regex}},
        { name: {$regex: regex }}
      ]
    }

    const sortOptions = { createdAt: sortBy };

    const userQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize)

      const totalUsersCount = await User.countDocuments(query);

      const users = await userQuery.exec();

      const isNext = totalUsersCount > skipAmount + users.length;

      return { users, isNext }

  } catch (error: any){
    throw new Error(`Failed to fetch users ${error.message}`)
  }
}

export const getActivity = async( userId: string ) => {
  try {
    connectToDB();

    const userThreads = await Thread.find({ author: userId });

    const childThreadIds = userThreads.reduce((acc, userThread) => {
      return acc.concat(userThread.children)
    },[])

    const replies = await Thread.find({
      _id: { $in: childThreadIds },
      author: { $ne: userId },
    }).populate({
      path: 'author',
      model: User,
      select: 'id name image _id'
    })

    return replies
  } catch (error: any) {
    throw new Error(`Faild to fetch activity: ${error.message}`)
  }
}