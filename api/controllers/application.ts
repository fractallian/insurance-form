import { Application, Prisma, Vehicle } from '@prisma/client';
import { CreateApplicationDto } from '../../shared';
import { validateApplicationComplete } from '../../shared/validateApplicationComplete';
import db from '../db';

// API docs

export async function createApplication(input: CreateApplicationDto) {
    const data: Prisma.ApplicationCreateInput = {
        ...input,
        vehicles: { create: input.vehicles || [] },
    };
    const { id } = await db.application.create({ data });

    return { id, resume: `applications/${id}` };
}

export async function getApplication(id: number) {
    const app = await db.application.findFirst({ where: { id }, include: { vehicles: true } });
    if (!app) throw new Error(`Application not found. id: ${id})`);

    return app;
}

export async function updateApplication(
    id: number,
    input: CreateApplicationDto
): Promise<Application> {
    const create = input.vehicles?.filter((v) => !v.id) || [];
    const update = input.vehicles?.filter((v) => !!v.id) || [];
    const data: Prisma.ApplicationUpdateInput = {
        ...input,
        vehicles: {
            create,
            update: update.map((v) => {
                const { id, applicationId, ...data } = v;
                return {
                    where: { id: v.id },
                    data,
                };
            }),
        },
    };
    const result = await db.application.update({ data, where: { id, submittedAt: null } });

    const app = await db.application.findFirst({ where: { id }, include: { vehicles: true } });
    if (!app) throw 'Missing Application';
    return app;
}

function validateApplication(app: Application & { vehicles: Vehicle[] }) {
    const { errors } = validateApplicationComplete(app as CreateApplicationDto);
    return { isValid: !Object.keys(errors || {}).length, errors };
}

export async function submitApplication(
    id: number
): Promise<{ errors: Record<string, string[]>; price?: number }> {
    const app = await db.application.findFirst({ where: { id }, include: { vehicles: true } });
    if (!app) throw 'Missing Application';

    const { isValid, errors } = validateApplication(app);
    if (isValid) {
        app.submittedAt = new Date();
        await db.application.update({
            data: { submittedAt: app.submittedAt.toISOString() },
            where: { id },
        });
    }
    return { errors: errors || {}, price: Math.round(Math.random() * 1000) };
}
