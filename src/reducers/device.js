const SET_ID = 'scratch-gui/device/setId';
const CLEAR_ID = 'scratch-gui/device/clearId';
const SET_NAME = 'scratch-gui/device/setName';
const CLEAR_NAME = 'scratch-gui/device/clearName';
const SET_TYPE = 'scratch-gui/device/setType';
const CLEAR_TYPE = 'scratch-gui/device/clearType';

const initialState = {
    deviceId: null,
    deviceName: null,
    deviceType: null
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_ID:
        return Object.assign({}, state, {
            deviceId: action.deviceId
        });
    case CLEAR_ID:
        return Object.assign({}, state, {
            deviceId: null
        });
    case SET_NAME:
        return Object.assign({}, state, {
            deviceName: action.deviceName
        });
    case CLEAR_NAME:
        return Object.assign({}, state, {
            deviceName: null
        });
    case SET_TYPE:
        return Object.assign({}, state, {
            deviceType: action.deviceType
        });
    case CLEAR_TYPE:
        return Object.assign({}, state, {
            deviceType: null
        });
    default:
        return state;
    }
};

const setDeviceId = function (deviceId) {
    return {
        type: SET_ID,
        deviceId: deviceId
    };
};

const clearDeviceId = function () {
    return {
        type: CLEAR_ID
    };
};

const setDeviceName = function (deviceName) {
    return {
        type: SET_NAME,
        deviceName: deviceName
    };
};

const clearDeviceName = function () {
    return {
        type: CLEAR_NAME
    };
};

const setDeviceType = function (deviceType) {
    return {
        type: SET_TYPE,
        deviceType: deviceType
    };
};

const clearDeviceType = function () {
    return {
        type: CLEAR_TYPE
    };
};

export {
    reducer as default,
    initialState as deviceInitialState,
    setDeviceId,
    clearDeviceId,
    setDeviceName,
    clearDeviceName,
    setDeviceType,
    clearDeviceType
};
