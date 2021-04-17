import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import Cookies from 'js-cookie'

import { FiEdit3, FiGithub, FiLinkedin, FiPlus, FiSave, FiTrash, FiX } from 'react-icons/fi'

import { Container, Header, Form, Content, SortMenu, TasksContainer, Task, Status, Footer } from '../styles/home'

interface TaskProps {
  id: string;
  task: string;
  isCompleted: boolean;
  createdAt: number;
  updatedAt: number;
}

export default function Home() {
  const [task, setTask] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [activeTask, setActiveTask] = useState<number>(0)
  const [idTaskToEdit, setIdTaskToEdit] = useState<string>('')
  const [sortedBy, setSortedBy] = useState<'all' | 'active' | 'completed'>('all')
  const [onEditionProcess, setOnEditionProcess] = useState<boolean>(false)
  const [taskList, setTaskList] = useState<TaskProps[]>(() => {
    const storagedList = Cookies.get('taskList');

    if (storagedList) {
      return JSON.parse(storagedList);
    }

    return [];
  })

  useEffect(() => {
    setActiveTask(0)

    Cookies.set('taskList', taskList)
    
    const activeTasks = taskList.filter(task => task.isCompleted === false)
    setActiveTask(activeTasks.length)
    return
  }, [taskList]);

  //add to-do
  function handleAddTask(event: FormEvent) {
    event.preventDefault()
    setError('')

    if (!task) {
      setError('You need to insert a task')
      return
    }

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
    setError('')
    setIdTaskToEdit(id)

    const selectedTask = taskList.filter(task => task.id === id)
    setTask(selectedTask[0].task)

    setOnEditionProcess(true)
  }

  function handleEditTask(id: string, event: FormEvent) {
    event.preventDefault()
    setError('')

    if (!task) {
      setError('You need to insert a task')
      return
    }

    const updatedTaskList = taskList.map(taskItem => {
      if (taskItem.id === id) {
        taskItem.task = task
        taskItem.updatedAt = Date.now()
        return taskItem
      }
      return taskItem
    })

    setTaskList([...updatedTaskList])

    handleFinishigEditionProcess()
  }

  function handleFinishigEditionProcess() {
    setTask('')
    setIdTaskToEdit('')
    setOnEditionProcess(false)
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
    <Container>
      <Header>
        <div/>
        <section>
          <h1>TO-DO-NEXT</h1>

          {onEditionProcess ? (
            <Form onSubmit={handleAddTask}>
              <input type="text" placeholder="Type you task here" value={task} onChange={(e) => setTask(e.target.value)} />
              <button type="submit" onClick={(e) => handleEditTask(idTaskToEdit, e)} className="edit">
                <FiSave />
              </button>
              <button type="button" onClick={handleFinishigEditionProcess} className="cancel">
                <FiX />
              </button>
              
            </Form>
          ) : (
            <Form onSubmit={handleAddTask}>
              <input type="text" placeholder="Type you task here" value={task} onChange={(e) => setTask(e.target.value)} />
              <button type="submit" className="add">
                <FiPlus />
              </button>
            </Form>
          )}

          {error && <p>{error}</p>}

        </section>
      </Header>

      <Content>
        <SortMenu>
          <div>
            <button className={ sortedBy === 'all' ? 'selected' : ''} type="button" onClick={() => setSortedBy('all')}>
              All
            </button>
            <button className={ sortedBy === 'active' ? 'selected' : ''} type="button" onClick={() => setSortedBy('active')}>
              Active
            </button>
            <button className={ sortedBy === 'completed' ? 'selected' : ''} type="button" onClick={() => setSortedBy('completed')}>
              Completed
            </button>
          </div>
          <button type="button" onClick={handleDeleteCompletedTask}>
            Delete all completed tasks
          </button>
        </SortMenu>
        
        <TasksContainer>
          {taskList.length === 0 && <p>Task list is empty...</p>}
        
          {taskList.map(task => {
            return (
              <Task 
                key={task.id} 
                style={
                  (sortedBy === 'active' && task.isCompleted === false) || 
                  (sortedBy === 'completed' && task.isCompleted === true) || 
                  (sortedBy === 'all') 
                  ? {display: "inherit"} 
                  : {display: "none"} }
              >
                <label>
                  <input 
                    type="checkbox" 
                    id="checkbox"
                    name="checkbox" 
                    onChange={() => handleSetCompletedTask(task.id)} 
                    checked={task.isCompleted ? true : false} 
                    disabled={onEditionProcess ? true : false} 
                  />
                  <span />
                </label>
                <p className={task.isCompleted ? "checked" : ""}  >{task.task}</p>
                <button
                  type="button"
                  className="edit"
                  onClick={() => handleStartEditionProcess(task.id)}
                  disabled={onEditionProcess ? true : false}
                >
                  <FiEdit3 />
                </button>
                <button
                  type="button"
                  className="delete"
                  onClick={() => handleDeleteTask(task.id)}
                  disabled={onEditionProcess ? true : false}
                >
                  <FiTrash />
                </button>
              </Task>
            )
          })}
        </TasksContainer>
      
        {taskList.length !== 0 && (
          <Status>
            <p>{activeTask > 0 ? activeTask : "No"} tasks left</p>

            <div>
              <div style={{width: `${((taskList.length - activeTask) / taskList.length) * 100}%`}} />
            </div>
          </Status>
        )}
      </Content>

      <Footer>
        <p>Developed by <strong>Maycon</strong></p>
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
      </Footer>
    </Container>
  )
}