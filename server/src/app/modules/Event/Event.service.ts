import { TEvent } from './Event.interface';

const addEvent = async (payload: TEvent) => {
  console.log(payload);
};

export const evnetServices = {
  addEvent,
};
