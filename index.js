#!/usr/bin/env node

// import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// mongoose.connect(MONGO_URI)

// // $ Add a Task

// const addTask = (task) => {
       
// }


import {Command} from 'commander';
import inquirer from 'inquirer';
import {nanoid} from 'nanoid';
import { MongoClient } from 'mongodb';
import {Low} from 'lowdb';
import {JSONFilePreset} from 'lowdb/node';

// // Setup lowdb
// const adapter = new JSONFilePreset('db.json');
// const db = new Low(adapter);

// const program = new Command();

// // Load database and set defaults
// const loadDb = async () => {
//   await db.read();
//   db.data ||= { tasks: [] };
// };

// // Add a task
// program
//   .command('add')
//   .description('Add a new task')
//   .action(async () => {
//     const answers = await inquirer.prompt([
//       {
//         type: 'input',
//         name: 'task',
//         message: 'Enter task description:',
//       },
//     ]);

//     await loadDb();
//     db.data.tasks.push({ id: nanoid(), task: answers.task, done: false });
//     await db.write();
//     console.log('Task added:', answers.task);
//   });

// // List tasks
// program
//   .command('list')
//   .description('List all tasks')
//   .action(async () => {
//     await loadDb();
//     console.log('Todo Tasks:');
//     db.data.tasks.forEach((t) => {
//       console.log(`[${t.done ? 'x' : ' '}] ${t.id}: ${t.task}`);
//     });
//   });

// // Mark task as done
// program
//   .command('done <id>')
//   .description('Mark a task as done')
//   .action(async (id) => {
//     await loadDb();
//     const task = db.data.tasks.find((t) => t.id === id);
//     if (task) {
//       task.done = true;
//       await db.write();
//       console.log('Task marked as done:', task.task);
//     } else {
//       console.log('Task not found');
//     }
//   });

// // Remove a task
// program
//   .command('remove <id>')
//   .description('Remove a task')
//   .action(async (id) => {
//     await loadDb();
//     db.data.tasks = db.data.tasks.filter((t) => t.id !== id);
//     await db.write();
//     console.log('Task removed');
//   });

// program.parse(process.argv);

// // Update a task
// program
//   .command('update <id>')
//   .description('Update a task')
//   .action(async (id) => {
//     const answers = await inquirer.prompt([
//       {
//         type: 'input',
//         name: 'task',
//         message: 'Enter new task description:',
//       },
//     ]);

//     await loadDb();
//     const task = db.data.tasks.find((t) => t.id === id);
//     if (task) {
//       task.task = answers.task;
//       await db.write();
//       console.log('Task updated:', answers.task);
//     } else {
//       console.log('Task not found');
//     }
//   });


// #!/usr/bin/env node

// const { Command } = require('commander');
// const inquirer = require('inquirer');
// const { MongoClient } = require('mongodb');
// const { nanoid } = require('nanoid');

