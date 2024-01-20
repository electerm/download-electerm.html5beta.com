import os
from flask import Flask, request, redirect, Response
import requests
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__)

TARGET_URL = os.getenv('TARGET_URL', 'https://github.com')
PATH_START = os.getenv('PATH_START', '/electerm/electerm/releases/download/')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def proxy(path):
    if request.method == 'GET' and ('/' + path).startswith(PATH_START):
        # Make the request to TARGET_URL, do not automatically follow redirect
        response = requests.get(TARGET_URL + '/' + path, stream=True, allow_redirects=False, headers={'Accept-Encoding': 'identity'})

        # If the response is a redirect, follow the redirect and get the new response
        if response.status_code in (301, 302, 303, 307, 308):
            response = requests.get(response.headers['Location'], stream=True, headers={'Accept-Encoding': 'identity'})

        def generate():
            for chunk in response.iter_content(chunk_size=8192):
                yield chunk

        # Prepare the headers
        headers = dict(response.headers)
        one_year_in_seconds = 365 * 24 * 60 * 60
        cache_control = f'public, max-age={one_year_in_seconds}'
        headers['Cache-Control'] = cache_control
        headers['Expires'] = one_year_in_seconds

        # Return the proxied response
        return Response(generate(), headers=headers, status=response.status_code)
    else:
        return 'Not Found', 404


@app.route('/test')
def test():
    return 'ok'

if __name__ == "__main__":
    HOST = os.getenv('HOST', '127.0.0.1')
    PORT = int(os.getenv('PORT', 3000))
    
    app.run(host=HOST, port=PORT)
