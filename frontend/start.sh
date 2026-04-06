#!/bin/bash

LOG_FILE="../../.logs/$( date +"%Y-%m-%d_%H-%M-%S" ).frontend.log"

cd frontend/app
echo "Frontend Log: $LOG_FILE"
npm run dev 2>&1 | cat > $LOG_FILE
cd ../..
