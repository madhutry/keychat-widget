chatserverip=`docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' chat-server`
#docker exec frieze-chat-widget sed -i -e 's#proxy.*6060\;#proxy_pass http://'$chatserverip':60/projects/bitbucketprojects/FriezeChat/frieze-web-chorus/config.json60;#g' -e 's#proxy.*6060/ws\;#proxy_pass http://'$chatserverip:6060'/ws;#g' /etc/nginx/conf.d/default.conf 
#docker exec frieze-chat-widget cat /etc/nginx/conf.d/default.conf 
#docker restart frieze-chat-widget
sed -e s#IP_ADD_CHATSERVER#$chatserverip#g default.conf.tmpl > default.conf





