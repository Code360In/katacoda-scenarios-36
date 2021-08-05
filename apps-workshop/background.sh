# Build the demo UI
cd $HOME/app/api-service/demo-ui
yarn install
yarn build

# Run the api service
cd $HOME/app/api-service
yarn install
node index.js