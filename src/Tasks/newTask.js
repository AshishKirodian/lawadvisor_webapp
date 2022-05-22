import { useState } from "react";
import { InputBox } from "./task";
export function NewTask(props) {
    const { addTask, prevOrder } = props;
    const [taskName, setTaskName] = useState('');

    const keyHandler = (e) => {
        if (e.key === 'Enter' && taskName.length > 0) {
            addTask(taskName, prevOrder + 1);
            setTaskName('');
        }
    };

    return (
        <div>
            <InputBox
                onKeyDown={keyHandler}
                style={{ marginLeft: '30px' }}
                placeholder="Add a task"
                value={taskName}
                type="text"
                onChange={(e) => setTaskName(e.currentTarget.value)}
                onBlur={(e) => {
                    if (taskName.length > 0) {
                        addTask(taskName, prevOrder);
                        setTaskName('');
                    }
                }
                } />
        </div>
    );
}