import React, { useEffect, useState } from 'react';
import './RoomChoose.css';
import PropTypes from 'prop-types';
import { api } from '../backend.js';
import { useNavigate } from 'react-router-dom';
import handleSignIn from '../handleSignIn.js';

/**
 * @param {object} props - react props
 * @param {Function} props.setUser - setState function
 * @param {{upn: string}} props.user - user details
 * @returns {JSX.Element} RoomChoose page
 */
export default function RoomChoose({ setUser, user }) {
  const navigateTo = useNavigate();
  const [loggingIn, setLoggingIn] = useState(false);

  const createRoom = () => fetch(`${api}rooms/create`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('id_token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      roomName: ':)',
      closed: false,
    }),
  })
    .then(response => response.json())
    .then(data => navigateTo(`/room/${data.roomUuid}`));

  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      const params = new URLSearchParams(hash.slice(1));
      const accessToken = params.get('access_token');
      const idToken = params.get('id_token');
      const redirectPath = params.get('state');

      if (accessToken && idToken) {
        setLoggingIn(true);
        window.location.hash = '';
        setTimeout(() => {

          sessionStorage.setItem('access_token', accessToken);
          sessionStorage.setItem('id_token', idToken);

          fetch(`${api}users/create`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('id_token')}`,
              'Content-Type': 'application/json',
            },
          })
            .then(response => response.json())
            .then(userData => {
              setUser(userData);
              if (redirectPath === 'create') createRoom();
              else navigateTo(`/${redirectPath}`, { replace: true });
            });
        }, 50);
      }
    }
  }, []);

  if (loggingIn) return <h2>Logging you in...</h2>;

  return (
    <main className='room-choose container'>
      <section className='container'>

        <form
          className='v-container'
          onSubmit={
            event => {
              event.preventDefault();
              if (user) createRoom();
              else handleSignIn('create');
            }
          }
        >
          <h2>Create a room</h2>
          <article className='v-container'>
            <p>Simply click the button below, and your room will be ready for your team to join and start estimating in
              no
              time. </p>
            <p>Whether you're planning a sprint, breaking down tasks, or aligning on project priorities, this tool
              ensures a smooth and interactive experience.</p>
            <p> Get started now and make your estimation sessions more
              effective and fun!</p>
          </article>
          <button type='submit'>Create</button>
        </form>
        <form
          className='v-container'
          onSubmit={
            event => {
              event.preventDefault();
              const form = new FormData(event.target);
              if (sessionStorage.getItem('id_token')) {
                navigateTo(`room/${form.get('code')}`);
              } else {
                handleSignIn(`room/${form.get('code')}`);
              }
            }
          }
        >
          <h2>Join a room</h2>
          <article className='v-container'>
            <p>Just enter the room details provided by your session host, and you’ll be seamlessly connected to your
              team’s virtual space.</p>
            <p> Whether you're planning a sprint or assessing project priorities, joining a Planning
              Poker session has never been easier.</p>
            <p> Get started now and contribute to your team’s success!</p>
          </article>
          <label className='container-v'>
            <p>Room Code:</p>
            <input
              type='text'
              name='code'
              required
            />
          </label>
          <button type='submit'>Join</button>
        </form>
      </section>
    </main>
  );
}

RoomChoose.propTypes = {setUser: PropTypes.func};
