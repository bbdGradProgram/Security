class Ticket {
    constructor(ticketId, ticketName, roomId, revealed) {
      this.ticketId = ticketId;
      this.ticketName = ticketName;
      this.roomId = roomId;
      this.revealed = revealed
    }
  }
  
  module.exports = Ticket;
  