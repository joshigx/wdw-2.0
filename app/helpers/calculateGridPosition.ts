export default function calculateGridPosition(
  index: number,
  columns: number,
  cellWidth: number,
  cellHeight: number,
  margin: number = 16,
  offsetX: number,
  offsetY: number
) {
  const col = index % columns;
  const row = Math.floor(index / columns);

  return {
    x: col * (cellWidth + margin) + offsetX,
    y: row * (cellHeight + margin) + offsetY,
  };
}
