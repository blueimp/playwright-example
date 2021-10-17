#!/bin/bash

#
# Searches the given (or current) directory for trace.zip files.
# Prompts for a selection unless a number is given.
# Runs `npx playwright show-trace` with the selected trace.zip file.
#
# Usage:
# ./show-trace.sh [dir [num]]
#

set -e

TRACES=()
while IFS=  read -r -d $'\0'; do
  TRACES+=("$REPLY")
done < <(find "${1:-.}" -name trace.zip -print0)

if [ "${#TRACES[@]}" == 0 ]; then
  echo 'No trace.zip files found.' >&2
  exit 1
fi

if [ -n "$2" ]; then
  INDEX=$(($2-1))
  TRACE=${TRACES[INDEX]}
else
  PS3='Please enter the trace number: '
  select TRACE in "${TRACES[@]}"; do export TRACE; break; done
fi

npx playwright show-trace "$TRACE"
