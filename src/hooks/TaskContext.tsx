// import { createContext, FormEvent, ReactNode, useContext, useEffect, useState } from "react";


// interface TaskProps {
//   id: string;
//   task: string;
//   isCompleted: boolean;
//   createdAt: number;
//   updatedAt: number;
// }

// // tipagem do VALUE
// interface TaskContextProps {
//   task: string,
//   setTask: (task: string) => void,
//   activeTask: number, 
//   setActiveTask: (activeTask: number) => void,
//   idTaskToEdit: string, 
//   setIdTaskToEdit: (id: string) => void,
//   sortedBy: 'all' | 'active' | 'completed', 
//   setSortedBy: (sort: 'all' | 'active' | 'completed') => void,
//   onEditionProcess: boolean, 
//   setOneEditionProcess: (onEdition: boolean) => void,
//   taskList: TaskProps[], 
//   setTaskList: (task: TaskProps) => void;
// }

// const TaskContext = createContext<TaskContextProps>({} as TaskContextProps)

// export function TaskProvider(children: ReactNode) {
//   const [task, setTask] = useState('')
//   const [activeTask, setActiveTask] = useState(0)
//   const [idTaskToEdit, setIdTaskToEdit] = useState('')
//   const [sortedBy, setSortedBy] = useState('all')
//   const [onEditionProcess, setOneEditionProcess] = useState(false)
//   const [taskList, setTaskList] = useState<TaskProps[]>([])

//   useEffect(() => {
//     const activeTasks = taskList.filter(task => task.isCompleted === false)
//     setActiveTask(activeTasks.length)
//     return
//   }, [taskList]);


//   //add to-do
//   function handleAddTask(event: FormEvent) {
//     event.preventDefault()

//     setTaskList([...taskList, {
//       id: String(uuidv4()),
//       task: task,
//       isCompleted: false,
//       createdAt: Date.now(),
//       updatedAt: Date.now(),
//     }])

//     setTask('')
//   }

//   //delete to-do
//   function handleDeleteTask(id: string) {
//     const newTaskList = taskList.filter(task => task.id !== id)

//     setTaskList([...newTaskList])
//   }

//   //delete all completed to-do
//   function handleDeleteCompletedTask() {
//     const newTaskList = taskList.filter(task => task.isCompleted !== true)

//     setTaskList([...newTaskList])
//   }

//   //edit to-do
//   function handleStartEditionProcess(id: string) {
//     setIdTaskToEdit(id)

//     const selectedTask = taskList.filter(task => task.id === id)
//     setTask(selectedTask[0].task)

//     setOneEditionProcess(true)
//   }

//   function handleEditTask(id: string, event: FormEvent) {
//     event.preventDefault()

//     const updatedTaskList = taskList.map(taskItem => {
//       if (taskItem.id === id) {
//         taskItem.task = task
//         return taskItem
//       }
//       return taskItem
//     })

//     console.log([...updatedTaskList])

//     handleFinishigEditionProcess()
//   }

//   function handleFinishigEditionProcess() {
//     setTask('')
//     setIdTaskToEdit('')
//     setOneEditionProcess(false)
//   }

//   //set completed to-do
//   function handleSetCompletedTask(id: string) {
//     const setCompletedTaskList = taskList.map(task => {
//       if(task.id === id) {
//         task.isCompleted = !task.isCompleted
//         return task
//       }
//       return task
//     })

//     setTaskList([...setCompletedTaskList])
//   }

//   return (
//     <TaskContext.Provider 
//       value={{
//         task,
//         setTask,
//         activeTask, 
//         setActiveTask,
//         idTaskToEdit, 
//         setIdTaskToEdit,
//         sortedBy, 
//         setSortedBy,
//         onEditionProcess, 
//         setOneEditionProcess,
//         taskList, 
//         setTaskList
//       }}
//     >
//       { children }
//     </TaskContext.Provider>
//   )
// }

// export const useTask = () => useContext(TaskContext)

// function uuidv4() {
//   throw new Error("Function not implemented.");
// }
