


## Install


```bash
docker-compose up -d --build
```


### Run migration

```bash
docker exec laravel_app_php php artisan migrate
```


```bash
docker exec laravel_app_php php artisan db:seed
```


Then visit: http://localhost:8000