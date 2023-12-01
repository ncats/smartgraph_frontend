#!/bin/sh
set -e

# Check for WRITE_CONFIG env variable
if [ "${WRITE_CONFIG}" != "true" ]; then
  echo "WRITE_CONFIG is not set to 'true'. Skipping JSON configuration."
else
  echo "Creating JSON configuration from environment variables."
  # Read environment variables
  ENVIRONMENT="${ENVIRONMENT:?Error: ENVIRONMENT environment variable not set}"
  DATA_URL="${DATA_URL:?Error: DATA_URL environment variable not set}"
  API_SWAGGER_URL="${API_SWAGGER_URL:?Error: API_SWAGGER_URL environment variable not set}"

  # Write to config.json file
  cat > /usr/share/nginx/app/assets/config.json <<EOF
{
  "ENVIRONMENT": "$ENVIRONMENT",
  "DATA_URL": "$DATA_URL",
  "API_SWAGGER_URL": "$API_SWAGGER_URL"
}
EOF
  chmod og+r /usr/share/nginx/app/assets/config.json
fi

# Start NGINX
exec nginx -g "daemon off;"
