import dynamodb from '../db/dynamoDB.js';

const DB_NAME = 'ExadsMetaData';
const resolvers = {
  Query: {
    async getWebPage(_parent, { url }) {
      try {
        const params = {
          ExpressionAttributeValues: {
            ':url': url
          },
          KeyConditionExpression: 'URL = :url',
          TableName: DB_NAME
        };
        const result = await dynamodb.query(params).promise();

        return result;
      } catch (e) {
        console.log("Error", e);
        return e;
      }
    },
    async getWebPageByField(_parent, { field, value }) {
      try {
        const params = {
          ExpressionAttributeValues: {
            ':field': value
          },
          ExpressionAttributeNames: {
            '#field': field,
          },
          KeyConditionExpression: 'URL = :url',
          TableName: DB_NAME
        };
        const result = await dynamodb.query(params).promise();

        return result;
      } catch (e) {
        console.log("Error", e);
        return e;
      }
    }
  },
  Mutation: {
    createItem: async (_parent, params) => {
      try {
        const paramsDB = {
          TableName: DB_NAME,
          Item: params.Item
        };
        await dynamodb.put(paramsDB).promise();

        return params.Item;
      } catch (e) {
        console.log("Error", e);
        return e;
      }

    },
    updateItem: async (_parent, { url, field, value }) => {
      try {
        const params = {
          TableName: DB_NAME,
          Key: { url },
          UpdateExpression: 'SET #name = :name',
          ExpressionAttributeNames: {
            '#name': field
          },
          ExpressionAttributeValues: {
            ':name': value,
          },
          ReturnValues: 'ALL_NEW',
        };
        const { Attributes } = await dynamodb.update(params).promise();
        return Attributes;
      } catch(e) {
        console.log("Error", e);
        return e;
      }

    },
    deleteItem: async (_parent, { url }) => {
      try {
        const params = {
          TableName: DB_NAME,
          Key: { url }
        };
        await dynamodb.delete(params).promise();
        return true;
      } catch(e) {
        console.log("Error", e);
        return e;
      }
    },
  }
};

export default resolvers;