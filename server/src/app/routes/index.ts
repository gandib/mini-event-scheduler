import { Router } from 'express';
import { eventRoutes } from '../modules/Event/Event.route';

const router = Router();
const modulesRoutes = [
  {
    path: '/events',
    route: eventRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
