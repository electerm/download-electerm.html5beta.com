#!/bin/bash
cd `dirname $0`
gunicorn -b 127.0.0.1:8030 src-python.main:app
