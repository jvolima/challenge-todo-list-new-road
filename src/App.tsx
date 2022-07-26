import { Header } from "./components/Header";
import "./global.css";

import clipboardSvg from "./assets/clipboard.svg";

import styles from "./App.module.css";
import { PlusCircle } from "phosphor-react";
import { ChangeEvent, FormEvent, InvalidEvent, useEffect, useState } from "react";
import { Task } from "./components/Task";

interface Task {
  id: string;
  text: string;
  isFinished: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [finishedTasks, setFinishedTasks] = useState(0);

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const task = {
      id: new Date().getTime().toString(),
      text: newTask,
      isFinished: false
    };

    setTasks(state => [...state, task]);
    setNewTask('');
    changeNumberOfFinishedTasks(tasks);
  }

  function handleDeleteTask(id: string) {
    const tasksWithoutDeletedOne = tasks.filter(task => task.id !== id);
    setTasks(tasksWithoutDeletedOne);
    changeNumberOfFinishedTasks(tasksWithoutDeletedOne);
  }
  
  function handleChangeFinishState(id: string) {
    const task = tasks.find(task => task.id === id) as Task;
    const taskIndex = tasks.indexOf(task);

    const updatedTasks = tasks;
    updatedTasks[taskIndex].isFinished = task.isFinished === true ? false : true;

    setTasks(updatedTasks);
    changeNumberOfFinishedTasks(updatedTasks);
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewTask(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!');
  }

  function formatFinishedTasks() {
    return `${finishedTasks} de ${tasks.length}`;
  }

  function changeNumberOfFinishedTasks(mostRecentTasks: Task[]) {
    const finishedTasks = mostRecentTasks.filter(task => task.isFinished === true);
    setFinishedTasks(finishedTasks.length);
  }

  return (
    <>
      <Header />
      
      <div className={styles.container}>
        <form onSubmit={handleCreateNewTask}>
          <input 
            type="text" 
            placeholder="Adicione uma nova tarefa" 
            value={newTask}
            onChange={handleNewTaskChange}
            onInvalid={handleNewTaskInvalid}
            required
          />
          <button type="submit" disabled={newTask.length === 0}>
            <span>Criar</span>
            <PlusCircle size={20} />
          </button>
        </form>
        
        <div className={styles.tasksInfos}>
          <div className={styles.createdTasks}>
            <h2>Tarefas criadas</h2>
            <div className={styles.quantityCircle}>{tasks.length}</div>
          </div>

          <div className={styles.finishedTasks}>
            <h2>Concluídas</h2>
            <div className={styles.quantityCircle}>
              {
                tasks.length === 0 ? 0
                : formatFinishedTasks()
              }
            </div>
          </div>
        </div>

        {
          tasks.length > 0 ?
            <div className={styles.taskList}>
              {
                tasks.map(task => (
                  <Task 
                    key={task.id}
                    id={task.id}
                    text={task.text} 
                    isFinished={task.isFinished} 
                    onDeleteTask={() => handleDeleteTask(task.id)}
                    onChangeFinishState={() => handleChangeFinishState(task.id)}
                  />
                ))
              }
            </div>
          : 
            <div className={styles.emptyList}>
              <img src={clipboardSvg} alt="Imagem de uma prancheta" />
              <h3>Você ainda não tem tarefas cadastradas</h3>
              <h4>Crie tarefas e organize seus itens a fazer</h4>
            </div>
        }
      </div>
    </>   
  )
}

