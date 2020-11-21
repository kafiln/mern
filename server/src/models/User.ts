import { compare, hash } from 'bcryptjs';
import { Document, model, Schema } from 'mongoose';

export const DOCUMENT_NAME = 'User';
export const COLLECTION_NAME = 'users';

export default interface User extends Document {
	name: string;
	email?: string;
	password?: string;
	profilePicUrl?: string;
	// roles: Role[];
	verified?: boolean;
	status?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
	compare: (password: string) => Promise<boolean>;
}

const schema = new Schema(
	{
		name: {
			type: Schema.Types.String,
			required: true,
			trim: true,
			maxlength: 128,
		},
		email: {
			type: Schema.Types.String,
			required: true,
			lowercase: true,
			unique: true,
			trim: true,
		},
		password: {
			type: Schema.Types.String,
			select: true,
		},
		profilePicUrl: {
			type: Schema.Types.String,
			trim: true,
		},
		// roles: {
		// 	type: [
		// 		{
		// 			type: Schema.Types.ObjectId,
		// 			ref: 'Role',
		// 		},
		// 	],
		// 	required: true,
		// },
		verified: {
			type: Schema.Types.Boolean,
			default: false,
		},
		status: {
			type: Schema.Types.Boolean,
			default: true,
		},
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

schema.pre<User>('save', async function () {
	if (this.isModified('password')) {
		this.password = await hash(this.password!, 12);
	}
});

schema.methods.compare = async function (password: string) {
	return compare(password, this.password);
};

export const UserModel = model<User>(DOCUMENT_NAME, schema, COLLECTION_NAME);
