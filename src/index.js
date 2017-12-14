/**
 * Builds the most current state of a topic from looping over messages and replaying state.
 * @function
 * @param {array} topicMessages - Array of the current topic messages.
 * @param {string} primaryKeyIdentifier - The primary key used to identify each message.
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
 *   'deviceId'
 * );
 * @returns {array} Returns a new state array of topic messages from replay.
 */
const buildTopicState = (topicMessages, primaryKeyIdentifier) => {
  let state = [];

  topicMessages.forEach(message => {
    // @TODO make topic action an action key passed in for more general use.
    switch (message.topicAction) {
      case 'created':
        state = create(state, message);

        return state;
      case 'updated':
        state = update(state, message, primaryKeyIdentifier);

        return state;
      case 'deleted':
        state = remove(state, message, primaryKeyIdentifier);

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
  return state.map((item, index) => {
    if (item && item[primaryKeyIdentifier] === record[primaryKeyIdentifier]) {
      return {
        ...item,
        ...record
      };
    }
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
const isCreatable = (record, topicMessages, primaryKeyIdentifier) => {
  let bool = null;

  topicMessages.forEach(message => {
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
const isUpdatable = (record, topicMessages, primaryKeyIdentifier) => {
  let bool = null;

  topicMessages.forEach(message => {
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
const isRemovable = (record, topicMessages, primaryKeyIdentifier) => {
  let bool = null;

  topicMessages.forEach(message => {
    if (record[primaryKeyIdentifier] === message[primaryKeyIdentifier]) {
      bool = true;
    } else {
      bool = false;
    }
  });

  return bool;
};

const stateBuilder = {
  buildTopicState,
  create,
  update,
  remove,
  isCreatable,
  isUpdatable,
  isRemovable
};

export default stateBuilder;
