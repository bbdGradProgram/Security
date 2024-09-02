class Vote {
    constructor(voteId, userInRoomId, voteTypeId, ticketId) {
      this.voteId = voteId;
      this.userInRoomId = userInRoomId;
      this.voteTypeId = voteTypeId;
      this.ticketId = ticketId;
    }
  }
  
  module.exports = Vote;
  