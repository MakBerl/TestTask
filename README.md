
## Настройка и запуск BackEnd'а (на Linux'e)
**Требуемое ПО для запуска:**
- NodeJS:
  ```
  sudo apt-get install nodejs
  ```
- NPM:
  ```
  sudo apt-get install npm
  ```
- PostgreSQL:
  1. Скачать архив с сайта [PostgreSQL](https://www.postgresql.org/ftp/source/v12.1/) и разархивировать его
  2. Перейти в папку c разархивированным архивом ``` cd /home/username/folder```
  3. Выполнить следующие команды для установки PostgreSQL и создания пользователя postgress:
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
  ``` sudo -i -u postgres ```, где postgress - имя пользователя
  5. Создать базу данных:
  ```createdb testdb```, где testdb - имя БД
  6. Подключиться к БД:
  ```psql testdb```
  7. Создать таблицу:
  ``` 
  CREATE TABLE testtable (
  username       varchar(80),
  amount         money          
  );
  ```
  где ```testtable``` - имя таблицы, ```username``` и ```amount``` - ёё поля
  
**Требуемы модули NodeJS для запуска:**
- Express
    ```
    npm install express
    ```
- BodyParser
    ```
    npm install body-parser
    ```
- PG
    ```
    npm install pg
    ```
**Запуск BackEnd'а**
1. 
