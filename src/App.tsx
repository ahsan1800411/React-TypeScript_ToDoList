import { ChangeEvent, FC, useEffect, useState } from "react";
import "./App.css";
import TodoTask from "./Components/TodoTask";
import { ITask } from "./Interfaces";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDeadline(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    const newTask = { taskName: task, deadline };
    setTodoList([...todoList, newTask]);
    localStorage.setItem("todo", JSON.stringify(todoList));
    setTask("");
    setDeadline(0);
  };

  const deleteTask = (taskNameToDelete: string): void => {
    setTodoList(todoList.filter((task) => task.taskName !== taskNameToDelete));
  };

  useEffect(() => {
    localStorage.getItem("todo");
  });

  return (
    <div className='App'>
      <div className='header'>
        <div className='inputContainer'>
          <input
            type='text'
            placeholder='Task...'
            name='task'
            value={task}
            onChange={handleChange}
          />
          <input
            type='number'
            value={deadline}
            placeholder='Deadline(in Days)...'
            onChange={handleChange}
            name='deadline'
          />
          <button onClick={addTask}>Add Task</button>
        </div>
      </div>
      <div className='todoList'>
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} deleteTask={deleteTask} />;
        })}
      </div>
    </div>
  );
};

export default App;
