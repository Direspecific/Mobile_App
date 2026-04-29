# Program: Passing Parameters by Reference in Python

def modify_list(numbers):
    print("Inside function before modification:", numbers)
    numbers.append(100)
    print("Inside function after modification:", numbers)

# Main program
my_list = [10, 20, 30]
print("Before function call:", my_list)

modify_list(my_list)

print("After function call:", my_list)