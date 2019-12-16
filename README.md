
## Настройка и запуск BackEnd'а (на дистрибутивах Linux'a, основанных на Debian)


### Требуемое ПО для запуска
- **NodeJS**:
  ```sh
  $ sudo apt-get install nodejs
  ```
- **NPM**:
  ```sh
  $ sudo apt-get install npm
  ```
- **PostgreSQL** (Скрипт, в первоначальном состоянии, использует БД ```testdb``` и таблицу ```testtable``` ):
  1. Скачать архив с сайта [PostgreSQL](https://www.postgresql.org/ftp/source/v12.1/) и разархивировать его
  2. Перейти в папку c разархивированным архивом 
     ```
     $ cd /home/username/folder
     ```
  3. Выполнить следующие команды для установки PostgreSQL и создания пользователя postgres ([Взято с этого сайта](https://postgrespro.ru/docs/postgresql/12/installation)):
     ```sh
     $ ./configure
     $ make
     $ sudo make install
     $ adduser postgres
     $ mkdir /usr/local/pgsql/data
     $ chown postgres /usr/local/pgsql/data
     ```
  4. Войти в пользователя "postgres":
     ```sh 
     $ sudo -i -u postgres 
     ``` 
     где postgres - имя пользователя
  5. Создать базу данных:
     ```sh
     $ createdb testdb
     ```
     где testdb - имя БД
  6. Подключиться к БД:
     ```sh
     $ psql testdb
     ```
  7. Создать таблицу:
     ```sh 
     $ CREATE TABLE testtable (
     username       varchar(80),
     amount         money          
     );
     ```
  где ```testtable``` - имя таблицы, ```username``` и ```amount``` - её поля
  
### Требуемы модули NodeJS для запуска
- **Express**:
    ```sh
    $ npm install express
    ```
- **BodyParser**:
    ```sh
    $ npm install body-parser
    ```
- **PG**:
    ```sh
    $ npm install pg
    ```
### Запуск BackEnd'а
1. Зайти под пользователем ```postgres```:
   ```sh
   $ sudo -i -u postgres
   ```
2. Перейти в папку со скриптом:
   ```sh 
   $ cd /home/username/ScriptFolder
   ```
3. Запустить скрипт:
   ```sh 
   $ node BackEnd.js
   ```

### Работа со скриптом
- ```GET```-запрос на ```localhost:3000/users/``` возвращает список пользователей с их счетом

- ```POST```-запрос с json-файлом типа ```{ "username":"user"}``` на ```localhost:3000/users/``` возвращает json-файл с именем пользователя и его балансом типа ```{ "username":"user", "amount":12343 }``` 

- ```PUT```-запрос с json-файлом типа ```{ "username":"user", "amount":123 }``` на ```localhost:3000/users/``` увеличивает/уменьшает баланс пользователя ``"user"`` в зависимости от ``"amount"```

- ```PUT```-запрос с json-файлом типа ```{ "username":"user", "amount":123 }``` на ```localhost:3000/users/add``` создает пользователя     ```"user"``` с балансом, который равен ```"amount"```

- ```DELETE```-запрос json-файлом типа ```{ "username":"user"}``` на ```localhost:3000/users/``` удаляет пользователя ```"user"```
