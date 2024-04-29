import os
from pathlib import Path
import decky_plugin
import logging

# Plugin directories and files
plugin_dir = Path(decky_plugin.DECKY_PLUGIN_DIR)
config_dir = Path(decky_plugin.DECKY_PLUGIN_SETTINGS_DIR)

cfg_property_file = config_dir / "plugin.properties"

def get_config(): 
    """
    Reads and parses the plugin configuration file.

    Returns:
    list: A list of key-value pairs representing the configuration.
    """
    with open(cfg_property_file) as f:
        lines = f.readlines()
        lines = list(map(lambda x: x.strip().split('='), lines))
        decky_plugin.logger.debug("config %s", lines)
        return lines

def set_config(key: str, value: str):
    """
    Sets a configuration key-value pair in the plugin configuration file.

    Parameters:
    key (str): The key to set.
    value (str): The value to set for the key.
    """
    with open(cfg_property_file, "r") as f:
        lines = f.readlines()
    with open(cfg_property_file, "w") as f:
        found = False
        for line in lines:
            if line.startswith(key + '='):
                f.write(f"{key}={value}\n")
                found = True
            else:
                f.write(line)
        if not found:
            f.write(f"{key}={value}\n")

def get_config_item(name: str, default: str = None):
    """
    Retrieves a configuration item by name.

    Parameters:
    name (str): The name of the configuration item.
    default (str, optional): The default value if the item is not found. Defaults to None.

    Returns:
    str: The value of the configuration item.
    """
    return next((x[1] for x in get_config() if x[0] == name), default)

def migrate():
    """
    Performs migration tasks if necessary, like creating directories and files, and setting default configurations.
    """
    if not config_dir.is_dir():
        os.makedirs(config_dir, exist_ok=True)
    if not cfg_property_file.is_file():
        cfg_property_file.touch()
