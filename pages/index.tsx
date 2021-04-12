import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'
import {v4 as uuidv4} from 'uuid'

import { FiEdit3, FiGithub, FiLinkedin, FiPlus, FiSave, FiTrash, FiX } from 'react-icons/fi'

interface TaskProps {
  id: string;
  task: string;
  isCompleted: boolean;
  createdAt: number;
  updatedAt: number;
}
export default function Home() {
  const [task, setTask] = useState<string>('')
  const [activeTask, setActiveTask] = useState<number>(0)
  const [idTaskToEdit, setIdTaskToEdit] = useState<string>('')
  const [sortedBy, setSortedBy] = useState<'all' | 'active' | 'completed'>('all')
  const [onEditionProcess, setOneEditionProcess] = useState<boolean>(false)
  const [taskList, setTaskList] = useState<TaskProps[]>([])

  useEffect(() => {
    const activeTasks = taskList.filter(task => task.isCompleted === false)
    setActiveTask(activeTasks.length)
    return
  }, [taskList]);


  //add to-do
  function handleAddTask(event: FormEvent) {
    event.preventDefault()

    setTaskList([...taskList, {
      id: uuidv4(),
      task: task,
      isCompleted: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }])

    setTask('')
  }

  //delete to-do
  function handleDeleteTask(id: string) {
    const newTaskList = taskList.filter(task => task.id !== id)

    setTaskList([...newTaskList])
  }

  //delete all completed to-do
  function handleDeleteCompletedTask() {
    const newTaskList = taskList.filter(task => task.isCompleted !== true)

    setTaskList([...newTaskList])
  }

  //edit to-do
  function handleStartEditionProcess(id: string) {
    setIdTaskToEdit(id)

    const selectedTask = taskList.filter(task => task.id === id)
    setTask(selectedTask[0].task)

    setOneEditionProcess(true)
  }

  function handleEditTask(id: string, event: FormEvent) {
    event.preventDefault()

    const updatedTaskList = taskList.map(taskItem => {
      if (taskItem.id === id) {
        taskItem.task = task
        return taskItem
      }
      return taskItem
    })

    console.log([...updatedTaskList])

    handleFinishigEditionProcess()
  }

  function handleFinishigEditionProcess() {
    setTask('')
    setIdTaskToEdit('')
    setOneEditionProcess(false)
  }

  //set completed to-do
  function handleSetCompletedTask(id: string) {
    const setCompletedTaskList = taskList.map(task => {
      if(task.id === id) {
        task.isCompleted = !task.isCompleted
        return task
      }
      return task
    })

    setTaskList([...setCompletedTaskList])
  }

  return (
    <>
      <header>
        <div />
        <section>
          <h1>TO-DO-NEXT</h1>

          {onEditionProcess ? (
            <form onSubmit={handleAddTask}>
              <input type="text" placeholder="Type you task here" value={task} onChange={(e) => setTask(e.target.value)} />
              <button type="submit" onClick={(e) => handleEditTask(idTaskToEdit, e)}>
                <FiSave />
              </button>
              <button type="button" onClick={handleFinishigEditionProcess}>
                <FiX />
              </button>
              
            </form>
          ) : (
            <form onSubmit={handleAddTask}>
              <input type="text" placeholder="Type you task here" value={task} onChange={(e) => setTask(e.target.value)} />
              <button type="submit">
                <FiPlus />
              </button>
            </form>
          )}

        </section>
      </header>

      <main>
        <div>
          <button type="button" onClick={() => setSortedBy('all')}>
            All
          </button>
          <button type="button" onClick={() => setSortedBy('active')}>
            Active
          </button>
          <button type="button" onClick={() => setSortedBy('completed')}>
            Completed
          </button>
          <button type="button" onClick={handleDeleteCompletedTask}>
            Delete all completed tasks
          </button>
        </div>

        <div>
          {taskList.map(task => {
            return (
              <div 
                key={task.id} 
                style={
                  (sortedBy === 'active' && task.isCompleted === false) || 
                  (sortedBy === 'completed' && task.isCompleted === true) || 
                  (sortedBy === 'all') 
                  ? {display: "block"} 
                  : {display: "none"} }
              >
                <input 
                  type="checkbox" 
                  name="completed" 
                  onChange={() => handleSetCompletedTask(task.id)} 
                  checked={task.isCompleted ? true : false} 
                  disabled={onEditionProcess ? true : false} 
                />
                <p>{task.task}</p>
                <button
                  type="button"
                  onClick={() => handleStartEditionProcess(task.id)}
                  disabled={onEditionProcess ? true : false}
                >
                  <FiEdit3 />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteTask(task.id)}
                  disabled={onEditionProcess ? true : false}
                >
                  <FiTrash />
                </button>
              </div>
            )
          })}
        </div>
      
        {taskList.length !== 0 && (
          <div>
            <p>{activeTask > 0 ? activeTask : "No"} tasks left</p>
            <div style={{width: '100%', height: '12px', background: '#646464'}}>
              <div style={{width: `${((taskList.length - activeTask) / taskList.length) * 100}%`, height: '8px', background: 'green'}}/>
            </div>
          </div>
        )}
      </main>

      <footer>
        Developed by Maycon
        <div>
          <Link href="https://github.com/mayconrr13">
            <a>
              <FiGithub />
            </a>
          </Link>
          <Link href="https://www.linkedin.com/in/mayconreisrosario/">
            <a>
              <FiLinkedin />
            </a>
          </Link>
        </div>
      </footer>
    </>
  )
}
