import { dynamo } from "./dynamodb";
import {
	PutCommand,
	GetCommand,
	UpdateCommand,
	QueryCommand,
} from "@aws-sdk/lib-dynamodb";

const USERS_TABLE =
	(process.env.DYNAMODB_TABLE_PREFIX ?? "storyloom_") + "users";

export interface StoryLoomUser {
	id: string;
	email: string;
	name?: string;
	image?: string;
	createdAt: string;
	updatedAt: string;
	lastSignInAt: string;
	lastSignInMethod: string;
	signInMethods: string[]; // Array of methods used: 'google', 'email'
	isNewUser?: boolean;
	welcomeEmailSent?: boolean; // Track if welcome email has been sent
}

export class UsersService {
	static async createUser(userData: {
		id: string;
		email: string;
		name?: string;
		image?: string;
		signInMethod: string;
	}): Promise<StoryLoomUser> {
		const now = new Date().toISOString();

		// Use email username if name is not provided
		const userName = userData.name || userData.email.split("@")[0];

		const user: StoryLoomUser = {
			id: userData.id,
			email: userData.email,
			name: userName,
			image: userData.image,
			createdAt: now,
			updatedAt: now,
			lastSignInAt: now,
			lastSignInMethod: userData.signInMethod,
			signInMethods: [userData.signInMethod],
			isNewUser: true,
			welcomeEmailSent: false,
		};

		await dynamo.send(
			new PutCommand({
				TableName: USERS_TABLE,
				Item: user,
				ConditionExpression: "attribute_not_exists(id)",
			})
		);

		return user;
	}

	static async getUserById(id: string): Promise<StoryLoomUser | null> {
		try {
			const result = await dynamo.send(
				new GetCommand({
					TableName: USERS_TABLE,
					Key: { id },
				})
			);
			return (result.Item as StoryLoomUser) || null;
		} catch (error) {
			console.error("Error getting user by ID:", error);
			return null;
		}
	}

	static async getUserByEmail(email: string): Promise<StoryLoomUser | null> {
		try {
			const result = await dynamo.send(
				new QueryCommand({
					TableName: USERS_TABLE,
					IndexName: "EmailIndex",
					KeyConditionExpression: "email = :email",
					ExpressionAttributeValues: {
						":email": email,
					},
				})
			);
			return (result.Items?.[0] as StoryLoomUser) || null;
		} catch (error) {
			console.error("Error getting user by email:", error);
			return null;
		}
	}

	static async updateUserSignIn(
		id: string,
		signInMethod: string
	): Promise<void> {
		const now = new Date().toISOString();

		try {
			// First, get the current user to check existing sign-in methods
			const currentUser = await this.getUserById(id);
			if (!currentUser) {
				console.error("User not found for sign-in update:", id);
				return;
			}

			// Add the method if it's not already in the array
			const signInMethods = currentUser.signInMethods || [];
			if (!signInMethods.includes(signInMethod)) {
				signInMethods.push(signInMethod);
			}

			await dynamo.send(
				new UpdateCommand({
					TableName: USERS_TABLE,
					Key: { id },
					UpdateExpression: `
            SET lastSignInAt = :now, 
                lastSignInMethod = :method, 
                updatedAt = :now,
                signInMethods = :methods,
                isNewUser = :false
          `,
					ExpressionAttributeValues: {
						":now": now,
						":method": signInMethod,
						":methods": signInMethods,
						":false": false,
					},
					ConditionExpression: "attribute_exists(id)",
				})
			);
		} catch (error) {
			console.error("Error updating user sign in:", error);
		}
	}

	static async createOrUpdateUser(userData: {
		id: string;
		email: string;
		name?: string;
		image?: string;
		signInMethod: string;
	}): Promise<{ user: StoryLoomUser; isNewUser: boolean }> {
		// First try to get existing user by email to handle account linking
		let existingUser = await this.getUserByEmail(userData.email);

		if (!existingUser) {
			// Try to get by ID (in case of existing NextAuth user)
			existingUser = await this.getUserById(userData.id);
		}

		if (existingUser) {
			// Update existing user
			await this.updateUserSignIn(existingUser.id, userData.signInMethod);
			const updatedUser = await this.getUserById(existingUser.id);
			return { user: updatedUser!, isNewUser: false };
		} else {
			// Create new user
			const newUser = await this.createUser(userData);
			return { user: newUser, isNewUser: true };
		}
	}
}
