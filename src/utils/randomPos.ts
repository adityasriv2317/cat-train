import { Coordinate } from "../types/type";

export const randomPos = (mx: number, my: number): Coordinate => {
  return {
    x: Math.floor(Math.random() * mx),
    y: Math.floor(Math.random() * my),
  };
};
