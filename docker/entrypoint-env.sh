#!/bin/sh
set -eu

escape() {
  printf '%s' "$1" | sed 's/\\/\\\\/g; s/"/\\"/g'
}

home_assistant_api=$(escape "${REACT_APP_HOME_ASSISTANT_API:-}")
access_token=$(escape "${REACT_APP_ACCESS_TOKEN:-}")

cat > /usr/share/nginx/html/env.js <<EOF
window.__ENV = {
  REACT_APP_HOME_ASSISTANT_API: "${home_assistant_api}",
  REACT_APP_ACCESS_TOKEN: "${access_token}"
};
EOF
