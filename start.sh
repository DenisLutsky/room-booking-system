#!/bin/bash

# Run migrations and seeds
node dist/database/runMigrationsAndSeeds.js

# Check if the migrations executed successfully
if [ $? -eq 0 ]; then
    # Run the built app
    node dist/main.js
else
    echo "Error running migration script. Exiting."
    exit 1
fi