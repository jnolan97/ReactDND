import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';
import styled from 'styled-components';
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

const Container = styled.div`
  display: flex;
`;

class App extends React.Component {
  state = initialData;
  
  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId &&
        destination.index === source.index) {
          return;
        }
    const start = this.state.columns[source.droppableId];
    console.log('start',start)
    const end = this.state.columns[destination.droppableId];

    console.log(end)
    if (start !== end){
      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1)
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };
      const finishTaskIds = Array.from(end.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newEnd = {
        ...end,
        taskIds: finishTaskIds,
      };
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newStart.id]: newStart,
          [newEnd.id]: newEnd
        },
      };
     this.setState(newState);
      // const column = this.state.columns[source.droppableId];
      // const destcol = this.state.columns[destination.droppableId];
      // const newTask = Array.from(column.taskIds);
      // const newStartList = start.taskIds.splice(source.index,1)
      // const newStartCol = {
      //   ...column,
      //   taskIds: newStartList,
      // };
      // const newEndList = end.taskIds
      // newEndList.splice(destination.index, 0, start.taskIds[source.index])
      
      // const newEndCol = {
      //   ...end,
      //   taskIds: newEndList,
      // };

     return;
    } else {
    const column = this.state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index,1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn,
      },
    };

    this.setState(newState);
  }
  };

  render() {
    return (
      <Container>
    <DragDropContext onDragEnd={this.onDragEnd}>
    {this.state.columnOrder.map((columnId) => {
      const column = this.state.columns[columnId];
      const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])
      return <Column key={column.id} column={column} tasks={tasks} />
    })}
    </DragDropContext>
    </Container>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));

export default App;
