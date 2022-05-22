import styled from "styled-components";
import { useState, useEffect } from "react";
import { DragIcon } from "../Boards/board";
// css like input box
import { ItemTypes } from "../Constants/dragConstants";
import { useDrag, useDrop } from 'react-dnd';

export const InputBox = styled.input`
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    margin: 5px;
    height: 30px;
    font-size: 14px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 400;
    line-height: 1.42857143;
    color: #555;
    border: 1px solid #ccc;
    background-color: ${props => props.isComplete ? 'grey' : 'fff'};
    border-radius: 4px;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    &:focus {
        border-color: #66afe9;
        outline: 0;
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
    }
`;
// css styled checkbox round
export const Checkbox = styled.input`
   width: 1.3em;
    height: 1.3em;
    background-color: white;
    border-radius: 50%;
    vertical-align: middle;
    border: 1px solid #ddd;
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    cursor: pointer;
    &:focus {
        border-color: #66afe9;
        outline: 0;
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
    }
    &:checked {
        background-color: #66afe9;
        border-color: #66afe9;
    }
`;

// delete icon
export const DeleteIcon = styled.span`
    color: #ccc;
    font-size: 1.5em;
    cursor: pointer;
    margin: 0 0.3em 0 0;
    &:hover {
        color: #f00;
    }
`;

export function Task(props) {
    const { task, updateTaskName, updateTaskStatus, deleteTask, reOrderWithinBoard, tasks, board } = props;
    const { id, name, is_complete } = task;
    const [taskName, setTaskName] = useState(name);

    useEffect(() => {
        setTaskName(name);
    }, [name]);

    const [, dragRef] = useDrag(() => ({
        type: ItemTypes.TASK_IND,
        item: { task, board },
    }));

    const [, dropRef] = useDrop({
        accept: ItemTypes.TASK_IND,
        drop: (item) => {
            if (item.board.id === board.id) {
                reOrderWithinBoard(item.task, task, tasks);
            }
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    },  [task, board, tasks]);

    return (
        <div key={id} ref={dragRef}>
            <DragIcon className="fa-solid fa-ellipsis-vertical"/>
            <Checkbox checked={is_complete} type="checkbox" onChange={() => updateTaskStatus(id, !is_complete)} />
            <InputBox ref={dropRef} disabled={is_complete} isComplete={is_complete} value={taskName} onChange={(e) => setTaskName(e.currentTarget.value)} onBlur={() => updateTaskName(taskName, id)} />
            <DeleteIcon onClick={() => deleteTask(id)} className="fa-solid fa-trash" style={{ fontSize: '10px' }} />
        </div>
    );
}