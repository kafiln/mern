import User, { UserModel } from '../models/User';

export default class UserRepository {
	public static findByEmail(email: string): Promise<User | null> {
		return (
			UserModel.findOne({ email: email, status: true })
				.select('+email +password +roles')
				// .populate({
				// 	path: 'roles',
				// 	match: { status: true },
				// 	select: { code: 1 },
				// })
				.lean<User>()
				.exec()
		);
	}
}
