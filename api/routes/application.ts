import { Response, Router } from 'express';

import { Application } from '@prisma/client';
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
    const app = await handleError<{ id: number; resume: string }>(res, () =>
        Controllers.createApplication(req.body)
    );
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

routes.put('/:id', async (req, res) => {
    const { id } = req.params satisfies { id: string };
    const app = await handleError<Application>(res, async () =>
        Controllers.updateApplication(Number(id), req.body)
    );
    app &&
        res.json({
            data: app,
        });
});

routes.post('/:id/submit', async (req, res) => {
    const { id } = req.params satisfies { id: string };
    const app = await handleError<Application | { errors: Record<string, string[]> }>(
        res,
        async () => Controllers.submitApplication(Number(id))
    );
    app &&
        res.json({
            data: app,
        });
});

export default routes;
