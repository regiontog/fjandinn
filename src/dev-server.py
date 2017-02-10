#!/usr/bin/env python
import sys


def main():
    if len(sys.argv) <= 1:
        print("Please supply an action.")
        return

    cmd = sys.argv[1]
    if cmd not in globals():
        print(f"No action {cmd}")
        return

    fn = globals()[cmd]
    fn(*sys.argv[2:])


def run(*args):
    import os
    from wsgiref.simple_server import make_server
    from restful import app
    from static import middleware

    wrapper = middleware(app, {
        '/': os.path.abspath(
            os.path.join(os.path.dirname(__file__), '..', 'dist', 'static')
        )
    })

    httpd = make_server('', 8080, wrapper)
    print("Serving HTTP on port 8080...")

    # Respond to requests until process is killed
    httpd.serve_forever()


def package(outdir='.'):
    import os
    import shutil
    import tarfile
    import datetime

    destination = os.path.join('dist', 'restful')
    if os.path.isdir(destination):
        shutil.rmtree(destination)

    base = os.path.join('src', 'restful')
    base_len = len(base)
    for dirpath, dirnames, filenames in os.walk(base):
        for filename in filenames:
            if os.path.basename(filename).endswith('.py'):
                src = os.path.join(dirpath, filename)
                dst_dir = os.path.join(destination, dirpath[base_len:])

                if not os.path.exists(dst_dir):
                    os.mkdir(dst_dir)

                shutil.copy(src, os.path.join(dst_dir, filename))

    shutil.copy('requirements.txt', os.path.join('dist', 'requirements.txt'))

    now = datetime.datetime.now()
    base = now.strftime('fjandinn-%y-%m-%d_%H-%M')
    filename = base + '.tar.bz2'
    print(filename)
    with tarfile.open(os.path.join(outdir, filename), 'w:bz2') as tar:
        for elem in os.listdir('dist'):
            tar.add(os.path.join('dist', elem),
                    arcname=os.path.join(base, elem))


if __name__ == '__main__':
    main()
