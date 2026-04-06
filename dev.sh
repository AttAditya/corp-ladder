#!/bin/bash

chmod +x backend/*.sh
chmod +x frontend/*.sh

dev() {
  case "$1" in
    "setup")
      ./backend/setup.sh
      ./frontend/setup.sh
      ;;
    "run")
      if [ $# -eq 1 ]; then
        # Start backend and frontend scripts in parallel
        ./backend/start.sh &
        ./frontend/start.sh &

        # Function to get PID from port
        get_pid_from_port() {
          lsof -ti:$1 2>/dev/null | head -1
        }

        # Cleanup function
        cleanup() {
          echo "Shutting down..."

          # Find PIDs from ports
          PID_BE=$(get_pid_from_port 8000)
          PID_FE=$(get_pid_from_port 3000)

          # Kill processes if they exist
          if [ -n "$PID_BE" ]; then
            kill $PID_BE 2>/dev/null
          fi
          if [ -n "$PID_FE" ]; then
            kill $PID_FE 2>/dev/null
          fi

          # Give them a moment to die gracefully
          sleep 1

          # Force kill if still running
          if [ -n "$PID_BE" ] && kill -0 $PID_BE 2>/dev/null; then
            kill -9 $PID_BE 2>/dev/null
          fi
          if [ -n "$PID_FE" ] && kill -0 $PID_FE 2>/dev/null; then
            kill -9 $PID_FE 2>/dev/null
          fi
        }

        # Set trap for graceful shutdown
        trap cleanup EXIT INT TERM

        # Wait for background jobs
        wait
      else
        case "$2" in
          "backend")
            ./backend/start.sh
            ;;
          "frontend")
            ./frontend/start.sh
            ;;
          *)
            echo "Usage: dev run [backend|frontend]"
            ;;
        esac
      fi
      ;;
    *)
      echo "Usage: dev run"
      ;;
  esac
}

