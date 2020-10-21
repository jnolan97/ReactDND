import React from 'react';
import styled from 'styled-components';
import Task from './task';
import { Droppable } from 'react-beautiful-dnd';
import './index.css'

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    width: 33%;
    display: flex;
    flex-direction: column;
`;
const Title = styled.h3`
    padding: 8px;
    transition: 0.5s all ease-out;
    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 17px rgba(0, 0, 0, 0.35);
    }
`;
const TaskList = styled.div`
    padding: 8px;
    flex-grow: 1;
    min-height: 200px;

    
`;

export default class Column extends React.Component {
    render() {
        return (
            <Container>
                <Title>
                    {this.props.column.title}
                </Title>
                <Droppable droppableId={this.props.column.id}>
                {(provided,snapshot) => (

               
                <TaskList 
                {...provided.droppableProps}
                {...snapshot.isDraggingOver}
                ref={provided.innerRef}
                style={{backgroundColor: snapshot.isDraggingOver ? 'lightgreen': 'white'}}
                >
                    <div className='tasks'>
                    {this.props.tasks.map((task,index) => <Task key={task.id} task={task} index={index} />)}
                    {provided.placeholder}
                    </div>
                </TaskList>
                
                 )}
                </Droppable>
            </Container>
        );
    }
}