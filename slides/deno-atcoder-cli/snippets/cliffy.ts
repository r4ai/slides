import { Command, CompletionsCommand } from "jsr:@cliffy/command@1.0.0-rc.4";

// Create a new command.
const hello_command = new Command()
  .name("hello")
  .version("0.1.0")
  .description("A simple hello world program.")
  .command("completions", new CompletionsCommand());

// Add a "world" subcommand.
hello_command
  .command("world")
  .description("Prints 'Hello World!'")
  .action(() => console.log("Hello World!"));

await hello_command.parse(Deno.args);
