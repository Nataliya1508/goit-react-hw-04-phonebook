import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import styles from './ContactForm.module.css';

export default function ContactForm({onAddContact}) {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');



     const nameId = nanoid();
    const numberId = nanoid();


   const handleChangeForm = (e) => {
        const { name, value } = e.target;
       
       switch (name) {
           case "name":
               setName(value);
               break;
           
           case "number":
               setNumber(value);
               break;
           default:
               return;
}
    }

     const handleFormSubmit = e => {
         e.preventDefault()

             onAddContact({id: nanoid(), name, number});
         
             setName('')
             setNumber('')
            
}


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
                    type='submit'>Add contact</button>
                <br />
            </form>
        </div>
    );
};

ContactForm.propTypes = {
    onAddContact: PropTypes.func.isRequired,
    // onCheck: PropTypes.func.isRequired,
};

 