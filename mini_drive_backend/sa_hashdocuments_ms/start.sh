docker-compose build
docker-compose run --rm md_hashdocuments_ms rails db:create
docker-compose run --rm md_hashdocuments_ms rails db:migrate
docker-compose up
