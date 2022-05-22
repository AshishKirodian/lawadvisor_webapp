import { useEffect, useState } from "react";
import { BoardContainer } from "./board";
export default function LastBoard(props) {
    const { addBoard } = props;
    const [boardName, setBoardName] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const keyHandler = (e) => {
        if (e.key === 'Enter' && boardName.length > 0) {
            addBoard(boardName);
            setBoardName('');
            setIsEditing(false);
        }
    };
    if (isEditing) {
        return (
            <BoardContainer>
                <input onKeyDown={keyHandler} type="text" value={boardName} onChange={(e) => setBoardName(e.target.value)} />
                <button onClick={() => {
                    if (boardName.length > 0) {
                        addBoard(boardName);
                        setIsEditing(false);
                        setBoardName('');
                    }
                }}>Add</button>
            </BoardContainer>
        );
    } else {
        return (
            <BoardContainer>
                Click to add a new board
                <button onClick={() => setIsEditing(true)}>Add</button>
            </BoardContainer>
        );
    }
}

