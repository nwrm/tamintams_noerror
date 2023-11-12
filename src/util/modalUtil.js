// timeUtil
export const getTime = () => {
    return new Date().getTime();
  };
  
  export const TimeCalc = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  
  
  
  //roomUtill
  export const setRoomState = (prevItems, roomname, updatedRoomTimes) => {
      return prevItems.map((room) =>
        room.name === roomname
          ? { ...room, selectTimes: updatedRoomTimes }
          : room
      );
    };
  
    