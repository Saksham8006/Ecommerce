import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import ChartTwo from '../../components/Charts/ChartTwo';

import DefaultLayout from '../../layout/DefaultLayout';

const ECommerce: React.FC = () => {
  const [cards, setCards] = useState([
    { id: 'views', title: 'Total views', total: '$3.456K', rate: '0.43%', levelUp: true },
    { id: 'profit', title: 'Total Profit', total: '$45,2K', rate: '4.35%', levelUp: true },
    { id: 'product', title: 'Total Product', total: '2.450', rate: '2.59%', levelUp: true },
    { id: 'users', title: 'Total Users', total: '3.456', rate: '0.95%', levelDown: true }
  ]);

  const onDragEnd = (result: any) => {
    // Logic to handle drag and drop
    if (!result.destination) return; // dropped outside the list

    const items = Array.from(cards);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCards(items);
  };

  return (
    <DefaultLayout>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-area">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 px-[24px] py-[22px]"
            >
              {cards.map((card, index) => (

                <Draggable key={card.id} draggableId={card.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <CardDataStats
                        title={card.title}
                        total={card.total}
                        rate={card.rate}
                        levelUp={card.levelUp}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5 px-[24px] py-[20px]">
        <ChartOne />
        <ChartTwo />

      </div>
    </DefaultLayout>
  );
};

export default ECommerce;
