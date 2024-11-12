# string data types


# literal assignment
first_name = "devvrat"
last_name = "shukla"
date_of_birth = "1st Dec, 1980"
weight = 70
height_in_cms = 170.2
is_male = True

# type
print(type(date_of_birth)) # <class 'str'>
print(type(weight)) # <class 'int'>
print(type(height_in_cms)) # <class 'float'>
print(type(is_male)) # <class 'bool'>

print(type(first_name)) # <class 'str'>
print(type(first_name) == str) # true
print(isinstance(first_name,str)) # true


# concat
fullname = first_name + " " + last_name
print(fullname)

# casting a number
year1980 = 1980
decade = str(year1980)
print("Type of year1980", type(year1980))
print("Type of decade", type(decade))

