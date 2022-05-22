import Board  from "./board";
import LastBoard from "./lastBoard";  
import styled from "styled-components";
// create a stylec container with horizontal scroll auromatic
export const BoardListContainer = styled.div`
    overflow: auto;
`;
export default function BoardList(props) {
    const { boards, addBoard, deleteBoard, searchTerm, reOrderBoards } = props;

    const boardComp = boards.map((board, i) => {
        return (
            <Board boards={boards} reOrderBoards={reOrderBoards} searchTerm={searchTerm} deleteBoard={deleteBoard} key={board.board_order} board={board} />
        );
    });
    boardComp.push(<LastBoard addBoard={addBoard} key={-1} />);
    return (
        <BoardListContainer>
            {boardComp}
        </BoardListContainer>
    );
}