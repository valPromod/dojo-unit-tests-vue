#!/bin/sh

#ROOT_DIR=/usr/share/nginx/html
# usr/share/nginx/html/js/app.d0f056db.js

fileEnv=./.env
fileList=usr/share/nginx/html/
cat $fileEnv
key=0 ; cat $fileEnv  | while read line ; do \
 echo "${line%%=*}"
 key="${line%%=*}"

echo "Replacing env constants in JS"
  for file in  `grep -rl "$key" $fileList`
  do
    echo "Processing $file ...";
    echo "search = $key"
    key2=`eval echo '$'${key}`
#    echo "replace to $value"

    cmd1="sed -i 's|%{${key}}|${key2}|g' $file"
    eval $cmd1
  done
done

echo "Starting Nginx"
nginx -g 'daemon off;'
