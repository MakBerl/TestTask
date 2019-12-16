
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
1. Зайти под пользователем ```postgres```:
   ```
   sudo -i -u postgres
   ```
2. Перейти в папку со скриптом:
   ``` 
   cd /home/username/ScriptFolder
   ```
3. Запустить скрипт:
   ``` 
   node BackEnd.js
   ```

**Работа со скриптом**
- ```GET```-запрос на ```localhost:3000/users/``` возвращает список пользователей с их счетом

- ```POST```-запрос с json файлом типа ```{ "username":"user"}``` на ```localhost:3000/users/``` возвращает json файл с именем пользователя и его балансом типа ```{ "username":"user", "amount":12343 }``` 

- ```PUT```-запрос с json файлом типа ```{ "username":"user", "amount":123 }``` на ```localhost:3000/users/``` увеличивает/уменьшает баланс пользователя ``"user"`` в зависимости от ``"amount"```

- ```PUT```-запрос с json файлом типа ```{ "username":"user", "amount":123 }``` на ```localhost:3000/users/add``` создает пользователя     ```"user"``` с балансом, который равен ```"amount"```

- ```DELETE```-запрос json файлом типа ```{ "username":"user"}``` на ```localhost:3000/users/``` удаляет пользователя ```"user"```
