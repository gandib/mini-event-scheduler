import express from 'express';
import { eventControllers } from './Event.controller';

const router = express.Router();

router.post('/', eventControllers.addEvent);

export const eventRoutes = router;
