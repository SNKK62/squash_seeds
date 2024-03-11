import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const todos = [
    {
      title: 'test1',
    },
    {
      title: 'test2',
    },
  ];

  todos.forEach(async (todo) => {
    const createdTodo = await prisma.todo.create({
      data: todo,
    });
    console.log(createdTodo);
  });
}

main()
  .catch((e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
