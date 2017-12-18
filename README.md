# Background

This package was created the help keep track of messages in an existing topic in kafka for use with validation when creating, updating, or deleting new messages. Instead of having a completely different service to store and check records I created this package to maintain a local version of the state so far. In some instances you might still need to create a separate service for tracking state in your topics get to be too big. In my app I create a consumer and consume all messages from the beginning of a topic. We use domain topics for better replay-ability.

I would love to hear input from others around the current problem this package is trying to solve and how I can make it better for your use case. Hope you like!

# Getting Started

### Install

`npm install topic-validator --save`

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [buildTopicState](#buildtopicstate)
-   [create](#create)
-   [update](#update)
-   [remove](#remove)
-   [isCreatable](#iscreatable)
-   [isUpdatable](#isupdatable)
-   [isRemovable](#isremovable)

## buildTopicState

Builds the most current state of a topic from looping over messages and replaying state.

**Parameters**

-   `topicMessages` **[array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Array of the current topic messages.
-   `primaryKey` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The primary key used to identify each message.
-   `topicActionKey` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The key for your command action in the topic message. IMPORTANT your actions must use the keywords: created, updated, or deleted. (example: topicAction: 'created')

**Examples**

```javascript
const topicMessages = [
  {
    deviceId: 'testDeviceId',
    externalHardwareId: 'testExternalHardwareId',
    type: 'testType',
    vendorId: 'testVendorId',
    topicAction: 'created',
    created: 1511215962473,
    updated: 1511215962473
  }
];

buildTopicState(
  topicMessages,
  'deviceId',
'topicAction'
);
```

Returns **[array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Returns a new state array of topic messages from replay.

## create

Adds the new message to the current state.

**Parameters**

-   `state` **[array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Array of the current topic messages.
-   `record` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** The new message being created.

**Examples**

```javascript
const topicMessages = [{
  thing: 'thing'
}]

create(topicMessages, { test: 'test' });
```

Returns **[array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Returns the new state with the passed in item.

## update

Updates found message to the current state.

**Parameters**

-   `state` **[array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Array of the current topic messages.
-   `record` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** The new message being created.
-   `primaryKeyIdentifier` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The primary key used to keep records unique.

**Examples**

```javascript
const existingObject = {
  id: 'testId',
  test: 'test'
};

const newRecord = {
  id: 'testId',
  test: 'updatedContent'
};

const existingState = [existingObject];

update(existingState, newRecord, 'id');
```

Returns **[array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Updates record in the state and returns the new state array.

## remove

Removes found message from the current state.

**Parameters**

-   `state` **[array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Array of the current topic messages.
-   `record` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** The new message being created.
-   `primaryKeyIdentifier` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The primary key used to keep records unique.

**Examples**

```javascript
const existingObject = {
  id: 'testId',
  test: 'test'
};

const newRecord = {
  id: 'testId',
  test: 'deletedContent'
};

const existingState = [existingObject];

remove(existingState, newRecord, 'id');
```

Returns **[array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Removes the record from state and returns the new state array.

## isCreatable

Searches the current state to see if the message has already been created.

**Parameters**

-   `record` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**  The new message being created.
-   `state` **[array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Array of the current topic messages.
-   `primaryKeyIdentifier` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The primary key used to keep records unique.

**Examples**

```javascript
const existingObject = {
  id: 'testId',
  test: 'test'
};

const record = {
  id: 'otherId',
  test: 'deletedContent'
};

const topicMessages = [existingObject];

// Returns true
isCreatable(record, topicMessages, 'id');
```

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Returns a boolean value.

## isUpdatable

Searches the current state to see if the message can be updated.

**Parameters**

-   `record` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**  The new message being created.
-   `state` **[array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Array of the current topic messages.
-   `primaryKeyIdentifier` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The primary key used to keep records unique.

**Examples**

```javascript
const existingObject = {
  id: 'testId',
  test: 'test'
};

const record = {
  id: 'testId',
  test: 'deletedContent'
};

const topicMessages = [existingObject];

// Returns true
isUpdatable(record, topicMessages, 'id');
```

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Returns a boolean value.

## isRemovable

Searches the current state to see if the message can be deleted.

**Parameters**

-   `record` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**  The new message being created.
-   `state` **[array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Array of the current topic messages.
-   `primaryKeyIdentifier` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The primary key used to keep records unique.

**Examples**

```javascript
const existingObject = {
  id: 'testId',
  test: 'test'
};

const record = {
  id: 'testId',
  test: 'deletedContent'
};

const topicMessages = [existingObject];

// Returns true
isRemovable(record, topicMessages, 'id');
```

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Returns a boolean value.
