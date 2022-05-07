import GoogleAnalytics from 'react-ga';

import log from './log';

const GA_ID = (process.env.GA_ID || window.GA_ID);

const initialAnalytics = (clientId = null) => {
    if (GA_ID) {
        const arg = {
            debug: (process.env.NODE_ENV !== 'production'),
            titleCase: true,
            sampleRate: (process.env.NODE_ENV === 'production') ? 100 : 0,
            forceSSL: true,
            gaOptions: clientId ? {clientId: clientId} : null
        };

        GoogleAnalytics.initialize(GA_ID, arg);
    } else {
        log.info('Disabling GA because GA_ID is not set.');
        window.ga = () => {
            // The `react-ga` module calls this function to implement all Google Analytics calls. Providing an empty
            // function effectively disables `react-ga`. This is similar to the `testModeAPI` feature of `react-ga`
            // except that `testModeAPI` logs the arguments of every call into an array. That's nice for testing
            // purposes but would look like a memory leak in a live program.
        };
    }
};

export {
    GoogleAnalytics as default,
    initialAnalytics
};
