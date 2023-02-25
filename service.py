import pandas as pd
from flask_sqlalchemy import SQLAlchemy
from pandas_datareader import data as pdr
import yfinance as yf
yf.pdr_override()  # temporary solution; yahoo changed something in its api

db = SQLAlchemy()
conn = db.create_engine('mysql+pymysql://root:sql8x8@127.0.0.1:3306/stockchart?charset=utf8')

def getdata(ticker,startdate,enddate):
    df = pdr.get_data_yahoo(ticker,startdate,enddate)
    if len(df)>0:
        df.reset_index(inplace=True)
        df.rename(columns={'Date':'PriceDate'},inplace=True)
        df = df.where(df.notnull(), None)[['PriceDate','Open','Close','Low','High','Adj Close','Volume']]
        df['DownUp'] = df.apply(lambda x: 1 if x['Open'] > x['Close'] else -1, axis=1)
        df['PriceDate'] = df['PriceDate'].dt.strftime('%Y-%m-%d')
    return df

def gettickers(type):
    sql = 'select distinct Ticker from Stocks order by Ticker' \
        if type == 's' else \
        'select distinct Ticker from Indices order by Ticker' \
        if type == 'i' else \
        'select distinct Ticker from MutualFunds order by Ticker' \
        if type == 'f' else \
        'select distinct Ticker from ETFs order by Ticker' \
        if type == 'e' else \
        'select distinct Ticker from Futures order by Ticker' \
        if type == 't' else \
        'select distinct Ticker from Currencies order by Ticker'
    print(sql)
    df = pd.read_sql(db.text(sql),conn.connect()).dropna()
    result = df['Ticker'].tolist()
    return result