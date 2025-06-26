'use client';

import React, { Fragment, ReactElement, useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import PlusAddButton from './PlusAddButton';
import SortableNavigationItem from './SortableNavigationItem';
import SettingsMenu from './SettingsMenu';
import PlusIcon from './icons/PlusIcon';
import { defaultPages } from './constants';
import { SettingsMenuType, Position } from './types';

const PageNavigator: React.FC = (): ReactElement => {
  const [pages, setPages] = useState<string[]>(defaultPages);
  const [activePage, setActivePage] = useState<string>(pages[0]);
  const [settingsMenu, setSettingsMenu] = useState<SettingsMenuType>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [pageCounter, setPageCounter] = useState<number>(1);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setDraggingId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setPages((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over!.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setDraggingId(null);
  };

  const handleAddPage = (afterIndex: number) => {
    const name = `Page ${pageCounter}`;
    setPageCounter((c) => c + 1);
    const newPages = [
      ...pages.slice(0, afterIndex + 1),
      name,
      ...pages.slice(afterIndex + 1),
    ];
    setPages(newPages);
  };

  const handleSettingsMenu = (id: string, position: Position) => {
    setSettingsMenu({ id, position });
  };

  const handleSettingsMenuClose = () => {
    setSettingsMenu(null);
  };

  const handleSettingsMenuAction = (action: string, pageId: string) => {
    setSettingsMenu(null);

    if (action === 'delete') {
      setPages(pages.filter((p) => p !== pageId));

      if (activePage === pageId && pages.length > 1) {
        setActivePage(pages[0]);
      }
    } else if (action === 'rename') {
      const name = prompt('Rename page:', pageId);

      if (name && name !== pageId) {
        setPages(pages.map((p) => (p === pageId ? name : p)));

        if (activePage === pageId) setActivePage(name);
      }
    } else if (action === 'duplicate') {
      const idx = pages.indexOf(pageId);
      const newPages = [
        ...pages.slice(0, idx + 1),
        `${pageId} Duplicate`,
        ...pages.slice(idx + 1),
      ];
      setPages(newPages);
    } else if (action === 'setFirst') {
      setPages([pageId, ...pages.filter((p) => p !== pageId)]);
    }
  };

  return (
    <div className="p-6">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={pages} strategy={horizontalListSortingStrategy}>
          <div className="flex items-center">
            {pages.map((page, index) => (
              <Fragment key={page}>
                {index !== 0 && (
                  <PlusAddButton onClick={() => handleAddPage(index - 1)} />
                )}
                <SortableNavigationItem
                  id={page}
                  activePage={activePage}
                  setActivePage={setActivePage}
                  onSettingsMenu={handleSettingsMenu}
                />
              </Fragment>
            ))}
            <PlusAddButton onClick={() => handleAddPage(pages.length - 1)} />
            <button
              className="flex items-center p-6 py-2 border rounded-medium bg-white hover:bg-gray-50"
              onClick={() => handleAddPage(pages.length - 1)}
              type="button"
            >
              <div className="mr-3">
                <PlusIcon size={16} />
              </div>
              <span className="text-sm">Add page</span>
            </button>
          </div>
        </SortableContext>

        <DragOverlay>
          {draggingId ? (
            <SortableNavigationItem
              id={draggingId}
              activePage={activePage}
              setActivePage={() => {}}
              onSettingsMenu={() => {}}
              isOverlay
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      {settingsMenu  && (
        <SettingsMenu position={settingsMenu.position} itemId={settingsMenu.id} onAction={handleSettingsMenuAction} onClose={handleSettingsMenuClose} />
      )}
    </div>
  );
}

export default PageNavigator;
