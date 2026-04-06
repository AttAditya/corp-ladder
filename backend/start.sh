#!/bin/bash

LOG_FILE="../../.logs/$( date +"%Y-%m-%d_%H-%M-%S" ).backend.log"

cd backend/app
source venv/bin/activate
echo "Backend Log: $LOG_FILE"
uvicorn main:app --reload 2>&1 | cat > $LOG_FILE
cd ../..
