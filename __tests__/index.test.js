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
        'deviceId',
        'topicAction'
      );

      expect(response).toEqual(topicMessages);
    });
  });

  describe('when the topicAction ', () => {
    it('should just return the state array', () => {
      const topicMessages = [
        {
          deviceId: '85dfee23-0e16-43a4-ae31-4b2f464b6151',
          externalHardwareId: 'shart',
          type: 'shart',
          vendorId: 'shart',
          topicAction: 'created',
          created: 1513616355890,
          updated: null
        },
        {
          deviceId: '85dfee23-0e16-43a4-ae31-4b2f464b6151',
          externalHardwareId: 'fart',
          type: 'shart',
          vendorId: 'shart',
          topicAction: 'updated',
          created: null,
          updated: 1513616370869
        },
        {
          deviceId: '85dfee23-0e16-43a4-ae31-4b2f464b6151',
          externalHardwareId: 'happy',
          type: 'shart',
          vendorId: 'shart',
          topicAction: 'updated',
          created: null,
          updated: 1513617476108
        },
        {
          deviceId: '85dfee23-0e16-43a4-ae31-4b2f464b6151',
          externalHardwareId: 'fourth',
          type: 'shart',
          vendorId: 'shart',
          topicAction: 'updated',
          created: null,
          updated: 1513617480690
        },
        {
          deviceId: '3b368431-5743-4311-a7a2-e84bd9c0012f',
          externalHardwareId: 'happy',
          type: 'tater',
          vendorId: 'shart',
          topicAction: 'created',
          created: 1513617566665,
          updated: null
        },
        {
          deviceId: 'dcf393c3-1520-478e-a491-7ea77bff06c8',
          externalHardwareId: 'happy',
          type: 'tater',
          vendorId: 'shart',
          topicAction: 'created',
          created: 1513619080946,
          updated: null
        },
        {
          deviceId: 'dcf393c3-1520-478e-a491-7ea77bff06c8',
          externalHardwareId: 'tater',
          type: 'shart',
          vendorId: 'shart',
          topicAction: 'updated',
          created: null,
          updated: 1513619341438
        },
        {
          deviceId: 'dcf393c3-1520-478e-a491-7ea77bff06c8',
          externalHardwareId: 'tater',
          type: 'shart',
          vendorId: 'shart',
          topicAction: 'deleted',
          created: null,
          updated: 1513619341438
        }
      ];

      const response = topicValidator.buildTopicState(
        topicMessages,
        'deviceId',
        'topicAction'
      );

      expect(response).toEqual([
        {
          deviceId: '85dfee23-0e16-43a4-ae31-4b2f464b6151',
          externalHardwareId: 'fourth',
          type: 'shart',
          vendorId: 'shart',
          topicAction: 'updated',
          created: null,
          updated: 1513617480690
        },
        {
          deviceId: '3b368431-5743-4311-a7a2-e84bd9c0012f',
          externalHardwareId: 'happy',
          type: 'tater',
          vendorId: 'shart',
          topicAction: 'created',
          created: 1513617566665,
          updated: null
        }
      ]);
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
        'deviceId',
        'topicAction'
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
        'deviceId',
        'topicAction'
      );

      expect(response).toEqual([]);
    });
  });

  describe('when an argument isnt passed in', () => {
    it('should throw argument error', () => {
      expect(() => {
        topicValidator.buildTopicState();
      }).toThrow();
    });
  });
});

describe('.create', () => {
  it('should push the new record passed in into the state passed in.', () => {
    const response = topicValidator.create([], { test: 'test' });

    expect(response).toEqual([{ test: 'test' }]);
  });

  describe('when an argument isnt passed in', () => {
    it('should throw argument error', () => {
      expect(() => {
        topicValidator.create();
      }).toThrow();
    });
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

  describe('when an argument isnt passed in', () => {
    it('should throw argument error', () => {
      expect(() => {
        topicValidator.update();
      }).toThrow();
    });
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

  describe('when an argument isnt passed in', () => {
    it('should throw argument error', () => {
      expect(() => {
        topicValidator.remove();
      }).toThrow();
    });
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

  describe('when an argument isnt passed in', () => {
    it('should throw argument error', () => {
      expect(() => {
        topicValidator.isCreatable();
      }).toThrow();
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

  describe('when an argument isnt passed in', () => {
    it('should throw argument error', () => {
      expect(() => {
        topicValidator.isUpdatable();
      }).toThrow();
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

  describe('when an argument isnt passed in', () => {
    it('should throw argument error', () => {
      expect(() => {
        topicValidator.isRemovable();
      }).toThrow();
    });
  });
});
