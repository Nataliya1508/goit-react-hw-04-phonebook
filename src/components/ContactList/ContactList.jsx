import { React } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactList.module.css';

 export const ContactList = ({ contacts, onRemove}) => {
  return (
    <div className={styles.contacts}>
      <h2>Contacts</h2>
      <ul>
        {contacts.length === 0 ? false : (
          <>
            {contacts.map(contact => {
              return (
                <li key={contact.id}>
                  <p>
                    <span>{contact.name} : </span>
                    {contact.number}
                  </p>
                  <button
                    onClick={() => {
                      onRemove(contact.id);
                    }}
                  >
                    X
                  </button>
                </li>
              );
      })}
          </>
        )}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string.isRequired)),
    onRemove: PropTypes.func.isRequired,
}