import { CheckCircle, Circle, Trash } from "phosphor-react";
import { useState } from "react";
import styles from "./Task.module.css";

interface TaskProps {
  id: string;
  text: string;
  isFinished: boolean;
  onDeleteTask: (id: string) => void;
  onChangeFinishState: (id: string) => void;
}

export function Task({ id, text, isFinished, onDeleteTask, onChangeFinishState }: TaskProps) {  
  const [finished, setFinished] = useState(isFinished);

  function handleDeleteTask() {
    onDeleteTask(id);
  }

  function handleChangeFinishState() {
    onChangeFinishState(id);
    setFinished(finished === true ? false : true);
  }

  return (
    <div className={styles.task}>
      {
        finished ? 
        <button className={styles.finishButton} onClick={handleChangeFinishState}>
          <CheckCircle size={18} weight="fill" />
        </button>
        : 
        <button className={styles.notFinishButton} onClick={handleChangeFinishState}>
          <Circle size={18} weight="bold" />
        </button>
      }
        
      <div className={styles.textAndTrash}>
        <p className={finished ? styles.taskFinished : ""}>{text}</p>
        <button className={styles.trashButton} onClick={handleDeleteTask}>
          <Trash size={18} />
        </button>
      </div>
    </div>
  ) 
}