import { Response, Router } from 'express';

import { Application, Prisma } from '@prisma/client';
import * as Controllers from '../controllers/application';

async function handleError<T>(res: Response, fn: () => Promise<T>): Promise<T | undefined> {
    try {
        return await fn();
    } catch (e: any) {
        // TODO: this should behave differently in production
        // In a real app we'd ideally use the framework layer to handle error responses
        res.json({
            error: 'Controller Error',
            message: e.message || 'An error occurred in a controller method',
        });
        return;
    }
}

const routes = Router();

routes.post('/', async (req, res) => {
    const params = req.body satisfies Prisma.ApplicationCreateInput;
    const app = await handleError<Application>(res, () => Controllers.createApplication(params));
    app &&
        res.json({
            data: app,
        });
});

routes.get('/:id', async (req, res) => {
    const { id } = req.params satisfies { id: string };
    const app = await handleError<Application>(res, () => Controllers.getApplication(Number(id)));
    app &&
        res.json({
            data: app,
        });
});

routes.put('/:id', (req, res) => {
    res.json({
        message: `Update insurance application with id ${req.params.id}`,
    });
});

routes.post('/:id/submit', (req, res) => {
    res.json({
        message: `Submit insurance application with id ${req.params.id}`,
    });
});

export default routes;
