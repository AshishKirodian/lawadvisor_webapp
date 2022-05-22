import { Task } from "./task";
import { NewTask } from "./newTask";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../Constants/dragConstants";

export function TaskList(props) {
    const { tasks, addTask, updateTaskName, updateTaskStatus, deleteTask, board, reOrderBoards, boards, reOrderWithinBoard } = props;

    function intermediate(item, board, boards) {
        reOrderBoards(item.board, board, boards)
    }
    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.BOARD,
            drop: (item) => { intermediate(item, board, boards) },
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
            })
        }),
        [boards]
    );

    const taskComp = tasks.map((task) => {
        return <Task board={board} tasks={tasks} reOrderWithinBoard={reOrderWithinBoard} deleteTask={deleteTask} updateTaskStatus={updateTaskStatus} updateTaskName={updateTaskName} key={task.task_order} task={task} />
    });
    const prevOrder = tasks.length > 0 ? tasks[tasks.length - 1].task_order : -1;
    taskComp.push(<NewTask key={-1} prevOrder={prevOrder} addTask={addTask} />);
    return (
        <div ref={drop}>
            {taskComp}
        </div>
    );
}