class Redis:
    # Redis server configuration
    address = "127.0.0.1"
    port = 6379


class Flask:
    # This is needed for CSRF Protection. Best generate very long random string and use that
    secret_key = ""
    # This is the path to the app directory
    # Example: "/var/www/yourappdir"
    path = ""
