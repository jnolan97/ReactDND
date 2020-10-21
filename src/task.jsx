import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: white;
`;

export default class Task extends React.Component {
    render() {
        return( 
        <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided,snapshot) => (
        <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            {...snapshot.isDragging}
            {...snapshot.draggingOver}
            ref={provided.innerRef}
            // style={{backgroundColor: snapshot.isDraggingOver ? "lightgreen" : "white"}}
        >
            {this.props.task.content}
            
            </Container>

        )}
            </Draggable>
        );
    }
}