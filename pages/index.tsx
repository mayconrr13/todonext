import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'
import {v4 as uuidv4} from 'uuid'

import { FiGithub, FiLinkedin, FiPlus, FiTrash } from 'react-icons/fi'

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
  const [sortedBy, setSortedBy] = useState<'all' | 'active' | 'completed'>('all')
  const [taskList, setTaskList] = useState<TaskProps[]>([])

  useEffect(() => {
    const activeTasks = taskList.filter(task => task.isCompleted === false)
    setActiveTask(activeTasks.length)
    console.log(activeTask)
    return
  }, [taskList]);

  console.log(taskList)


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
  function handleEditTask() {
    console.log('task edited')
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
          <form onSubmit={handleAddTask}>
            <input type="text" placeholder="Type you task here" value={task} onChange={(e) => setTask(e.target.value)} />
            <button type="submit">
              <FiPlus />
            </button>
          </form>
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
            switch(sortedBy) {
              case 'all':
                return (
                  <div key={task.id}>
                    {task.isCompleted ? (
                      <input type="checkbox" name="completed" onChange={() => handleSetCompletedTask(task.id)} checked/>
                    ) : (
                      <input type="checkbox" name="completed" onChange={() => handleSetCompletedTask(task.id)} />
                    )}
                    <p>{task.task}</p>
                    <button
                      type="button"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <FiTrash />
                    </button>
                  </div>
                )

              case 'active':
                if (task.isCompleted === false) {
                  return (
                    <div key={task.id}>
                      {task.isCompleted ? (
                        <input type="checkbox" name="completed" onChange={() => handleSetCompletedTask(task.id)} checked/>
                      ) : (
                        <input type="checkbox" name="completed" onChange={() => handleSetCompletedTask(task.id)} />
                      )}
                      <p>{task.task}</p>
                      <button
                        type="button"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <FiTrash />
                      </button>
                    </div>
                  )
                }
                break

              case 'completed':
                if (task.isCompleted === true) {
                  return (
                    <div key={task.id}>
                      {task.isCompleted ? (
                        <input type="checkbox" name="completed" onChange={() => handleSetCompletedTask(task.id)} checked/>
                      ) : (
                        <input type="checkbox" name="completed" onChange={() => handleSetCompletedTask(task.id)} />
                      )}
                      <p>{task.task}</p>
                      <button
                        type="button"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <FiTrash />
                      </button>
                    </div>
                  )
                }
                break
            }
          })}
        </div>
      
        <div>
          <p>{activeTask > 0 ? activeTask : "No"} tasks left</p>
          <div style={{width: '100%', height: '12px', background: '#646464'}}>
            <div style={{width: `${((taskList.length - activeTask) / taskList.length) * 100}%`, height: '8px', background: 'green'}}/>
          </div>
        </div>
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
