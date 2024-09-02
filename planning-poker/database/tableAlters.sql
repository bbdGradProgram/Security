--changeset stefan:ddl:users_in_rooms:fk_users
ALTER TABLE users_in_rooms
ADD CONSTRAINT fk_users
FOREIGN KEY (user_id) REFERENCES users(user_id);
--rollback ALTER TABLE "users_in_rooms" DROP CONSTRAINT fk_users

--changeset stefan:ddl:users_in_rooms:fk_rooms
ALTER TABLE users_in_rooms
ADD CONSTRAINT fk_rooms
FOREIGN KEY (room_id) REFERENCES rooms(room_id);
--rollback ALTER TABLE "users_in_rooms" DROP CONSTRAINT fk_rooms

--changeset stefan:ddl:tickets:fk_rooms
ALTER TABLE tickets
ADD CONSTRAINT fk_rooms
FOREIGN KEY (room_id) REFERENCES rooms(room_id);
--rollback ALTER TABLE "tickets" DROP CONSTRAINT fk_rooms

--changeset stefan:ddl:votes:fk_users_in_rooms
ALTER TABLE votes
ADD CONSTRAINT fk_users_in_rooms
FOREIGN KEY (user_in_room_id) REFERENCES users_in_rooms(user_in_room_id);
--rollback ALTER TABLE "votes" DROP CONSTRAINT fk_users_in_rooms

--changeset stefan:ddl:votes:fk_tickets
ALTER TABLE votes
ADD CONSTRAINT fk_tickets
FOREIGN KEY (ticket_id) REFERENCES tickets(ticket_id);
--rollback ALTER TABLE "votes" DROP CONSTRAINT fk_tickets

--changeset stefan:ddl:votes:fk_vote_types
ALTER TABLE votes
ADD CONSTRAINT fk_vote_types
FOREIGN KEY (vote_type_id) REFERENCES vote_types(vote_type_id);
--rollback ALTER TABLE "votes" DROP CONSTRAINT fk_vote_types
