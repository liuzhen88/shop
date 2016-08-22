#!/bin/sh


echo "======  START SYNCING 206 SERVER ========="

ssh root@139.196.13.206<<EOF
ls
cd /usr/local/nginx/html/shop/staic/wapdev
ls

git status
git branch
git checkout master
git pull origin master

pwd



EOF


echo "======  END OF SYNCING 206 SERVER ========="