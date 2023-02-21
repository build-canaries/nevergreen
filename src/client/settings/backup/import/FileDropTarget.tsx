import type { DragEvent, ReactElement, ReactNode } from 'react'
import isNil from 'lodash/isNil'
import { useStopDefaultDragAndDropBehaviour } from './StopDefaultDragAndDropBehaviourHook'

interface FileDropTargetProps {
  readonly onFileDropped: (files: FileList) => Promise<void>
  readonly className?: string
  readonly disabled?: boolean
  readonly children: ReactNode
}

export function FileDropTarget({
  onFileDropped,
  className,
  children,
  disabled = false,
}: FileDropTargetProps): ReactElement {
  useStopDefaultDragAndDropBehaviour()

  const setCopyIcon = (evt: DragEvent<HTMLDivElement>) => {
    evt.preventDefault()
    if (disabled) {
      evt.dataTransfer.dropEffect = 'none'
    } else {
      evt.dataTransfer.dropEffect = 'copy'
    }
  }

  const openFile = (evt: DragEvent<HTMLDivElement>) => {
    evt.preventDefault()
    if (!disabled) {
      const files = evt.dataTransfer.files
      if (!isNil(files)) {
        void onFileDropped(files)
      }
    }
  }

  return (
    <div onDragOver={setCopyIcon} onDrop={openFile} className={className}>
      {children}
    </div>
  )
}
