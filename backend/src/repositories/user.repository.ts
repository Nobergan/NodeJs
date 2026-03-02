import { QueryFilter } from "mongoose";

import { IUser, IUserQuery, UserCreateDTO } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
    public getAllUsers(query: IUserQuery): Promise<any> {
        // const skip = query.pageSize * (query.page - 1);
        const filterObject: QueryFilter<IUser> = { isDeleted: false };

        if (query.search) {
            filterObject.$or = [
                { name: { $regex: query.search, $options: "i" } },
                { surname: { $regex: query.search, $options: "i" } },
            ];
        }

        const orderObject: Record<string, 1 | -1> = {};

        if (query.order) {
            if (query.order.startsWith("-")) {
                orderObject[query.order.slice(1)] = -1;
            } else {
                orderObject[query.order] = 1;
            }
        }

        orderObject._id = 1;

        const skip = query.pageSize * (query.page - 1);

        return User.aggregate([
            {
                $match: filterObject as QueryFilter<Record<string, unknown>>,
            },
            {
                $sort: orderObject,
            },
            {
                $facet: {
                    countStage: [{ $count: "totalItems" }],
                    dataStage: [
                        { $skip: skip },
                        { $limit: query.pageSize },
                        { $project: { password: 0 } },
                    ],
                },
            },
            {
                $project: {
                    totalItems: {
                        $ifNull: [
                            { $arrayElemAt: ["$countStage.totalItems", 0] },
                            0,
                        ],
                    },
                    data: "$dataStage",
                },
            },
        ]);
    }

    public createUser(user: UserCreateDTO): Promise<IUser> {
        return User.create(user);
    }

    public getUserById(userId: string | string[]): Promise<IUser | null> {
        return User.findById(userId);
    }

    public updateUserById(
        userId: string | string[],
        data: Partial<IUser>,
    ): Promise<IUser | null> {
        return User.findByIdAndUpdate(userId, data, { new: true });
    }

    public deleteUserById(userId: string): Promise<IUser | null> {
        return User.findByIdAndDelete(userId);
    }

    public getUserByEmail(email: string): Promise<IUser | null> {
        return User.findOne({ email });
    }

    public blockUser(userId: string | string[]): Promise<IUser | null> {
        return User.findByIdAndUpdate(
            userId,
            { isActive: false },
            { new: true },
        );
    }

    public unBlockUser(userId: string | string[]): Promise<IUser | null> {
        return User.findByIdAndUpdate(
            userId,
            { isActive: true },
            { new: true },
        );
    }
}

export const userRepository = new UserRepository();
