import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import React from 'react';
import MessageBoxType from '../lib/message-box.js';

const MenuBarHOC = function (WrappedComponent) {
    class MenuBarContainer extends React.PureComponent {
        constructor (props) {
            super(props);

            bindAll(this, [
                'confirmReadyToReplaceProject',
                'confirmClearCache',
                'shouldSaveBeforeTransition'
            ]);
        }
        confirmReadyToReplaceProject (message) {
            let readyToReplaceProject = true;
            if (this.props.projectChanged && !this.props.canCreateNew) {
                readyToReplaceProject = this.props.onShowMessageBox(MessageBoxType.confirm, message);
            }
            return readyToReplaceProject;
        }
        confirmClearCache (message) {
            let readyClearCache = true;
            readyClearCache = this.props.onShowMessageBox(MessageBoxType.confirm, message);
            return readyClearCache;
        }
        shouldSaveBeforeTransition () {
            return (this.props.canSave && this.props.projectChanged);
        }
        render () {
            const {
                /* eslint-disable no-unused-vars */
                projectChanged,
                /* eslint-enable no-unused-vars */
                ...props
            } = this.props;
            return (<WrappedComponent
                confirmReadyToReplaceProject={this.confirmReadyToReplaceProject}
                confirmClearCache={this.confirmClearCache}
                shouldSaveBeforeTransition={this.shouldSaveBeforeTransition}
                {...props}
            />);
        }
    }

    MenuBarContainer.propTypes = {
        canCreateNew: PropTypes.bool,
        canSave: PropTypes.bool,
        onShowMessageBox: PropTypes.func.isRequired,
        projectChanged: PropTypes.bool
    };
    const mapStateToProps = state => ({
        projectChanged: state.scratchGui.projectChanged
    });
    const mapDispatchToProps = () => ({});
    // Allow incoming props to override redux-provided props. Used to mock in tests.
    const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(
        {}, stateProps, dispatchProps, ownProps
    );
    return connect(
        mapStateToProps,
        mapDispatchToProps,
        mergeProps
    )(MenuBarContainer);
};

export default MenuBarHOC;
