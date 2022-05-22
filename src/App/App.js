import { useEffect, useState } from 'react';
import HTTP from "../Utils/HTTP/http";
import { GET_ALL_BOARDS, ADD_BOARD, DELETE_BOARD } from "../Constants/apiConstants";
import BoardList from '../Boards/boardsList';
import { NavBar } from '../NavBar/navBar';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { decidePosition, moveInDifferentBoards } from '../Utils/move';

function App() {
  const [boards, setBoards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  function getAllBoards() {
    const data = HTTP.get(GET_ALL_BOARDS);
    data.then(response => {
      setBoards(response.data);
    }
    );
  }

  useEffect(() => {
    getAllBoards();
  }, []);

  function addBoard(boardName) {
    const data = HTTP.post(ADD_BOARD, { name: boardName });
    data.then(() => {
      getAllBoards();
    });
  }

  function deleteBoard(id) {
    //TODO: Throw a warning if the board has tasks in it and then confirm the action.
    const data = HTTP.delete(`${DELETE_BOARD}/${id}`);
    data.then(() => {
      getAllBoards();
    });
  }

  function updateBoardOrder(boards) {
    HTTP.patch(`${GET_ALL_BOARDS}/order`, boards);
  }

  function reOrderBoards(newBoard, currentBoard, oldBoards) {
    const newBoards = decidePosition(newBoard, currentBoard, oldBoards);
    setBoards(newBoards.slice(0));
    // async http call to update the order of the boards
    updateBoardOrder(newBoards);
  }

  return (
    <div>
      <NavBar search={(st) => setSearchTerm(st)} />
      <DndProvider backend={HTML5Backend}>
        <BoardList reOrderBoards={reOrderBoards} searchTerm={searchTerm} deleteBoard={deleteBoard} addBoard={addBoard} boards={boards} />
      </DndProvider >
    </div >
  );
}

export default App;
