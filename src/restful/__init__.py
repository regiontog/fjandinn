from dsrw import App, Request

app = App()
api = app.ns('/api')


@app.get('/hello')
def hello(req: Request):
    return {'msg': "Hello world!"}


@app.get('/hello/:name')
def other(req: Request):
    return {'msg': 'Hello',
            'name': req.param.name}


@api.get('/login')
def login(req: Request):
    return "Logged in"
