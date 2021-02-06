import sqlite3
import datetime
import postit_parser, pandas as pd

#Creates table for storing Post It sets
def create_table():
    with sqlite3.connect('postits.db') as conn: 
        c = conn.cursor()
        c.execute('''CREATE TABLE IF NOT EXISTS postit_data
        (ds DATE, 
        pi_title TEXT,
        pi_text TEXT)''')
        conn.commit()

#checks if default data set is already loaded
def check_default():
    with sqlite3.connect('postits.db') as conn: 
        c = conn.cursor()
        conn = sqlite3.connect('postits.db')
        default_check = c.execute('''select * from postit_data where pi_title = 'default' ''').fetchall()
        if len(default_check) > 0:
            return False

#opens default data set
def open_default():
    if check_default() == False:
        with open('default_csv.txt','r') as fp:
            return fp.read()
    else:
        pass

#pulls requested set from UI and stores data as text file to pull via pandas for display
def return_set(set_name):
    with sqlite3.connect('postits.db') as conn: 
        c = conn.cursor()
        rows = c.execute(f'''select pi_text from postit_data where pi_title = "{set_name}"''').fetchall()[0][0]
        if set_name == 'default':
            return postit_parser.parse_post_its('default_csv.txt')
        else:
            with open('csv_temp.txt', 'w') as fp:
                fp.write(rows)
            return postit_parser.parse_post_its('csv_temp.txt')

#returns all titles to display on UI in collections menu
def query_titles():
    with sqlite3.connect('postits.db') as conn: 
        c = conn.cursor()
        rows = c.execute('''select pi_title from postit_data''').fetchall()
        return rows       

#takes posted data in upload page and stores it in database
def store_file(posted_title, posted_text):
    with sqlite3.connect('postits.db') as conn: 
        c = conn.cursor()
        ds = datetime.date.today()
        pi_title = posted_title
        pi_text = posted_text
        c.execute(
            '''INSERT INTO postit_data (ds, pi_title, pi_text) VALUES (?,?,?)''', (ds, pi_title, pi_text))
        conn.commit()

#deletes all entries not titled 'default'
def delete_entries():
    with sqlite3.connect('postits.db') as conn: 
        c = conn.cursor()
        c.execute(
            '''DELETE from postit_data where pi_title != "default" '''
        )
        conn.commit()