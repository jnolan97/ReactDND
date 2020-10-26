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

export default function Task(props) {
        return( 
        <Draggable draggableId={props.task.id} index={props.index}>
        {(provided,snapshot) => (
        <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            {...snapshot.isDragging}
            {...snapshot.draggingOver}
            ref={provided.innerRef}
            // style={{backgroundColor: snapshot.isDraggingOver ? "lightgreen" : "white"}}
        >
            {props.task.content}
            
            </Container>

        )}
            </Draggable>
        );
    }