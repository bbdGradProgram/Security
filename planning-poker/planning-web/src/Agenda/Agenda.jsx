import React, { Dispatch, SetStateAction } from 'react';
import './Agenda.css';
import PropTypes from 'prop-types';
import { api } from '../backend.js';

/**
 *
 * @param {object} props - React Props
 * @param {Array<{ticketName: string, ticketId: string}>} props.tickets - tickets to be estimated
 * @param {Dispatch<SetStateAction<Array<{topic: string, score: number}>>>} props.setTickets - setState for tickets
 * @param {{ticketName: string, ticketId: string}} [props.currentTopic] - index of current topic
 * @param {Array<{ticketId: string, vote: string}>} props.votes - all the votes for the room
 * @param {{upn: string}} props.user - current User
 * @param {{owner: string}} props.room - room
 * @param {string} props.id - room id
 * @returns {JSX.Element} Agenda Component
 */
export default function Agenda({ tickets, setTickets, currentTopic, user, votes, room, id }) {
  /**
   * @param {object} value - array element
   * @param {string} value.ticketName - displayed ticket name
   * @param {string} value.ticketId - ticket id
   * @param {number} index - index of element in array
   * @returns {JSX.Element} Ticket Body
   */
  function getTicketBody({ ticketName, ticketId, revealed }, index) {
    const ticketVotes = votes.filter(vote => vote.ticketId === ticketId && !Number.isNaN(Number(vote.vote)));
    const noNumberVotes = revealed && ticketVotes.length === 0;
    return (
      <section
        className={ `container-v${currentTopic?.ticketId === ticketId ? ' current' : ''}` }
        key={ index }
      >
        <li>{ticketName}</li>
        <p>
        {
          ticketVotes.length > 0
          && revealed
          && (ticketVotes.reduce((sum, { vote }) => sum + Number(vote), 0) / ticketVotes.length).toFixed(1)
        }
          {
            noNumberVotes && ticketVotes.filter(vote => vote.ticketId === ticketId).reduce((acc, {vote}) => {
              acc[vote] = (acc[vote] || 0) + 1;
              if (!acc.max || acc[vote] > acc[acc.max]) acc.max = vote;
              return acc;
            }, { max: '?'}).max
          }
        </p>
      </section>
    );
  }

  return (
    <aside className='agenda v-container-h'>
      <h2>Agenda:</h2>
      <ol className='v-container'>
        {tickets.map(getTicketBody)}
        {
          room.owner === user.upn
          && <form
            className='container'
            onSubmit={
              event => {
                event.preventDefault();
                const topic = new FormData(event.target).get('topic');
                fetch(`${api}tickets/create`, {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('id_token')}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    ticketName: topic,
                    roomUuid: id,
                  }),
                });
                setTickets(prevState => [ // So user sees the new ticket straight away
                  ...prevState,
                  { ticketName: topic },
                ]);
                event.target.reset();
              }
            }
          >
            <textarea
              name='topic'
              required
            />
            <button type='submit'>
              Add topic
            </button>
          </form>
        }
      </ol>
    </aside>
  );
}

Agenda.propTypes = {
  tickets: PropTypes.array,
  setTickets: PropTypes.func,
  currentTopic: PropTypes.object,
  userInRoomDetails: PropTypes.object,
  room: PropTypes.object,
};
