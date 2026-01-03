import { env, loadEnvFile } from 'node:process'
loadEnvFile();

const isWorkingEnv = env.TEST_VAR;

console.log(isWorkingEnv);