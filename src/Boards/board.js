import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import HTTP from "../Utils/HTTP/http";
import { TaskList } from "../Tasks/taskList";
import { GET_ALL_TASKS } from "../Constants/apiConstants";
import { useDrag } from 'react-dnd'
import { ItemTypes } from "../Constants/dragConstants";
import { moveWithinBoard } from "../Utils/move";
// create a styled component BoardContainer
export const BoardContainer = styled.span`
    display: inline-block;
    width: auto;
    min-height: 90vh;
    background-color: #f5f5f5;
    border-radius: 5px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    margin: 0% 0.5% 0% 0.5%;
`;

// css icon for drag and drop
export const DragIcon = styled.span`
    display: inline-block;  
    width: 20px;
    height: 20px;
    border-radius: 5px;
    margin: 0% 0.5% 0% 0.5%;
    cursor: move;
`;
export default function Board(props) {
    const { board, deleteBoard, searchTerm, reOrderBoards, boards } = props;
    const { id, name } = board;
    const [isEditing, setIsEditing] = useState(false);
    const [tasks, setTasks] = useState([]);
    const taskRef = useRef();

    function reOrderWithinBoard(incomingTask, currentTask, tasks) {
        debugger;
        const newOrder = moveWithinBoard(incomingTask, currentTask, tasks);
        setTasks(newOrder.slice(0));
        HTTP.patch(`${GET_ALL_TASKS}/order`, newOrder);
    }

    const [, dragRef] = useDrag(() => ({
        type: ItemTypes.BOARD,
        item: { board },
        end(item, monitor) {
            const dropResult = monitor.getDropResult()
            console.log(dropResult.dropEffect, 'dropResult')
        }
    }))

    useEffect(() => {
        function searchForTask() {
            const filteredTasks = taskRef.current.filter(task => task.name.toLowerCase().includes(searchTerm.toLowerCase()));
            setTasks(filteredTasks);
        }
        if (searchTerm.length > 0) {
            searchForTask();
        } else if (taskRef.current) {
            setTasks(taskRef.current);
        }
    }, [searchTerm]);

    function getTasks(boardId) {
        const data = HTTP.get(`${GET_ALL_TASKS}/${boardId}`);
        data.then(response => {
            setTasks(response.data);
            taskRef.current = response.data;
        });
    }

    function addTask(taskName, prevOrder) {
        const data = HTTP.post(`${GET_ALL_TASKS}`, { name: taskName, boardId: id, prevOrder });
        data.then(() => {
            getTasks(id);
        });
    }

    function updateTaskName(taskName, taskId) {
        const data = HTTP.put(`${GET_ALL_TASKS}/name`, { name: taskName, id: taskId });
        data.then(() => {
            getTasks(id);
        });
    }

    function updateTaskStatus(taskId, taskStatus) {
        const data = HTTP.put(`${GET_ALL_TASKS}/status`, { id: taskId, is_complete: taskStatus });
        data.then(() => {
            getTasks(id);
        });
    }

    function deleteTask(taskId) {
        //TODO: show warning before deleting
        const data = HTTP.delete(`${GET_ALL_TASKS}/${taskId}`);
        data.then(() => {
            getTasks(id);
        });
    }

    useEffect(() => {
        getTasks(id);
    }, [id]);

    let actions = <div onClick={() => setIsEditing(true)}>Edit</div>;
    if (isEditing) {
        actions = (<div>
            <div>
                <button onClick={() => deleteBoard(id)}>Delete</button>
            </div>
            <div>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
        </div>);
    }
    return (
        <BoardContainer key={id} id={`board-${id}`} ref={dragRef}>
            <DragIcon className="fa-solid fa-ellipsis-vertical" />
            <span>
                {name}
            </span>
            <span>
                {actions}
            </span>
            <hr />
            <div>
                <TaskList reOrderWithinBoard={reOrderWithinBoard} boards={boards} reOrderBoards={reOrderBoards} board={board} deleteTask={deleteTask} updateTaskStatus={updateTaskStatus} updateTaskName={updateTaskName} addTask={addTask} tasks={tasks} />
            </div>
        </BoardContainer>
    );
}

