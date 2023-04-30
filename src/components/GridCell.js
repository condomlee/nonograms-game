import { memo } from "react";
import X from "./X";

const GridCell = memo(({ value, row, column }) => {
  const classStates = ["crossed", "filled"]
  const className = classStates[value] || "unknown"

  let contents = ""
  if (className === "crossed") {
    contents = <X />
  }

  return (
    <div className={`nonogram-cell ${className}`}
      title={`row ${row + 1}, column ${column + 1}`}
      data-row={row} data-column={column}>
      {contents}
    </div>
  )
})

export default GridCell;
