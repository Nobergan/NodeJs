import { model, Schema } from "mongoose";

import { Role } from "../enums/role.enum";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { enum: Role, type: String, required: true, default: Role.USER },
        name: { type: String, required: true },
        surname: { type: String, required: true },
        age: { type: Number, required: true },
        isDeleted: { type: Boolean, default: false },
        isVerified: { type: Boolean, default: false },
        isActive: { type: Boolean, default: false },
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform: (doc, ret) => {
                delete ret.password;
                return ret;
            },
        },
    },
);

export const User = model<IUser>("user", userSchema);
