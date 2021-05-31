## Cerberus
___
Cerberus is a pytube/flask based youtube to mp3 converter.

###Installation

___
We can start with cloning the repo with the following command: <br/>
```$ https://github.com/xjakesl/Cerberus.git ```

Next navigate to the application folder and run <br/>
```sudo bash install.sh```<br/>
This will install all the packages including apache2. 
Once that is done you will have to move the files to ``/var/www/{appname}``.
Then navigate to ``$cd /var/www/{appname}`` and run the following commands: <br/>
```
   $sed -i "s/--uid 33/--uid {uid}/g" worker.sh 
   $sed -i "s/--uid 33/--uid {uid}/g" beat.sh
   $sed -i "s/0, '\/var\/www\/ytd'/0, '{dir}'/g" ytd.wsgi
```
 Replace {uid} with the output of ``$id -u www-data`` and {dir} with the exact directory of the app (``/var/www/{appname}``)
 <br/>
 In the next step you will have to set up a redis server and provide ip and port in ```config.py```.
 You can use [this](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-18-04#:~:text=In%20order%20to%20get%20the,sudo%20apt%20install%20redis%2Dserver) tutorial to achieve that.
While at it also set up Flask secret key and provide an absolute Path to the application folder.

Now you will have to set up apache! Navigate to ``/etc/apache2/sites-available/`` and create a new config ``{appname}.conf``.
<br/>You can use this config for it:
```
<VirtualHost *:80>
    # Adjust server name for your configuration
    ServerName www.{appname}.com 

    WSGIDaemonProcess ytd user=www-data group=www-data threads=5
    # Adjust path for your configuration
    WSGIScriptAlias / /var/www/ytd/ytd.wsgi 
    
    # Adjust path for your configuration
    <Directory /var/www/ytd>    
        Order allow,deny
        Allow from all
    </Directory>
</VirtualHost>
```
**Make sure to adjust paths and server name!**

Now only thing that is lef to do is enable apache wsgi mod, new config, start worker/beat and we are done.

```
$a2enmod wsgi
$a2ensite {config_name}.conf
$pm2 start /path/to/app/worker.sh --name worker
$pm2 start /path/to/app/beat.sh --name beat
$pm2 startup
$systemctl restart apache2.service
$systemctl enable apache2.service
```

**Attention!**<br/>  In the current release of pytube there is a small bug that renders the app useless.
To fix this issue you will have to find where pytube is installed (``/usr/local/lib/python3.8/dist-packages/pytube``) 
and modify extract.py as specified [here](https://github.com/pytube/pytube/commit/79985cde70fe78a15c36ca6c732ed4558a6902ec).
