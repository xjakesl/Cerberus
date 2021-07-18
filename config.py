class Redis:
    # Redis server configuration
    address = "192.168.10.62"
    port = 6379


class Flask:
    # This is needed for CSRF Protection. Best generate very long random string and use that
    secret_key = "5a4s1d65a4sd51as35d465a4sd654asd"
    # This is the path to the app directory
    # Example: "/var/www/yourappdir"
    path = "/mnt/c/Users/xjake/PycharmProjects/Cerberus"


class CelerySettings:
    queue = "dev"
