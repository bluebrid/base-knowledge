import os
import json

settings = None


def load_settings():
    global settings
    with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'settings.json'), 'rb') as f:
        settings = json.load(f)


load_settings()
