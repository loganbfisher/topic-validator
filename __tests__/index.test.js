import topicValidator from '../src';

describe('.buildTopicState', () => {
  describe('when it is a created message.', () => {
    it('should be added to the state array', () => {
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

      const response = topicValidator.buildTopicState(
        topicMessages,
        'deviceId'
      );

      expect(response).toEqual(topicMessages);
    });
  });

  describe('when the topicAction ', () => {
    it('should just return the state array', () => {
      const topicMessages = [
        {
          deviceId: 'testDeviceId',
          externalHardwareId: 'testExternalHardwareId',
          type: 'testType',
          vendorId: 'testVendorId',
          topicAction: 'farts',
          created: 1511215962473,
          updated: 1511215962473
        }
      ];

      const response = topicValidator.buildTopicState(
        topicMessages,
        'deviceId'
      );

      expect(response).toEqual([]);
    });
  });

  describe('when it is a updated message.', () => {
    it('should be update in the state array', () => {
      const topicMessages = [
        {
          deviceId: 'testDeviceId',
          externalHardwareId: 'testExternalHardwareId',
          type: 'testType',
          vendorId: 'testVendorId',
          topicAction: 'created',
          created: 1511215962473,
          updated: 1511215962473
        },
        {
          deviceId: 'testDeviceId',
          externalHardwareId: 'testExternalHardwareId',
          type: 'testType',
          vendorId: 'anotherVendorId',
          topicAction: 'updated',
          created: 1511215962474,
          updated: 1511215962474
        }
      ];

      const response = topicValidator.buildTopicState(
        topicMessages,
        'deviceId'
      );

      expect(response).toEqual([
        {
          deviceId: 'testDeviceId',
          externalHardwareId: 'testExternalHardwareId',
          type: 'testType',
          vendorId: 'anotherVendorId',
          topicAction: 'updated',
          created: 1511215962474,
          updated: 1511215962474
        }
      ]);
    });
  });

  describe('when it is a delete message.', () => {
    it('should be removed from the state array', () => {
      const topicMessages = [
        {
          deviceId: 'testDeviceId',
          externalHardwareId: 'testExternalHardwareId',
          type: 'testType',
          vendorId: 'testVendorId',
          topicAction: 'created',
          created: 1511215962473,
          updated: 1511215962473
        },
        {
          deviceId: 'testDeviceId',
          externalHardwareId: 'testExternalHardwareId',
          type: 'testType',
          vendorId: 'anotherVendorId',
          topicAction: 'updated',
          created: 1511215962474,
          updated: 1511215962474
        },
        {
          deviceId: 'testDeviceId',
          externalHardwareId: 'testExternalHardwareId',
          type: 'testType',
          vendorId: 'anotherVendorId',
          topicAction: 'deleted',
          created: 1511215962474,
          updated: 1511215962474
        }
      ];

      const response = topicValidator.buildTopicState(
        topicMessages,
        'deviceId'
      );

      expect(response).toEqual([]);
    });
  });
});

describe('.create', () => {
  it('should push the new record passed in into the state passed in.', () => {
    const response = topicValidator.create([], { test: 'test' });

    expect(response).toEqual([{ test: 'test' }]);
  });
});

describe('.update', () => {
  it('should update the record in state and return the new state.', () => {
    const existingObject = {
      id: 'testId',
      test: 'test'
    };

    const newRecord = {
      id: 'testId',
      test: 'updatedContent'
    };

    const existingState = [existingObject];
    const response = topicValidator.update(existingState, newRecord, 'id');

    expect(response).toEqual([newRecord]);
  });
});

describe('.remove', () => {
  it('should remove the record from state and return the new state object.', () => {
    const existingObject = {
      id: 'testId',
      test: 'test'
    };

    const newRecord = {
      id: 'testId',
      test: 'deletedContent'
    };

    const existingState = [existingObject];
    const response = topicValidator.remove(existingState, newRecord, 'id');

    expect(response).toEqual([]);
  });
});

describe('.isCreatable', () => {
  describe('when you can create a new message.', () => {
    it('should return true', () => {
      const existingObject = {
        id: 'testId',
        test: 'test'
      };
      const record = {
        id: 'otherId',
        test: 'deletedContent'
      };

      const topicMessages = [existingObject];
      const response = topicValidator.isCreatable(record, topicMessages, 'id');

      expect(response).toEqual(true);
    });
  });

  describe('when you cant create a new message.', () => {
    it('should return false', () => {
      const existingObject = {
        id: 'testId',
        test: 'test'
      };
      const record = {
        id: 'testId',
        test: 'deletedContent'
      };

      const topicMessages = [existingObject];
      const response = topicValidator.isCreatable(record, topicMessages, 'id');

      expect(response).toEqual(false);
    });
  });
});

describe('.isUpdatable', () => {
  describe('when a message is able to be updated.', () => {
    it('should return true', () => {
      const existingObject = {
        id: 'testId',
        test: 'test'
      };
      const record = {
        id: 'testId',
        test: 'deletedContent'
      };

      const topicMessages = [existingObject];
      const response = topicValidator.isUpdatable(record, topicMessages, 'id');

      expect(response).toEqual(true);
    });
  });

  describe('when a message is not able to be updated.', () => {
    it('should return false', () => {
      const existingObject = {
        id: 'testId',
        test: 'test'
      };
      const record = {
        id: 'otherId',
        test: 'deletedContent'
      };

      const topicMessages = [existingObject];
      const response = topicValidator.isUpdatable(record, topicMessages, 'id');

      expect(response).toEqual(false);
    });
  });
});

describe('.isRemovable', () => {
  describe('when a message is able to be removed or deleted.', () => {
    it('should return true', () => {
      const existingObject = {
        id: 'testId',
        test: 'test'
      };
      const record = {
        id: 'testId',
        test: 'deletedContent'
      };

      const topicMessages = [existingObject];
      const response = topicValidator.isRemovable(record, topicMessages, 'id');

      expect(response).toEqual(true);
    });
  });

  describe('when a message is not able to be removed or deleted.', () => {
    it('should return false', () => {
      const existingObject = {
        id: 'testId',
        test: 'test'
      };
      const record = {
        id: 'otherId',
        test: 'deletedContent'
      };

      const topicMessages = [existingObject];
      const response = topicValidator.isRemovable(record, topicMessages, 'id');

      expect(response).toEqual(false);
    });
  });
});
