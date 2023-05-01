import debugpy


def pytest_configure(config):
    if config.option.debug:
        # Iniciar la depuración del punto de entrada para pytest
        print("Esperando el depurador...")
        debugpy.wait_for_client()
