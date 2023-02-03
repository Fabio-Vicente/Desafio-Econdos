import { Router } from 'express';

export default class AppRouter {
  constructor(public routes: Router[], public router: Router = Router()) {
    this.router = router;
    this.configRoutes();
  }

  configRoutes(): void {
    this.routes.forEach((route) => this.router.use(route));
  }
}
