import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
	region: process.env.AWS_REGION,
	credentials: process.env.AWS_ACCESS_KEY_ID
		? {
				accessKeyId: process.env.AWS_ACCESS_KEY_ID,
				secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
		  }
		: undefined,
});

export const dynamo = DynamoDBDocument.from(client, {
	marshallOptions: {
		removeUndefinedValues: true,
		convertClassInstanceToMap: true,
	},
	unmarshallOptions: {
		wrapNumbers: false,
	},
});
