const UPDATE_TOOLBOX = 'scratch-gui/toolbox/UPDATE_TOOLBOX';
const IS_UPDATING = 'scratch-gui/toolbox/IS_UPDATING';
import makeToolboxXML from '../lib/make-toolbox-xml';

const initialState = {
    toolboxXML: makeToolboxXML(true),
    isToolboxUpdating: false
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case UPDATE_TOOLBOX:
        return Object.assign({}, state, {
            toolboxXML: action.toolboxXML
        });
    case IS_UPDATING:
        return Object.assign({}, state, {
            isToolboxUpdating: action.state
        });
    default:
        return state;
    }
};

const updateToolbox = function (toolboxXML) {
    return {
        type: UPDATE_TOOLBOX,
        toolboxXML: toolboxXML
    };
};

const setIsUpdating = state => ({
    type: IS_UPDATING,
    state: state
});

export {
    reducer as default,
    initialState as toolboxInitialState,
    updateToolbox,
    setIsUpdating
};
