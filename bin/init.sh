#!/bin/bash
cd `dirname $0`
cd ..
pip3 install virtualenv
virtualenv venv --python=python3
source ./venv/bin/activate
pip3 install python-dotenv flask requests gunicorn