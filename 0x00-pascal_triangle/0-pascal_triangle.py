#!/usr/bin/python3
def pascal_triangle(n):
    matrix = []
    
    if n <= 0:
         return matrix
    
    matrix = [[1]] 
    for i in range(1, n):
        temp = [1] 
        for j in range(len(matrix[i - 1]) - 1):
            current = matrix[i - 1]
            temp.append(matrix[i - 1][j] + matrix[i - 1][j + 1])
        temp.append(1)
        matrix.append(temp)
    return matrix