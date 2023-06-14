## About
The backend for the CQA Application was designed using NodeJS, Express, and MySQL. The APIs are present in the folder `controllers` and the SQL files are present in `db` 

### Initialising
1. Download the relevant XML files 
2. Run `init.sql` to create the schema and `data.sql` to populate the tables 
3. Install the required modules using `npm install`
4. Add a .env file in the backend folder with the field `MYSQL_PASSWORD=<password>`
5. Start the backend using `node index.js`

### More info
- For details on the various APIs used, check `controllers/api.txt`
    - APIs that have been implemented are flagged '(DONE)', and tested APIs are flagged '(TESTED USING CURL)'
- For details on routes and API usage, check `routes/index.js`

