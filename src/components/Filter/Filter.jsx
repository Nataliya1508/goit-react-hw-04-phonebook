import { React } from 'react';
import PropTypes from 'prop-types';
import styles from './Filter.module.css';
import { nanoid } from 'nanoid';


 export const Filter = ({ value, onChange }) => {
  const filterId = nanoid();
  return (<div>
    <label htmlFor={filterId}>Find contacts by name</label>
    <input className={styles.filter} id={filterId} type="text" name="filter" value={value} onChange={onChange} placeholder='Enter name'/>
  </div>);
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}