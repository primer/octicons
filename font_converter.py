import os
from pathlib import Path
from typing import Callable

from fontTools.ttLib import TTFont


def convert_font(input_path: str, output_folder: str, output_format: str, on_success: Callable,
                 on_failure: Callable) -> None:
    formats = ['ttf', 'otf', 'woff', 'woff2']

    if output_format not in formats:
        on_failure(f"Unsupported format: {output_format}. Supported formats are:\n{formats}")
        return

    try:
        font = TTFont(input_path)

        base_name = os.path.splitext(input_path)[0]
        output_path = Path(output_folder) / f"{base_name}.{output_format}"

        if output_format == 'ttf' or output_format == 'otf':
            font.save(output_path)
        elif output_format == 'woff':
            font.flavor = 'woff'
            font.save(output_path)
        elif output_format == 'woff2':
            font.flavor = 'woff2'
            font.save(output_path)

        on_success(f"Font converted to {output_format} and saved as:\n{output_path}")
    except Exception as e:
        on_failure(f'Error while converting {input_path} to {output_format}: \n{e}')
