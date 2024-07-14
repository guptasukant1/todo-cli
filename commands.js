import { Command } from 'commander';
import inquirer from 'inquirer';
const program = new Command();
const prompt = inquirer.createPromptModule();
import { addTodo } from './index.js';

const questions =[]