from django.utils.crypto import get_random_string


class KeyGenerator:
    def __init__(self, key_length=40):
        self.key_length = key_length

    def generate(self):
        return get_random_string(self.key_length)
