import { Command } from "commander";

const program = new Command()

program
     .option("-m, --mode <mode>", "modo manejo de entornos", "production")
     .parse()

export default program     