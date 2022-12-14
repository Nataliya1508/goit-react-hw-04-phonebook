import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import {ContactList} from './ContactList/ContactList';
import { Filter } from './Filter/Filter';


export default function App() {
  const PhoneContacts = [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  const [contacts, setContacts] = useState(() => JSON.parse(localStorage.getItem('contacts')) || PhoneContacts);
  
  const [filter, setFilter] = useState('');
  

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    }
    return contacts.find(
      contact => newContact.name.toLocaleLowerCase() === contact.name.toLocaleLowerCase()) ? 
        alert(`${newContact.name} is already in contacts`) : setContacts(() => [...contacts, newContact ]);


    }

  
  const handleremoveContact = id=> {
     setContacts(() => contacts.filter(contact => contact.id !== id));
  };

  const onFilter = () => {

    if (!filter) {
      return contacts;
    }
    
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()));
  };

   const handleFilterChange = e => {
    setFilter(e.carrentTarget.value);
}
  
  return (
 <>
        <ContactForm
          onAddContact={handleAddContact}
        />

        <ContactList
          contacts={onFilter()}
          onRemove={handleremoveContact}
        >
         <Filter value={filter} onChange={handleFilterChange} /> 
          </ContactList>  
      </>
  )
  
}
  


