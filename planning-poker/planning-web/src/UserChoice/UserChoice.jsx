import React from 'react';
import './UserChoice.css';
import PropTypes from 'prop-types';

/**
 *
 * @param {object} props - React Props
 * @param {string} props.name - username
 * @param {object} [props.choice] - numeric or other choice
 * @param {boolean} props.hidden - whether to hide or display choice
 * @returns {JSX.Element} UserChoice Component
 */
export default function UserChoice({ name, choice, hidden }) {
  return (
    <li className='user-choice v-container-h'>
      <p>{name}</p>
      {choice ? <figure className={ `v-container-hv${hidden ? ' hidden' : ''}` }>{choice.vote}</figure> : <div className='v-container'><p>empty</p></div>}
    </li>
  );
}

UserChoice.propTypes = {
  name: PropTypes.string,
  choice: PropTypes.object,
  hidden: PropTypes.bool,
};
