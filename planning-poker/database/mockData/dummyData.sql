-- Insert dummy data into the users table
INSERT INTO users (upn) VALUES
('user1@example.com'),
('user2@example.com'),
('user3@example.com'),
('user4@example.com');

-- Insert dummy data into the rooms table
INSERT INTO rooms (room_name, owner_id, closed) VALUES
('Room A', 1, FALSE),
('Room B', 2, FALSE),
('Room C', 3, FALSE),
('Room D', 4, FALSE);

-- Insert dummy data into the users_in_rooms table
INSERT INTO users_in_rooms (user_id, room_id) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 3),
(1, 4),
(2, 4),
(3, 4),
(2, 2),
(3, 3),
(4, 4);

-- Insert dummy data into the tickets table
INSERT INTO tickets (ticket_name, room_id) VALUES
('Ticket 1', 1),
('Ticket 2', 1),
('Ticket 3', 2),
('Ticket 4', 3),
('Ticket 5', 4);

-- Insert dummy data into the vote_types table
INSERT INTO vote_types (vote) VALUES
('1'),
('2'),
('3'),
('5'),
('8'),
('13'),
('??'),
('☕');

-- Insert dummy data into the votes table
INSERT INTO votes (user_in_room_id, vote_type_id, ticket_id) VALUES
(1, 3, 1),
(2, 3, 1),
(3, 4, 3),
(4, 2, 4),
(5, 8, 5),
(6, 4, 5),
(7, 8, 5);
