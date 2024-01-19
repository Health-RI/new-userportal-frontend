#!/bin/sh
set -e

echo "Replacing env.js with environment variables..."

envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js

exit 0