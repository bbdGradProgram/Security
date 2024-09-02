class Room {
  constructor(roomId, roomUuid, roomName, ownerId, closed, upn, currentTicketId) {
    this.roomId = roomId;
    this.roomUuid = roomUuid;
    this.roomName = roomName;
    this.ownerId = ownerId;
    this.closed = closed;
    this.upn = upn;
    this.currentTicketId = currentTicketId;
  }
}

module.exports = Room;
