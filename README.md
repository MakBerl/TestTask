
## Настройка и запуск BackEnd'а (на Linux'e)
**Требуемое ПО для запуска:**
- NodeJS
```
sudo apt-get install nodejs
```
- PostgreSQL:
  1. Скачать архив с сайта [PostgreSQL](https://www.postgresql.org/ftp/source/v12.1/) и разархивировать его
  2. Перейти в папку c разархивированным архивом ``` cd /home/username/folder```
  3. Выполнить следующие команды:
  ```
  ./configure
  make
  su
  make install
  adduser postgres
  mkdir /usr/local/pgsql/data
  chown postgres /usr/local/pgsql/data
  su - postgres
  /usr/local/pgsql/bin/initdb -D /usr/local/pgsql/data
  /usr/local/pgsql/bin/postgres -D /usr/local/pgsql/data >logfile 2>&1 &
  /usr/local/pgsql/bin/createdb test
  /usr/local/pgsql/bin/psql test
  ```
  4. Войти в пользователя "postgress":
  ``` sudo -i -u postgres ```, где postgress-имя пользователя
  5. Создать базу данных:
  




**Требуемы модули NodeJS для запуска:**
- Express

- BodyParser
- PG
