# Build the demo UI
cd $HOME/app/server/demo-ui
yarn install
yarn build

# Run the api service
cd $HOME/app/server
yarn install
node index.js