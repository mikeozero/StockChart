from flask import Flask, render_template, jsonify, request
import service
from datetime import date
import talib
from dateutil.relativedelta import relativedelta

app = Flask(__name__)


@app.route('/')
def main():
    return render_template('main.html')

@app.route('/stockchart', methods=['GET','POST'])
def stockchart():
    type = request.form.get('type') if request.form.get('type') else 's'
    ticker = request.form.get('ticker') if request.form.get('ticker') else 'TSLA'
    enddate = request.form.get('enddate') if request.form.get('enddate') else date.today()
    startdate = request.form.get('startdate') if request.form.get('startdate') else date.today()-relativedelta(years=4)
    rsiperiod = request.form.get('rsiperiod') if request.form.get('rsiperiod') else 14
    bbperiod = request.form.get('bbperiod') if request.form.get('bbperiod') else 20
    bbindex = request.form.get('bbindex') if request.form.get('bbindex') else 2
    tickerlist = service.gettickers(type)
    return render_template('stockchart.html', type=type, tickerlist=tickerlist, ticker=ticker, enddate=enddate, startdate=startdate, rsiperiod=rsiperiod, bbperiod=bbperiod, bbindex=bbindex)

@app.route('/dashboard', methods=['GET','POST'])
def dashboard():
    return render_template('dashboard.html')

@app.route('/getdata',methods=['GET','POST'])
def getdata():
    ticker = request.values.get('ticker') if request.values.get('ticker') else 'TSLA'
    enddate = request.values.get('enddate') if request.values.get('enddate') else date.today()
    startdate = request.values.get('startdate') if request.values.get('startdate') else date.today()-relativedelta(years=4)
    rsiperiod = int(request.values.get('rsiperiod')) if request.values.get('rsiperiod') else 14
    bbperiod = int(request.values.get('bbperiod')) if request.values.get('bbperiod') else 20
    bbindex = int(request.values.get('bbindex')) if request.values.get('bbindex') else 2

    df = service.getdata(ticker,startdate,enddate)
    volumes = []
    rsidata = []
    if len(df)>0:
        df['RSI'] = talib.RSI(df['Adj Close'], timeperiod=rsiperiod)
        df['BBub'], df['BBmb'], df['BBlb'] = talib.BBANDS(df['Adj Close'],timeperiod=bbperiod,nbdevup=bbindex, nbdevdn=bbindex, matype=0)
        df['BBdiff'] = df['BBub'] - df['BBlb']
        df = df.round({'Open':3,'Close':3,'Low':3,'High':3,'Adj Close':3,'RSI': 3,'BBub': 3, 'BBmb': 3,'BBlb': 3,'BBdiff': 3})  #  first round then convert None, str can not round
        df = df.astype(object).where(df.notnull(), None)
        for i in range(len(df)):
            row = df.iloc[i]
            rsidata.append([i, row.RSI])
            volumes.append([i, row.Volume, int(row.DownUp)])
    return jsonify({'categoryData':df['PriceDate'].tolist(),'values':df[['Open','Close','Low','High','Volume']].values.tolist(),'volumes':volumes,'RSI':rsidata,'BBub':df['BBub'].tolist(),'BBmb':df['BBmb'].tolist(),'BBlb':df['BBlb'].tolist(),'BBdiff':df['BBdiff'].tolist()}) if (len(df)>0) else jsonify(None)

@app.route('/gettickerlist',methods=['GET','POST'])
def gettickerlist():
    type = request.values.get('type')
    result = service.gettickers(type)
    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5555')
