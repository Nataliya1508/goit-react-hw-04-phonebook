import { React} from 'react';
import {Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import {ContactList} from './ContactList/ContactList';
import {Filter} from './Filter/Filter';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contactsLocalStorage = JSON.parse(localStorage.getItem("contacts"));
    if (contactsLocalStorage?.length) {
      this.setState({
        contacts: contactsLocalStorage
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      const contactsLocalStorage = JSON.stringify(this.state.contacts);
      localStorage.setItem("contacts", contactsLocalStorage)
    }

  }


  handleAddContact = newContact =>
  
    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));

  handleCheckValue = (name) => {
    const { contacts } = this.state;
    const result = !!contacts.find(contact => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase());

    result && alert(`${name} is already in contacts`);

    return !result;
  };


  handleremoveContact = id =>
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));


  handleFilterChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
}


  getNormalize = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { filter } = this.state;
    const normalizeContacts = this.getNormalize();
    return (
      <>
        <ContactForm
          onAddContact={this.handleAddContact}
          onCheck={this.handleCheckValue}
        />

        <ContactList
          contacts={normalizeContacts}
          onRemove={this.handleremoveContact}
        >
         <Filter filter={filter} onChange={this.handleFilterChange} /> 
          </ContactList>
          
      </>
    );
  }
}

