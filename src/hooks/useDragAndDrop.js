import { useDrag, useDrop } from "react-dnd";

export const useDragAndDrop = (id, index, moveWidget) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "widget",
        item: { id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const [, drop] = useDrop({
        accept: "widget",
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                moveWidget(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });

    return { drag, drop, isDragging };
};