const client = new MongoClient("mongodb+srv://guptasukant9:1tshgAKIUrLL10zz@cluster0.p3ar5gw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const program = new Command();

// async function run() {
//   try {
//     await client.connect();
//     const database = client.db('todoDB');
//     const tasks = database.collection('tasks');

//     // Add a task
//     program
//       .command('add')
//       .description('Add a new task')
//       .action(async () => {
//         const answers = await inquirer.prompt([
//           {
//             type: 'input',
//             name: 'task',
//             message: 'Enter task description:',
//           },
//         ]);

//         const newTask = { id: nanoid(), task: answers.task, done: false };
//         await tasks.insertOne(newTask);
//         console.log('Task added:', answers.task);
//       });

//     // List tasks
//     program
//       .command('list')
//       .description('List all tasks')
//       .action(async () => {
//         const allTasks = await tasks.find({}).toArray();
//         console.log('Todo Tasks:');
//         allTasks.forEach((t) => {
//           console.log(`[${t.done ? 'x' : ' '}] ${t.id}: ${t.task}`);
//         });
//       });

//     // Mark task as done
//     program
//       .command('done <id>')
//       .description('Mark a task as done')
//       .action(async (id) => {
//         const result = await tasks.updateOne({ id }, { $set: { done: true } });
//         if (result.modifiedCount > 0) {
//           console.log('Task marked as done:', id);
//         } else {
//           console.log('Task not found');
//         }
//       });

//     // Remove a task
//     program
//       .command('remove <id>')
//       .description('Remove a task')
//       .action(async (id) => {
//         const result = await tasks.deleteOne({ id });
//         if (result.deletedCount > 0) {
//           console.log('Task removed:', id);
//         } else {
//           console.log('Task not found');
//         }
//       });

//     // Update a task
//     program
//       .command('update <id>')
//       .description('Update a task')
//       .action(async (id) => {
//         const answers = await inquirer.prompt([
//           {
//             type: 'input',
//             name: 'task',
//             message: 'Enter new task description:',
//           },
//         ]);

//         const result = await tasks.updateOne({ id }, { $set: { task: answers.task } });
//         if (result.modifiedCount > 0) {
//           console.log('Task updated:', answers.task);
//         } else {
//           console.log('Task not found');
//         }
//       });

//     program.parse(process.argv);
//   } finally {
//     await client.close();
//   }
// }

// run().catch(console.dir);


async function main() {
    try {
      await client.connect();
      console.log('Connected to MongoDB');
  
      const database = client.db('todoDB');
      const tasks = database.collection('tasks');
  
      // Add a task
      program
        .command('add')
        .description('Add a new task')
        .action(async () => {
          const answers = await inquirer.prompt([
            {
              type: 'input',
              name: 'task',
              message: 'Enter task description:',
            },
          ]);
  
          const newTask = { id: nanoid(), task: answers.task, done: false };
          await tasks.insertOne(newTask);
          console.log('Task added:', answers.task);
        });
  
      // List tasks
      program
        .command('list')
        .description('List all tasks')
        .action(async () => {
          const allTasks = await tasks.find({}).toArray();
          console.log('Todo Tasks:');
          allTasks.forEach((t) => {
            console.log(`[${t.done ? 'x' : ' '}] ${t.id}: ${t.task}`);
          });
        });
  
      // Mark task as done
      program
        .command('done <id>')
        .description('Mark a task as done')
        .action(async (id) => {
          const result = await tasks.updateOne({ id }, { $set: { done: true } });
          if (result.modifiedCount > 0) {
            console.log('Task marked as done:', id);
          } else {
            console.log('Task not found');
          }
        });
  
      // Remove a task
      program
        .command('remove <id>')
        .description('Remove a task')
        .action(async (id) => {
          const result = await tasks.deleteOne({ id });
          if (result.deletedCount > 0) {
            console.log('Task removed:', id);
          } else {
            console.log('Task not found');
          }
        });
  
      // Update a task
      program
        .command('update <id>')
        .description('Update a task')
        .action(async (id) => {
          const answers = await inquirer.prompt([
            {
              type: 'input',
              name: 'task',
              message: 'Enter new task description:',
            },
          ]);
  
          const result = await tasks.updateOne({ id }, { $set: { task: answers.task } });
          if (result.modifiedCount > 0) {
            console.log('Task updated:', answers.task);
          } else {
            console.log('Task not found');
          }
        });
  
      program.parse(process.argv);
    } catch (e) {
      console.error(e);
    } finally {
    //   await client.close();
    //   console.log('Disconnected from MongoDB');
    }
  }
  
  main().catch(console.error);

// async function main() {
//     try {
//       await client.connect();
//       console.log('Connected to MongoDB');
  
//       const database = client.db('todoDB');
//       const tasks = database.collection('tasks');
//       const counters = database.collection('counters');
  
//       // Initialize counters collection if not exists
//       await counters.updateOne(
//         { _id: 'taskId' },
//         { $setOnInsert: { sequence_value: 0 } },
//         { upsert: true }
//       );
  
//       // Get next sequence value
//       async function getNextSequenceValue() {
//         const result = await counters.findOneAndUpdate(
//           { _id: 'taskId' },
//           { $inc: { sequence_value: 1 } },
//           { returnDocument: 'after' }
//         );
//         return result.value.sequence_value;
//       }
  
//       // Add a task
//       program
//         .command('add')
//         .description('Add a new task')
//         .action(async () => {
//           const answers = await inquirer.prompt([
//             {
//               type: 'input',
//               name: 'task',
//               message: 'Enter task description:',
//             },
//           ]);
  
//           const newTaskId = await getNextSequenceValue();
//           const newTask = { id: newTaskId, task: answers.task, done: false };
//           await tasks.insertOne(newTask);
//           console.log('Task added:', answers.task);
//         });
  
//       // List tasks
//       program
//         .command('list')
//         .description('List all tasks')
//         .action(async () => {
//           const allTasks = await tasks.find({}).toArray();
//           console.log('Todo Tasks:');
//           allTasks.forEach((t) => {
//             console.log(`[${t.done ? 'x' : ' '}] ${t.id}: ${t.task}`);
//           });
//         });
  
//       // Mark task as done
//       program
//         .command('done <id>')
//         .description('Mark a task as done')
//         .action(async (id) => {
//           const taskId = parseInt(id, 10);
//           const result = await tasks.updateOne({ id: taskId }, { $set: { done: true } });
//           if (result.modifiedCount > 0) {
//             console.log('Task marked as done:', taskId);
//           } else {
//             console.log('Task not found');
//           }
//         });
  
//       // Remove a task
//       program
//         .command('remove <id>')
//         .description('Remove a task')
//         .action(async (id) => {
//           const taskId = parseInt(id, 10);
//           const result = await tasks.deleteOne({ id: taskId });
//           if (result.deletedCount > 0) {
//             console.log('Task removed:', taskId);
//           } else {
//             console.log('Task not found');
//           }
//         });
  
//       // Update a task
//       program
//         .command('update <id>')
//         .description('Update a task')
//         .action(async (id) => {
//           const taskId = parseInt(id, 10);
//           const answers = await inquirer.prompt([
//             {
//               type: 'input',
//               name: 'task',
//               message: 'Enter new task description:',
//             },
//           ]);
  
//           const result = await tasks.updateOne({ id: taskId }, { $set: { task: answers.task } });
//           if (result.modifiedCount > 0) {
//             console.log('Task updated:', answers.task);
//           } else {
//             console.log('Task not found');
//           }
//         });
  
//       program.parse(process.argv);
//     } catch (e) {
//       console.error(e);
//     } finally {
//     //   await client.close();
//     //   console.log('Disconnected from MongoDB');
//     }
//   }
  
//   main().catch(console.error);
  

// async function main() {
//     try {
//       await client.connect();
//       console.log('Connected to MongoDB');
  
//       const database = client.db('todoDB');
//       const tasks = database.collection('tasks');
//       const counters = database.collection('counters');
  
//       // Initialize counters collection if not exists
//       const counterInitResult = await counters.updateOne(
//         { _id: 'taskId' },
//         { $setOnInsert: { sequence_value: 0 } },
//         { upsert: true }
//       );
  
//       if (counterInitResult.upsertedCount > 0) {
//         console.log('Counters collection initialized');
//       }
  
//       // Get next sequence value
//       async function getNextSequenceValue() {
//         const result = await counters.findOneAndUpdate(
//           { _id: 'taskId' },
//           { $inc: { sequence_value: 1 } },
//           { returnDocument: 'after' }
//         );
  
//         if (!result.value) {
//           throw new Error('Failed to retrieve next sequence value');
//         }
  
//         return result.value.sequence_value;
//       }
  
//       // Add a task
//       program
//         .command('add')
//         .description('Add a new task')
//         .action(async () => {
//           const answers = await inquirer.prompt([
//             {
//               type: 'input',
//               name: 'task',
//               message: 'Enter task description:',
//             },
//           ]);
  
//           const newTaskId = await getNextSequenceValue();
//           const newTask = { id: newTaskId, task: answers.task, done: false };
//           await tasks.insertOne(newTask);
//           console.log('Task added:', answers.task);
//         });
  
//       // List tasks
//       program
//         .command('list')
//         .description('List all tasks')
//         .action(async () => {
//           const allTasks = await tasks.find({}).toArray();
//           console.log('Todo Tasks:');
//           allTasks.forEach((t) => {
//             console.log(`[${t.done ? 'x' : ' '}] ${t.id}: ${t.task}`);
//           });
//         });
  
//       // Mark task as done
//       program
//         .command('done <id>')
//         .description('Mark a task as done')
//         .action(async (id) => {
//           const taskId = parseInt(id, 10);
//           const result = await tasks.updateOne({ id: taskId }, { $set: { done: true } });
//           if (result.modifiedCount > 0) {
//             console.log('Task marked as done:', taskId);
//           } else {
//             console.log('Task not found');
//           }
//         });
  
//       // Remove a task
//       program
//         .command('remove <id>')
//         .description('Remove a task')
//         .action(async (id) => {
//           const taskId = parseInt(id, 10);
//           const result = await tasks.deleteOne({ id: taskId });
//           if (result.deletedCount > 0) {
//             console.log('Task removed:', taskId);
//           } else {
//             console.log('Task not found');
//           }
//         });
  
//       // Update a task
//       program
//         .command('update <id>')
//         .description('Update a task')
//         .action(async (id) => {
//           const taskId = parseInt(id, 10);
//           const answers = await inquirer.prompt([
//             {
//               type: 'input',
//               name: 'task',
//               message: 'Enter new task description:',
//             },
//           ]);
  
//           const result = await tasks.updateOne({ id: taskId }, { $set: { task: answers.task } });
//           if (result.modifiedCount > 0) {
//             console.log('Task updated:', answers.task);
//           } else {
//             console.log('Task not found');
//           }
//         });
  
//       program.parse(process.argv);
//     } catch (e) {
//       console.error(e);
//     } finally {
//     //   await client.close();
//     //   console.log('Disconnected from MongoDB');
//     }
//   }
  
//   main().catch(console.error);