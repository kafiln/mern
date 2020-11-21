import { Document, model, Schema } from 'mongoose';

export const DOCUMENT_NAME = 'Resume';
export const COLLECTION_NAME = 'resumes';

export default interface Resume extends Document {
	createdAt?: Date;
	updatedAt?: Date;
}

const schema = new Schema({
	name: {
		type: String,
		required: true,
	},
});

export const ResumeModel = model<Resume>(
	DOCUMENT_NAME,
	schema,
	COLLECTION_NAME,
);
