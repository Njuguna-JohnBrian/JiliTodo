#!/bin/bash

while true; do
  read -p "Enter a migration description (or 'exit'(or press q) to quit): " description

  # Check if the user entered 'exit' to quit
  if [ "$description" == "exit" ]; then
    exit
  fi

  if [ "$description" == "q" ]; then
      exit
    fi

  # Check if the description is empty
  if [ -z "$description" ]; then
    echo "Please provide a non-empty description."
  else
    # Valid description provided, create the migration file
    echo "Creating migration file: ${description}"
    cd "database"
    npx knex migrate:make ${description}
    break  # Exit the loop
  fi
done
