import byContract from 'bycontract';

/**
 * Builds the most current state of a topic from looping over messages and replaying state.
 * @function
 * @param {array} topicMessages - Array of the current topic messages.
 * @param {string} primaryKey - The primary key used to identify each message.
 * @param {string} topicActionKey - The key for your command action in the topic message. IMPORTANT your actions must use the keywords: created, updated, or deleted. (example: topicAction: 'created')
 * @example
 * const topicMessages = [
 *   {
 *     deviceId: 'testDeviceId',
 *     externalHardwareId: 'testExternalHardwareId',
 *     type: 'testType',
 *     vendorId: 'testVendorId',
 *     topicAction: 'created',
 *     created: 1511215962473,
 *     updated: 1511215962473
 *   }
 * ];
 *
 * buildTopicState(
 *   topicMessages,
 *   'deviceId',
     'topicAction'
 * );
 * @returns {array} Returns a new state array of topic messages from replay.
 */
const buildTopicState = (topicMessages, primaryKey, topicActionKey) => {
  try {
    byContract(
      [topicMessages, primaryKey, topicActionKey],
      ['array', 'string', 'string']
    );
  } catch (err) {
    throw new Error(err.message);
  }

  let state = [];

  topicMessages.forEach(message => {
    switch (message[topicActionKey]) {
      case 'created':
        state = create(state, message);

        return state;
      case 'updated':
        state = update(state, message, primaryKey);

        return state;
      case 'deleted':
        state = remove(state, message, primaryKey);

        return state;
      default:
        return state;
    }
  });

  return state;
};

/**
 * Adds the new message to the current state.
 * @function
 * @param {array} state - Array of the current topic messages.
 * @param {object} record - The new message being created.
 * @example
 * const topicMessages = [{
 *   thing: 'thing'
 * }]
 *
 * create(topicMessages, { test: 'test' });
 * @returns {array} Returns the new state with the passed in item.
 */
const create = (state, record) => {
  try {
    byContract([state, record], ['array', 'object']);
  } catch (err) {
    throw new Error(err.message);
  }

  state.push(record);

  return state;
};

/**
 * Updates found message to the current state.
 * @function
 * @param {array} state - Array of the current topic messages.
 * @param {object} record - The new message being created.
 * @param {string} primaryKeyIdentifier - The primary key used to keep records unique.
 * @example
 * const existingObject = {
 *   id: 'testId',
 *   test: 'test'
 * };
 *
 * const newRecord = {
 *   id: 'testId',
 *   test: 'updatedContent'
 * };
 *
 * const existingState = [existingObject];
 *
 * update(existingState, newRecord, 'id');
 * @returns {array} Updates record in the state and returns the new state array.
 */
const update = (state, record, primaryKeyIdentifier) => {
  try {
    byContract(
      [state, record, primaryKeyIdentifier],
      ['array', 'object', 'string']
    );
  } catch (err) {
    throw new Error(err.message);
  }

  return state.map((item, index) => {
    if (item && item[primaryKeyIdentifier] === record[primaryKeyIdentifier]) {
      return {
        ...item,
        ...record
      };
    }

    return item;
  });
};

/**
 * Removes found message from the current state.
 * @function
 * @param {array} state - Array of the current topic messages.
 * @param {object} record - The new message being created.
 * @param {string} primaryKeyIdentifier - The primary key used to keep records unique.
 * @example
 * const existingObject = {
 *   id: 'testId',
 *   test: 'test'
 * };
 *
 * const newRecord = {
 *   id: 'testId',
 *   test: 'deletedContent'
 * };
 *
 * const existingState = [existingObject];
 *
 * remove(existingState, newRecord, 'id');
 * @returns {array} Removes the record from state and returns the new state array.
 */
const remove = (state, record, primaryKeyIdentifier) => {
  try {
    byContract(
      [state, record, primaryKeyIdentifier],
      ['array', 'object', 'string']
    );
  } catch (err) {
    throw new Error(err.message);
  }

  return state.filter(
    (item, index) => item[primaryKeyIdentifier] !== record[primaryKeyIdentifier]
  );
};

/**
 * Searches the current state to see if the message has already been created.
 * @function
 * @param {object} record -  The new message being created.
 * @param {array} state - Array of the current topic messages.
 * @param {string} primaryKeyIdentifier - The primary key used to keep records unique.
 * @example
 * const existingObject = {
 *   id: 'testId',
 *   test: 'test'
 * };
 *
 * const record = {
 *   id: 'otherId',
 *   test: 'deletedContent'
 * };
 *
 * const topicMessages = [existingObject];
 *
 * // Returns true
 * isCreatable(record, topicMessages, 'id');
 * @returns {boolean} Returns a boolean value.
 */
const isCreatable = (record, state, primaryKeyIdentifier) => {
  try {
    byContract(
      [record, state, primaryKeyIdentifier],
      ['object', 'array', 'string']
    );
  } catch (err) {
    throw new Error(err.message);
  }

  let bool = null;

  state.forEach(message => {
    if (record[primaryKeyIdentifier] === message[primaryKeyIdentifier]) {
      bool = false;
    } else {
      bool = true;
    }
  });

  return bool;
};

/**
 * Searches the current state to see if the message can be updated.
 * @function
 * @param {object} record -  The new message being created.
 * @param {array} state - Array of the current topic messages.
 * @param {string} primaryKeyIdentifier - The primary key used to keep records unique.
 * @example
 * const existingObject = {
 *   id: 'testId',
 *   test: 'test'
 * };
 *
 * const record = {
 *   id: 'testId',
 *   test: 'deletedContent'
 * };
 *
 * const topicMessages = [existingObject];
 *
 * // Returns true
 * isUpdatable(record, topicMessages, 'id');
 * @returns {boolean} Returns a boolean value.
 */
const isUpdatable = (record, state, primaryKeyIdentifier) => {
  try {
    byContract(
      [record, state, primaryKeyIdentifier],
      ['object', 'array', 'string']
    );
  } catch (err) {
    throw new Error(err.message);
  }

  let bool = null;

  state.forEach(message => {
    if (record[primaryKeyIdentifier] === message[primaryKeyIdentifier]) {
      bool = true;
    } else {
      bool = false;
    }
  });

  return bool;
};

/**
 * Searches the current state to see if the message can be deleted.
 * @function
 * @param {object} record -  The new message being created.
 * @param {array} state - Array of the current topic messages.
 * @param {string} primaryKeyIdentifier - The primary key used to keep records unique.
 * @example
 * const existingObject = {
 *   id: 'testId',
 *   test: 'test'
 * };
 *
 * const record = {
 *   id: 'testId',
 *   test: 'deletedContent'
 * };
 *
 * const topicMessages = [existingObject];
 *
 * // Returns true
 * isRemovable(record, topicMessages, 'id');
 * @returns {boolean} Returns a boolean value.
 */
const isRemovable = (record, state, primaryKeyIdentifier) => {
  try {
    byContract(
      [record, state, primaryKeyIdentifier],
      ['object', 'array', 'string']
    );
  } catch (err) {
    throw new Error(err.message);
  }

  let bool = null;

  state.forEach(message => {
    if (record[primaryKeyIdentifier] === message[primaryKeyIdentifier]) {
      bool = true;
    } else {
      bool = false;
    }
  });

  return bool;
};

const topicValidator = {
  buildTopicState,
  create,
  update,
  remove,
  isCreatable,
  isUpdatable,
  isRemovable
};

export default topicValidator;
