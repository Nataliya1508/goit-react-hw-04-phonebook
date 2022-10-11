import { React} from 'react';
import {Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import styles from './ContactForm.module.css';


export default class ContactForm extends Component {
    state = {
        name: '',
        number: '',
    }
    
    nameId = nanoid();
    numberId = nanoid();


   handleChangeForm = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        })

    }

    handleFormSubmit = e => {
        e.preventDefault()

        const { name, number } = this.state;
        const { onAddContact } = this.props;

        const isValidatedForm = this.validateForm()

        if (!isValidatedForm) return
        onAddContact({ id: nanoid(), name, number })
        
        this.setState({
            name: '',
            number: ''
        })
    }

    validateForm = () => {
        const { name, number } = this.state;
        const { onCheck } = this.props
        if (name.value === name || number.value === number) {
            alert(`${name} is already in contacts`);
            return false
        }
        return onCheck(name)
    }


    render() {
        const { name, number } = this.state
        const { nameId, numberId } = this;
        const { handleChangeForm, handleFormSubmit } = this;
        return (
            <div className={styles.phonebook}>
                <h2>Phonebook</h2>
                <form onSubmit={handleFormSubmit}>
                    <label htmlFor={nameId}>Name</label>
                    <input
                        type="text"
                        name="name"
                        id={nameId}
                        placeholder='Enter name'
                        value={name}
                        onChange={handleChangeForm}
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                    />
                    <br />
                    <label htmlFor={numberId}>Number</label>
                    <input
                        type="tel"
                        id={numberId}
                        name="number"
                        placeholder='Enter phone number'
                        value={number}
                        onChange={handleChangeForm}
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                    />
                    <br />
                    <button
                        type='submit'
                        onClick={() => { }}>Add contact</button>
                    <br />
                </form>
            </div>
        )
    }
}

ContactForm.propTypes = {
    onAddContact: PropTypes.func.isRequired,
    onCheck: PropTypes.func.isRequired,
};

 