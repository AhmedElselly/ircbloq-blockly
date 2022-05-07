import keyMirror from 'keymirror';

/**
 * Names for message box type
 * @enum {string}
 */
const MessageBoxType = keyMirror({
    /**
     * Confirm message box.
     */
    confirm: null,

    /**
     * Alert message box.
     */
    alert: null
});

export default MessageBoxType;