#!/usr/bin/python3
"""
This module contains a UTF-8 Validation
function.
"""


def validUTF8(data):
    """
    data: a list of integers
    Return: True if data is a valid UTF-8
    encoding, else False
    """
    byte_count = 0

    for shift in data:
        if byte_count == 0:
            if shift >> 5 == 0b110 or shift >> 5 == 0b1110:
                byte_count = 1
            elif shift >> 4 == 0b1110:
                byte_count = 2
            elif shift >> 3 == 0b11110:
                byte_count = 3
            elif shift >> 7 == 0b1:
                return False
        else:
            if shift >> 6 != 0b10:
                return False
            byte_count -= 1
    return byte_count == 0
