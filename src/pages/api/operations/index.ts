import { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/shared/prisma/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
            const { name, value, type, categories, comment, tableId, date } = req.body

            const operation = await db.operations.create({
                data: {
                    name,
                    value: Number(value),
                    type,
                    categories,
                    comment,
                    date: new Date(date),
                    table: { connect: { id: tableId } },
                },
            })

            return res.status(201).json(operation)
        } else if (req.method === 'GET') {
            const { tableId } = req.query

            const operations = await db.operations.findMany({
                where: { tableId: String(tableId) },
                include: { table: true },
            })

            return res.status(200).json(operations)
        }else if (req.method === 'PATCH') {
            const { id } = req.query
            const { name, value, type, categories, comment, date } = req.body
            const operationId = Number(id)

            if (!id || isNaN(operationId)) {
                return res.status(400).json({ message: 'Некорректные данные' });
            }

            try {
                const updatedOperation = await db.operations.update({
                    where: { id: operationId },
                    data: {
                        name,
                        value: Number(value),
                        type,
                        categories,
                        comment,
                        date: new Date(date),
                    }
                });

                return res.status(200).json(updatedOperation)
            } catch (error) {
                console.error(error)
                return res.status(500).json({ message: 'Ошибка при обновлении операции', error })
            }

        } else if (req.method === 'DELETE') {
            const { id } = req.query

            const operationId = Number(id)

            if (!id || isNaN(operationId)) {
                return res.status(400).json({ message: 'Некорректные данные' })
            }

            try {
                const deleteOperation = await db.operations.delete({
                    where: { id: Number(id) },
                })
                return res.status(200).json(deleteOperation)
            } catch (error) {
                return res.status(500).json({ message: 'Ошибка сервера', error: error })
            }

        } else {
            res.setHeader('Allow', ['POST', 'GET', 'DELETE', 'PUT'])
            return res.status(405).end(`Method ${req.method} Not Allowed`)
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}
