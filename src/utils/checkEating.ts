import { Coordinate } from "../types/type";

export const checkEating = (
  head: Coordinate,
  food: Coordinate,
  area: number,
): boolean => {
  const dispX: number = Math.abs(head.x - food.x);
  const dispY: number = Math.abs(head.y - food.y);

  return dispX < area && dispY < area;
};
