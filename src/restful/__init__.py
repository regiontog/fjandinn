from dsrw import App, Request

app = App()
api = app.ns('/api')


@api.post('/login')
def login(req: Request):
    return req.body
