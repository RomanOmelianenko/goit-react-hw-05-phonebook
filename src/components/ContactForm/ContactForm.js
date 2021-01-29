import React, { Component } from "react";
import PropTypes from 'prop-types';
import styles from "./ContactForm.module.css";

class ContactForm extends Component {
    static propTypes = {
        name: PropTypes.string,
        number: PropTypes.string,
        onAddContact: PropTypes.func.isRequired
    };
    
    state = {
        name: "",
        number: "",
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.onAddContact({ ...this.state });

        this.setState({ name: "", number: "" });
    };
  
    render() {
        return (
            <form
                className={styles.TaskEditor}
                onSubmit={this.handleSubmit}>
                <label
                    className={styles.TaskEditor_label}>
                    Name
                        <input
                            className={styles.TaskEditor_input}
                            type="text"
                            name="name"
                            placeholder="Your name"
                            autoComplete="off"
                            autoFocus="on"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                </label>

                <label
                    className={styles.TaskEditor_label}>
                    Number
                    <input
                        className={styles.TaskEditor_input}
                        type="text"
                        name="number"
                        placeholder="Your number"
                        autoComplete="off"
                        value={this.state.number}
                        onChange={this.handleChange}
                    />
                </label>

                <button
                    className={styles.TaskEditor_button}
                    type="submit">
                    Add contact
                </button>
            </form>
        );
    };
};

export default ContactForm;
