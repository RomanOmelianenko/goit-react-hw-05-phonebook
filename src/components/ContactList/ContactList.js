import React from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import './ContactList.css';

function ContactList({ contacts, onRemoveContact }) {

    return (
        <TransitionGroup
            component="ul"
            className="TaskList">
            
            {contacts.map(contact => (
                <CSSTransition
                    key={contact.id}
                    timeout={250}
                    classNames="ContactListAppear"
                    // unmountOnExit
                >
                    <li
                        className="TaskList_item"
                        /*key={contact.id}*/>
                        {contact.name}: {contact.number}
                        {
                            <button
                                className="TaskList_button"
                                type="button"
                                name="delete"
                                onClick={() => onRemoveContact(contact.id)}
                            >
                                x
                            </button>
                        }
                    </li>
                </CSSTransition>
            ))}
        </TransitionGroup>
    );
    
};

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
    })),
}

export default ContactList;