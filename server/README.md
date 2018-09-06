# hacktivgit

List of user routes:

Route | HTTP | Description | Success | Error
------------ | ------------- | ------------- | ------------- | -------------
/user/repos | GET | Get all repos | {data: [{.....}, ......., {.....}]} | {error: {error message}}
/user/stared | GET | Get all stared repos | {data: [{.....}, ......., {.....}]} | {error: {error message}}
/user/stared/?name={repo name} | POST | Get stared repos filter like name | {hasil: [{.....}, .... , {.....}]} | {error: {error message}}
/user/createRepo | POST | Create a repo | {data: {.....}} | {error: {error message}}
/user/:username | GET | Get all repos by username | {data: [{.....}, ......., {.....}]} | {error: {error message}}
/user/unstar | DELETE | Unstar a repo | {message: 'Repo {repo name} successfully unstar!'} | {error: {error message}}

List of user parameters:

Parameters | Type 
------------ | -------------
repo name | String
username | String

# Usage

With only npm:
```
npm install
npm start
npm run dev
```

Access the api via `http://localhost:3000/user` 