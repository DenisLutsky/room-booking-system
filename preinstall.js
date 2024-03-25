if (process.env.npm_config_force) {
  console.error('The --force flag is not allowed.');
  process.exit(1);
}
