import { Prisma } from '@prisma/client';
import db from '../db';

export async function createApplication(input: Prisma.ApplicationCreateInput) {
    const app = await db.application.create({ data: input });

    return app;
}

export async function getApplication(id: number) {
    const app = await db.application.findFirst({ where: { id } });
    if (!app) throw new Error(`Application not found. id: ${id})`);

    return app;
}
