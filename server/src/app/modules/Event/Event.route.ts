import express from 'express';
import { eventControllers } from './Event.controller';

const router = express.Router();

router.post('/', eventControllers.addEvent);

router.get('/', eventControllers.getAllEvents);

router.put('/:id', eventControllers.updateEventStatus);

router.delete('/:id', eventControllers.deleteEvent);

export const eventRoutes = router;
