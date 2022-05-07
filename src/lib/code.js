import 'ircbloq-blocks/arduino_compressed';
import 'ircbloq-blocks/python_compressed';

const getLanguageFromDeviceType = deviceType => {
    if (deviceType === 'arduino') {
        return 'cpp';
    } else if (deviceType === 'microbit' || deviceType === 'maixduino' || deviceType === 'raspberrypico' ) {
        return 'python';
    }
    return 'null';
};

const getGeneratorNameFromDeviceType = deviceType => {
    if (deviceType === 'arduino') {
        return 'Arduino';
    } else if (deviceType === 'microbit' || deviceType === 'maixduino' || deviceType === 'raspberrypico' ) {
        return 'Python';
    }
    return 'null';
};

export {
    getLanguageFromDeviceType,
    getGeneratorNameFromDeviceType
};