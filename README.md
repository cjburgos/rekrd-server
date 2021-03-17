# Rekrd Server App

Rekrd Server App processes user's requests to store and manage documents on the cloud. Support for AWS is currently in development. The application also uses a (test) MongoDB database for data storage, but the goal is to expand functionality to leverage cloud-based (data) services. 

Feel free to contact me for more information or if interested in collaborating. 

## To run the environment:

### Build images:
```
docker-compose build
```

### Run the environment:
```
docker-compose up
```

### Shutdown the environment:
```
docker-compose down
```

## To run the app manually:

### Install packages:
```
npm install
```

### Start the application:
```
npm run start
```
