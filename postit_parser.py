import pandas as pd

#takes csv file generated from return_set() and converts in into JSON for use on UI
def parse_post_its(file):
    df = pd.read_csv(file)
    df_json = df.to_json(orient='records')
    return df_json


