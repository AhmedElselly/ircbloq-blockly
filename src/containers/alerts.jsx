import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import VM from 'ircbloq-vm';

import {
    closeAlert,
    filterPopupAlerts
} from '../reducers/alerts';

import AlertsComponent from '../components/alerts/alerts.jsx';

const Alerts = ({
    alertsList,
    className,
    onCloseAlert,
    vm
}) => (
    <AlertsComponent
        // only display standard and extension alerts here
        alertsList={filterPopupAlerts(alertsList)}
        className={className}
        onCloseAlert={onCloseAlert}
        vm={vm}
    />
);

Alerts.propTypes = {
    alertsList: PropTypes.arrayOf(PropTypes.object),
    className: PropTypes.string,
    onCloseAlert: PropTypes.func,
    vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = state => ({
    alertsList: state.scratchGui.alerts.alertsList
});

const mapDispatchToProps = dispatch => ({
    onCloseAlert: index => dispatch(closeAlert(index))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Alerts);
