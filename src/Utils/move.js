export function decidePosition(incomingBoard, currentBoard, allBoards) {
    // if the baords are next to each other just swap the board_order in allBoards array
    if (incomingBoard.board_order - currentBoard.board_order === 1 || incomingBoard.board_order - currentBoard.board_order === -1) {
        const currentBoardIndex = allBoards.findIndex(board => board.id === currentBoard.id);
        const incomingBoardIndex = allBoards.findIndex(board => board.id === incomingBoard.id);
        // swap the board_order in allBoards array
        const temp = allBoards[currentBoardIndex];
        allBoards[currentBoardIndex] = allBoards[incomingBoardIndex];
        allBoards[incomingBoardIndex] = temp;
        console.log(allBoards, 'allBoards');
        return allBoards;
    } else {
        // splice the incoming board from the allBoards array and push it next to the current board
        const currentBoardIndex = allBoards.findIndex(board => board.id === currentBoard.id);
        const incomingBoardIndex = allBoards.findIndex(board => board.id === incomingBoard.id);
        allBoards.splice(incomingBoardIndex, 1);
        allBoards.splice(currentBoardIndex + 1, 0, incomingBoard);
        for (let i = 0; i < allBoards.length; i++) {
            allBoards[i].board_order = i + 1;
        }
        return allBoards;
    }
}

export function moveWithinBoard(incomingTask, currentTask, tasks) {
    if (incomingTask.task_order - currentTask.task_order === 1 || incomingTask.task_order - currentTask.task_order === -1) {
        const currentTaskIndex = tasks.findIndex(task => task.id === currentTask.id);
        const incomingTaskIndex = tasks.findIndex(task => task.id === incomingTask.id);
        // swap the task_order in tasks array
        const temp = tasks[currentTaskIndex];
        tasks[currentTaskIndex] = tasks[incomingTaskIndex];
        tasks[incomingTaskIndex] = temp;
        console.log(tasks, 'tasks');
        return tasks;
    } else {
        // splice the incoming task from the tasks array and push it next to the current task
        const currentTaskIndex = tasks.findIndex(task => task.id === currentTask.id);
        const incomingTaskIndex = tasks.findIndex(task => task.id === incomingTask.id);
        tasks.splice(incomingTaskIndex, 1);
        tasks.splice(currentTaskIndex + 1, 0, incomingTask);
        for (let i = 0; i < tasks.length; i++) {
            tasks[i].task_order = i + 1;
        }
        return tasks;
    }
}
