import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';
const initialItems = [
  { id: 'item-1', content: 'Macbook M1 Pro' },
  { id: 'item-2', content: 'iMac Pro' },
  { id: 'item-3', content: 'Mac Pro' },
];

const DragAndDropList = () => {
  const [items, setItems] = useState(initialItems);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const { source, destination } = result;
    const newItems = Array.from(items);
    const [movedItem] = newItems.splice(source.index, 1);
    newItems.splice(destination.index, 0, movedItem);

    setItems(newItems);
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable-list">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <li
                      className={snapshot.isDragging ? 'dragging' : ''}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {item.content}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DragAndDropList;