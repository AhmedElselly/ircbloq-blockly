import classNames from 'classnames';
import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import LibraryItem from '../../containers/library-item.jsx';
import Modal from '../../containers/modal.jsx';
import Divider from '../divider/divider.jsx';
import Filter from '../filter/filter.jsx';
import TagButton from '../../containers/tag-button.jsx';
import Spinner from '../spinner/spinner.jsx';

import styles from './library.css';

import {getAllCourses} from '../../actions/courseApi';
import {isAuthenticated} from '../../actions/userApi';
import {read} from '../../actions/enrolApi';

const messages = defineMessages({
    filterPlaceholder: {
        id: 'gui.library.filterPlaceholder',
        defaultMessage: 'Search',
        description: 'Placeholder text for library search field'
    },
    allTag: {
        id: 'gui.library.allTag',
        defaultMessage: 'All',
        description: 'Label for library tag to revert to all items after filtering by tag.'
    }
});

const ALL_TAG = {tag: 'all', intlLabel: messages.allTag};
const tagListPrefix = [ALL_TAG];

class LibraryComponent extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClose',
            'handleFilterChange',
            'handleFilterClear',
            'handleMouseEnter',
            'handleMouseLeave',
            'handlePlayingEnd',
            'handleSelect',
            'handleTagClick',
            'setFilteredDataRef'
        ]);
        this.state = {
            playingItem: null,
            filterQuery: '',
            selectedTag: ALL_TAG.tag,
            loaded: false,
            showMessage: false,
            message: '',
            data: []
        };
    }
    componentDidMount () {
        // Allow the spinner to display before loading the content
        this.getFilteredData();
        setTimeout(() => {
            this.setState({loaded: true});
        });
        if (this.props.setStopHandler) this.props.setStopHandler(this.handlePlayingEnd);
        if(this.state.showMessage){
            // setTimeout(() => {
            //     this.setState({showMessage: false});
            // }, 5000);
        }
    }
    componentDidUpdate (prevProps, prevState) {
        if (prevState.filterQuery !== this.state.filterQuery ||
            prevState.selectedTag !== this.state.selectedTag) {
            this.scrollToTop();
        }
    }
    handleSelect (index, _id) {
        
        const userId = isAuthenticated().user._id;
        read(_id, userId).then(res => {
            if(res.data.message){
                this.setState({showMessage: true});
                this.setState({message: res.data.message})
            } else {
                if (this.props.autoClose) {
                    this.handleClose();
                }
                this.props.onItemSelected(this.getFilteredData()[index]);
                // this.props.onItemSelected(this.state.data[id]);
            }
        })
        
    }
    handleClose () {
        this.props.onRequestClose();
    }
    handleTagClick (tag) {
        if (this.state.playingItem === null) {
            this.setState({
                filterQuery: '',
                selectedTag: tag.toLowerCase()
            });
        } else {
            this.props.onItemMouseLeave(this.getFilteredData()[[this.state.playingItem]]);
            this.setState({
                filterQuery: '',
                playingItem: null,
                selectedTag: tag.toLowerCase()
            });
        }
    }
    handleMouseEnter (id) {
        // don't restart if mouse over already playing item
        if (this.props.onItemMouseEnter && this.state.playingItem !== id) {
            this.props.onItemMouseEnter(this.getFilteredData()[id]);
            this.setState({
                playingItem: id
            });
        }
    }
    handleMouseLeave (id) {
        if (this.props.onItemMouseLeave) {
            this.props.onItemMouseLeave(this.getFilteredData()[id]);
            this.setState({
                playingItem: null
            });
        }
    }
    handlePlayingEnd () {
        if (this.state.playingItem !== null) {
            this.setState({
                playingItem: null
            });
        }
    }
    handleFilterChange (event) {
        if (this.state.playingItem === null) {
            this.setState({
                filterQuery: event.target.value,
                selectedTag: ALL_TAG.tag
            });
        } else {
            this.props.onItemMouseLeave(this.getFilteredData()[[this.state.playingItem]]);
            this.setState({
                filterQuery: event.target.value,
                playingItem: null,
                selectedTag: ALL_TAG.tag
            });
        }
    }
    handleFilterClear () {
        this.setState({filterQuery: ''});
    }
    getFilteredData () {
       getAllCourses().then(res => {
            console.log(res.data)
            this.setState({data: res.data});
           
        })  
        const data = this.props.data.filter(device => device.hide !== true);
        if (this.state.selectedTag === 'all') {
            if (!this.state.filterQuery) return data;
            return data.filter(dataItem => (
                (dataItem.tags || [])
                    // Second argument to map sets `this`
                    .map(String.prototype.toLowerCase.call, String.prototype.toLowerCase)
                    .concat(dataItem.name ?
                        (typeof dataItem.name === 'string' ?
                        // Use the name if it is a string, else use formatMessage to get the translated name
                            dataItem.name : this.props.intl.formatMessage(dataItem.name.props)
                        ).toLowerCase() :
                        null)
                    .join('\n') // unlikely to partially match newlines
                    .indexOf(this.state.filterQuery.toLowerCase()) !== -1
            ));
        }
        return data.filter(dataItem => (
            dataItem.tags &&
            dataItem.tags
                .map(String.prototype.toLowerCase.call, String.prototype.toLowerCase)
                .indexOf(this.state.selectedTag) !== -1
        ));      
    }
    scrollToTop () {
        this.filteredDataRef.scrollTop = 0;
    }
    setFilteredDataRef (ref) {
        this.filteredDataRef = ref;
    }

    // getDevices = () => {
    //     return this.state.data?.map((dataItem, index) => {
    //         console.log(dataItem)
    //         return (
    //             <LibraryItem
    //                 author={dataItem.author}
    //                 bluetoothRequired={dataItem.bluetoothRequired}
    //                 serialportRequired={dataItem.serialportRequired}
    //                 programMode={dataItem.programMode}
    //                 programLanguage={dataItem.programLanguage}
    //                 collaborator={dataItem.collaborator}
    //                 description={dataItem.description}
    //                 disabled={dataItem.disabled}
    //                 extensionId={dataItem.extensionId}
    //                 deviceId={dataItem._id}
    //                 featured={dataItem.featured}
    //                 helpLink={dataItem.helpLink}
    //                 hidden={dataItem.hidden}
    //                 iconMd5={dataItem.costumes ? dataItem.costumes[0].md5ext : dataItem.md5ext}
    //                 iconRawURL={dataItem.rawURL}
    //                 icons={dataItem.costumes}
    //                 id={index}
    //                 insetIconURL={dataItem.insetIconURL}
    //                 internetConnectionRequired={dataItem.internetConnectionRequired}
    //                 isLoaded={dataItem.isLoaded}
    //                 isUnloadble={this.props.isUnloadble}
    //                 isPlaying={this.state.playingItem === index}
    //                 key={typeof dataItem.name === 'string' ? dataItem.name : dataItem.rawURL}
    //                 learnMore={dataItem.learnMore}
    //                 manufactor={dataItem.manufactor}
    //                 name={dataItem.name}
    //                 showPlayButton={this.props.showPlayButton}
    //                 onMouseEnter={this.handleMouseEnter}
    //                 onMouseLeave={this.handleMouseLeave}
    //                 onSelect={this.handleSelect}
    //                 version={dataItem.version}
    //             />
    //     )});
    // }

    handleCloseMessage = () => {
        this.setState({showMessage: false});
    }

    render () {
        const getDevices = this.state.data?.map((dataItem, index) => {
            // console.log(dataItem.description)
            return (
                <LibraryItem
                    author={dataItem.author}
                    image={dataItem.image}
                    bluetoothRequired={dataItem.bluetoothRequired}
                    serialportRequired={dataItem.serialportRequired}
                    programMode={dataItem.programMode}
                    programLanguage={dataItem.programLanguage}
                    collaborator={dataItem.collaborator}
                    _id={dataItem._id}
                    description={dataItem.description}
                    disabled={dataItem.disabled}
                    extensionId={dataItem.extensionId}
                    deviceId={dataItem.deviceId}
                    featured={dataItem.featured}
                    helpLink={dataItem.helpLink}
                    hidden={dataItem.hidden}
                    iconMd5={dataItem.costumes ? dataItem.costumes[0].md5ext : dataItem.md5ext}
                    iconRawURL={dataItem.rawURL}
                    icons={dataItem.costumes}
                    id={index}
                    insetIconURL={dataItem.insetIconURL}
                    internetConnectionRequired={dataItem.internetConnectionRequired}
                    isLoaded={dataItem.isLoaded}
                    isUnloadble={this.props.isUnloadble}
                    isPlaying={this.state.playingItem === index}
                    key={typeof dataItem.name === 'string' ? dataItem.name : dataItem.rawURL}
                    learnMore={dataItem.link}
                    manufactor={dataItem.manufactor}
                    name={dataItem.name}
                    showPlayButton={this.props.showPlayButton}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                    onSelect={this.handleSelect}
                    version={dataItem.version}
                />
        )});
        return (
            <Modal
                fullScreen
                contentLabel={this.props.title}
                id={this.props.id}
                onRequestClose={this.handleClose}
            >
                {this.state.showMessage && (
                    <div className={styles.showMessage}>
                        <span onClick={this.handleCloseMessage} className={styles.close}>X</span>
                        {this.state.message}
                    </div>
                )}
                {(this.props.filterable || this.props.tags) && (
                    <div className={styles.filterBar}>
                        {this.props.filterable && (
                            <Filter
                                className={classNames(
                                    styles.filterBarItem,
                                    styles.filter
                                )}
                                filterQuery={this.state.filterQuery}
                                inputClassName={styles.filterInput}
                                placeholderText={this.props.intl.formatMessage(messages.filterPlaceholder)}
                                onChange={this.handleFilterChange}
                                onClear={this.handleFilterClear}
                            />
                        )}
                        {this.props.filterable && this.props.tags && (
                            <Divider className={classNames(styles.filterBarItem, styles.divider)} />
                        )}
                        {this.props.tags &&
                            <div className={styles.tagWrapper}>
                                {tagListPrefix.concat(this.props.tags).map((tagProps, id) => (
                                    <TagButton
                                        active={this.state.selectedTag === tagProps.tag.toLowerCase()}
                                        className={classNames(
                                            styles.filterBarItem,
                                            styles.tagButton,
                                            tagProps.className
                                        )}
                                        key={`tag-button-${id}`}
                                        onClick={this.handleTagClick}
                                        {...tagProps}
                                    />
                                ))}
                            </div>
                        }
                    </div>
                )}
                <div
                    className={classNames(styles.libraryScrollGrid, {
                        [styles.withFilterBar]: this.props.filterable || this.props.tags
                    })}
                    ref={this.setFilteredDataRef}
                >
                    {this.state.loaded ? (
                        <Fragment>
                        {getDevices}
                        </Fragment>
                    ) : (
                        <div className={styles.spinnerWrapper}>
                            <Spinner
                                large
                                level="primary"
                            />
                        </div>
                    )}
                </div>
            </Modal>
        );
    }
}

LibraryComponent.propTypes = {
    autoClose: PropTypes.bool,
    data: PropTypes.arrayOf(
        /* eslint-disable react/no-unused-prop-types, lines-around-comment */
        // An item in the library
        PropTypes.shape({
            // @todo remove md5/rawURL prop from library, refactor to use storage
            md5: PropTypes.string,
            name: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.node
            ]),
            rawURL: PropTypes.string
        })
        /* eslint-enable react/no-unused-prop-types, lines-around-comment */
    ),
    filterable: PropTypes.bool,
    id: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    isUnloadble: PropTypes.bool,
    onItemMouseEnter: PropTypes.func,
    onItemMouseLeave: PropTypes.func,
    onItemSelected: PropTypes.func,
    onRequestClose: PropTypes.func,
    setStopHandler: PropTypes.func,
    showPlayButton: PropTypes.bool,
    tags: PropTypes.arrayOf(PropTypes.shape(TagButton.propTypes)),
    title: PropTypes.string.isRequired
};

LibraryComponent.defaultProps = {
    autoClose: true,
    isUnloadble: false,
    filterable: true,
    showPlayButton: false
};

export default injectIntl(LibraryComponent);
