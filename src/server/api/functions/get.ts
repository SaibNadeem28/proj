import { Db, WithId } from 'mongodb';

interface User {
    _id?: string;
    name: string;
    email: string;
}

export async function getUsersQuery(db: Db): Promise<User[]> {
    const collection = db.collection<User>('users');
    const users = await collection.find().toArray();
    return users.map((user: WithId<User>) => ({
        _id: user._id?.toString(),
        name: user.name,
        email: user.email,
    }));
}
