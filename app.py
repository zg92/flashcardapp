from flask import Flask, render_template, request, redirect
import json
import postit_parser
import pandas as pd
import create_table
import pdb

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def home():
    #creates db/table if none exists.
    create_table.create_table()

    #checks if default data load (state capitols) is in table. If not, default data set is loaded.
    if create_table.check_default() != False:
        create_table.store_file('default', create_table.open_default())

    #stores all titles of all uploaded Post It sets to display in the main app.
    all_sets = [titles[0] for titles in create_table.query_titles()]

    #use get request to pull the requested Post It set title and returns results for use in UI. 
    if request.args.get('active') == 'True':
        postit_set = request.args.get('set')
        pi = create_table.return_set(postit_set)
    else:
        pi = create_table.return_set('default')

    #deletes collections if selected via collections menu.
    if request.method == 'POST':
        if request.form['delete'] == 'Delete All':
            create_table.delete_entries()
            return redirect('/')

    return render_template('index.html', post_its=json.dumps(pi), all_sets=all_sets)

    
@app.route('/upload', methods=['GET', 'POST'])
def upload():
    #grabs entered upload data and then storing in db.
    if request.method == 'POST':
        posted_title = request.form['title']
        posted_text = request.form['text']
        create_table.store_file(posted_title, posted_text)
        return redirect(f'/?active=True&set={posted_title}')
    return render_template('upload.html')


app.run(debug=True)
