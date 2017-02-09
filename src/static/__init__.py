import mimetypes, os

class StaticMiddleware:
    def __init__(self, app, exports):
        self.app = app
        self.exports = exports

    def __call__(self, env, start_response):
        req_path = env['SCRIPT_NAME'] + env['PATH_INFO']

        for url_prefix in self.exports:
            if req_path.startswith(url_prefix):
                path = os.path.join(self.exports[url_prefix], req_path.lstrip('/'))

                if os.path.isfile(path):
                    filetype = mimetypes.guess_type(path, strict=True)[0]
                    if not filetype:
                        filetype = 'text/plain'

                    start_response("200 OK", [('Content-type', filetype)])
                    return env['wsgi.file_wrapper'](open(path, 'rb'), 4096)

        return self.app(env, start_response)


def middleware(app, exports):
    return StaticMiddleware(app, exports)