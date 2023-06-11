// mock data

import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
    try {
        // Create users
        const user1 = await db.user.create({
            data: {
                username: "user1",
                email: "user1@example.com",
                password: "password1",
                firstName: "John",
                lastName: "Doe",
            },
        });

        const user2 = await db.user.create({
            data: {
                username: "user2",
                email: "user2@example.com",
                password: "password2",
                firstName: "Jane",
                lastName: "Smith",
            },
        });

        // Create lists
        const list1 = await db.list.create({
            data: {
                listName: "List 1",
                listDescription: "Description of List 1",
                listUrl: "https://example.com/list1",
                userId: user1.id,
            },
        });

        const list2 = await db.list.create({
            data: {
                listName: "List 2",
                listDescription: "Description of List 2",
                listUrl: "https://example.com/list2",
                userId: user1.id,
            },
        });

        const list3 = await db.list.create({
            data: {
                listName: "List 3",
                listDescription: "Description of List 3",
                listUrl: "https://example.com/list3",
                userId: user2.id,
            },
        });

        // Create bookmarks
        const bookmark1 = await db.bookmark.create({
            data: {
                bookmarkTitle: "Bookmark 1",
                bookmarkUrl: "https://example.com/bookmark1",
                listId: list1.id,
            },
        });

        const bookmark2 = await db.bookmark.create({
            data: {
                bookmarkTitle: "Bookmark 2",
                bookmarkUrl: "https://example.com/bookmark2",
                listId: list1.id,
            },
        });

        const bookmark3 = await db.bookmark.create({
            data: {
                bookmarkTitle: "Bookmark 3",
                bookmarkUrl: "https://example.com/bookmark3",
                listId: list2.id,
            },
        });

        console.log("Seed data created successfully.");
    } catch (error) {
        console.error("Error seeding data:", error);
    } finally {
        await db.$disconnect();
    }
}

seed();
