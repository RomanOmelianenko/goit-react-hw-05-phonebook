import React, { Component } from "react";
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from "uuid";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import Header from './Header/Header';
import Logo from './Logo/Logo';
import ShowModalWarning from './ShowModal/ShowModalWarning';
import './App.css';

class App extends Component {

 static propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            number: PropTypes.number
        })
    ),
    filter: PropTypes.string,
    modalWarning: PropTypes.bool
    };

    state = {
        contacts: [
            // { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
            // { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
            // { id: "id-3", name: "Eden Clements", number: "645-17-79" },
            // { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
        ],
        filter: "",
        modalWarning: false
    };
    
    componentDidUpdate(prevProps, prevState) {
        
        const { contacts, modalWarning } = this.state;

        if (prevState.contacts !== contacts) {
            localStorage.setItem('contacts', JSON.stringify(contacts))
        };

        if (prevState.modalWarning !== modalWarning) {
            setTimeout(() => { this.setState({ modalWarning: false }) }, 2000)
        }
    };

    componentDidMount() {
        
        const prevContacts = localStorage.getItem('contacts');
        
        if (prevContacts !== null) {
            this.setState({
                contacts: JSON.parse(prevContacts)
            });
        };
    };

    addContact = task => {
        const addName = this.state.contacts
            .map((contact) => contact.name)
            .includes(task.name);

        const inputNumber = Number(task.number)

        if (addName) {
            this.setState({ modalWarning: true });
        } else if (task.name.length === 0) {
            alert("Field 'Name' must be filled!");
        } else if (task.number.length === 0) {
            alert("Field 'Number' must be filled!")
        } else if (!inputNumber) {
            alert("Insert the number")
        } else {
            const contact = {
                ...task,
                id: uuidv4(),
            };

            this.setState(prevState => ({
                contacts: [...prevState.contacts, contact],
            }));
        };
    };

    changeFilter = (filter) => {
        this.setState({ filter });
    };

    getVisibleContacts = () => {
        const { contacts, filter } = this.state;

        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
        );
    };

    removeContact = (contactId) => {
        this.setState((prevState) => {
          return {
              contacts: prevState.contacts.filter(({ id }) => id !== contactId),
            };
      });
  };

    render() {
        const { filter, contacts, modalWarning } = this.state;

        const visibleContacts = this.getVisibleContacts();

        return (
            <div className="Wrapper">

                <CSSTransition
                    in={true}
                    appear={true}
                    timeout={500}
                    classNames="HeaderAppear"
                    unmountOnExit
                >
                {stage => {
                    // console.log(stage);
                    return (
                        <div className="Header">
                            <Header />
                            <CSSTransition
                                in={stage === 'entered'}
                                timeout={500}
                                classNames="LogoAppear"
                                unmountOnExit
                            >
                                <Logo />
                            </CSSTransition>
                        </div>
                    )
                }}
                </CSSTransition>
                    <ContactForm
                    onAddContact={this.addContact}
                />

                <CSSTransition
                    in={contacts.length > 1}
                    timeout={250}
                    classNames="FilterAppear"
                    unmountOnExit
                >
                    <Filter
                        value={filter}
                        onChangeFilter={this.changeFilter}
                    />
                </CSSTransition>
                
                <CSSTransition
                    in={contacts.length > 0}
                    timeout={250}
                    classNames="ContactsAppear"
                    unmountOnExit
                >
                    <h2 className="ContactsName">
                        Contacts
                    </h2>
                </CSSTransition>
                
                <CSSTransition
                    in={visibleContacts.length > 0}
                    timeout={250}
                    classNames="ContactListApp"
                    // unmountOnExit
                >
                    <ContactList
                        contacts={visibleContacts}
                        onRemoveContact={this.removeContact}
                    />
                </CSSTransition>

                <CSSTransition
                    in={modalWarning}
                    timeout={250}
                    classNames="ShowModalAppear"
                    unmountOnExit
                >
                    <ShowModalWarning />
                </CSSTransition>
               
            </div>
        );
    };
};

export default App;