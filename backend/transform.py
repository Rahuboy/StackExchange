# given a xml file change the variable name from camel case to snake case
# we will use sed to do the job
# as the file is very big.

import re
import os

Val = []

def convert_to_snake_case(name):
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()

def convert_to_camel_case(name):
    return ''.join(x.capitalize() or '_' for x in name.split('_'))

def transform(file):
    x=True
    for var in Val:
        nname = convert_to_camel_case(var)
        if (x == True):
            call = "sed 's/" + nname + "/" + var + "/g' " + file + ".xml > " + file + "1.xml"
            os.system(call)
            print(call)
            x=False
        else:
            call = "sed 's/" + nname + "/" + var + "/g' " + file + "1.xml > " + file + ".xml"
            os.system(call)
            print(call)
            x=True

    # cp the final result in file.xml
    if (x == False):
        os.system("cp " + file + "1.xml " + file + ".xml")

# the Val list will contain all the variable names in snake case

# we will get the variable names from the user
# in this format in a file called names.txt


# | id                       | int          | NO   | PRI | NULL    |       |
# | owner_user_id            | int          | YES  |     | NULL    |       |
# | last_editor_user_id      | int          | YES  |     | NULL    |       |
# | post_type_id             | smallint     | NO   |     | NULL    |       |
# | accepted_answer_id       | int          | YES  |     | NULL    |       |
# | score                    | int          | NO   |     | NULL    |       |
# | parent_id                | int          | YES  |     | NULL    |       |
# | view_count               | int          | YES  |     | NULL    |       |
# | answer_count             | int          | YES  |     | 0       |       |
# | comment_count            | int          | YES  |     | 0       |       |
# | owner_display_name       | varchar(64)  | YES  |     | NULL    |       |
# | last_editor_display_name | varchar(64)  | YES  |     | NULL    |       |
# | title                    | varchar(512) | YES  |     | NULL    |       |
# | tags                     | varchar(512) | YES  |     | NULL    |       |
# | content_license          | varchar(64)  | NO   |     | NULL    |       |
# | body                     | mediumtext   | YES  |     | NULL    |       |
# | favorite_count           | int          | YES  |     | NULL    |       |
# | creation_date            | timestamp(3) | NO   |     | NULL    |       |
# | community_owned_date     | timestamp(3) | YES  |     | NULL    |       |
# | closed_date              | timestamp(3) | YES  |     | NULL    |       |
# | last_edit_date           | timestamp(3) | YES  |     | NULL    |       |
# | last_activity_date       | timestamp(3) | YES  |     | NULL    |       |

# now the first column is the variable name in camel case

def get_variable_names():
    with open("names.txt") as f:
        for line in f:
            name1 = line.split('|')[1]
            # remove the spaces
            name = name1.strip()
            Val.append(name)
    

# we will get the file name from the user

if __name__=="__main__":
    get_variable_names()
    file = input("Enter the file name: ")
    
    # sort val in decreasing order of length of variable name
    Val.sort(key=len, reverse=True)

    # transform the file
    transform(file)

