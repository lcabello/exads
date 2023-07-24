# DynamoDB Table Schema for Web Pages Metadata

This DynamoDB table schema is designed to store metadata, supporting efficient querying for a given URL, date range, or specific attributes like page title or word count.

## Table Name: ExadsMetaData

The table name is `ExadsMetaData`, and it stores the metadata for web pages crawled.

## Primary Key:

I'll use a composite primary key, because it gives us the opportunity to create queries based in time range.

- **Partition KEY: URL (String)**: The URL will be unique identifier for each web page.
- **Short Key: Timestamp (Number)**: The time when the page was reviewed.


## Attributes:

The table includes the following attributes:

- **Date (Number)**: This attribute stores the date of the revision.

- **PageTitle (String)**: This attribute stores the title of the web page.

- **WordCount (Number)**: The word count attribute stores the total word count of the web page.

- **Other attributes**: We can add more attributes, depend on explicit requirements.

## Optional Secondary Indexes:

To support efficient querying I'll add the following Global Secondary Indexes (GSIs):

1. **DateIndex (GSI)**:
   - **Partition Key**: Date (Number)

2. **WordCountIndex (GSI)**:
   - **Partition Key**: WordCount (Number)

3. **PageTitle (GSI)**:
   - **Partition Key**: PageTitle (String)


## Examples:

```javascript
// Insert sample data
dynamoDB.putItem({
  TableName: 'ExadsMetaData',
  Item: {
    URL: { S: 'https://www.example.com/page1' },
    Date: { S: '2023-07-21' },
    PageTitle: { S: 'Example Page' },
    WordCount: { N: '1500' },
    // Additional attributes can be added here
  },
}, (err, data) => {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});

// Query by URL
const params = {
  ExpressionAttributeValues: {
    ':url': 'www.url.com'
   },
 KeyConditionExpression: 'URL = :url',
 TableName: 'ExadsMetaData'
};

dynamoDB.query(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Items);
  }
});

// Query by Date
const params = {
  ExpressionAttributeValues: {
    ':startDate': { S: '2023-07-20' },
    ':endDate': { S: '2023-07-21' },
  },
  KeyConditionExpression: 'Date BETWEEN :startDate AND :endDate',
 TableName: 'ExadsMetaData'
};

dynamoDB.query(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Items);
  }
});

// Query by WordCount
const params = {
  ExpressionAttributeValues: {
    ':count': 100
  },
  KeyConditionExpression: 'Wordcount >= :count',
 TableName: 'ExadsMetaData'
};

dynamoDB.query(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Items);
  }
});

// Query by Title
const params = {
  ExpressionAttributeValues: {
    ':title': 'Web Title'
  },
  KeyConditionExpression: 'PageTitle =_ :title',
 TableName: 'ExadsMetaData'
};

dynamoDB.query(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Items);
  }
});

```
