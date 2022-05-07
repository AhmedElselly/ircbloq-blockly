import PropTypes from 'prop-types';
import React from 'react';
import Menu from '../../containers/menu.jsx';

const MenuBarMenu = ({
    children,
    className,
    menuClassName,
    onRequestClose,
    open,
    place = 'right',
    directiron = 'down'
}) => (
    <div className={className}>
        <Menu
            open={open}
            place={place}
            directiron={directiron}
            onRequestClose={onRequestClose}
            className={menuClassName}
        >
            {children}
        </Menu>
    </div>
);

MenuBarMenu.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    menuClassName: PropTypes.string,
    onRequestClose: PropTypes.func,
    open: PropTypes.bool,
    place: PropTypes.oneOf(['left', 'right']),
    directiron: PropTypes.oneOf(['donw', 'up'])
};

export default MenuBarMenu;
