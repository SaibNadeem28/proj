import { Db, InsertOneResult, ObjectId } from 'mongodb';

interface User {
    _id?: ObjectId;
    name: string;
    email: string;
}

interface Post {
    _id?: ObjectId;
    title: string;
    content: string;
}

export async function createUserMutation(db: Db, user: User): Promise<User> {
    const collection = db.collection<User>('users');
    const result = await collection.insertOne(user);
    if (result.insertedId) {
        return { _id: result.insertedId, ...user }; // Return the inserted user with the generated ID
    } else {
        throw new Error('User insertion failed');
    }
}

export async function updateNameMutation(db: Db, postId: ObjectId, newName: string): Promise<void> {
    const collection = db.collection<Post>('posts');
    await collection.updateOne({ _id: postId }, { $set: { title: newName } });
}

export async function getLatestPostQuery(db: Db): Promise<Post | null> {
    const collection = db.collection<Post>('posts');
    const latestPost = await collection.findOne({}, { sort: { _id: -1 } });
    return latestPost;
}
