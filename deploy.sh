#!/bin/bash

export PORT=8000

mix deps.get
(cd assets && npm install --save react react-dom)
(cd assets && npm install --save-dev babel-preset-react babel-preset-env)
(cd assets && npm install --save babel-plugin-syntax-jsx)
mix release --env=prod

./_build/prod/rel/battleship/bin/battleship stop || true


./_build/prod/rel/battleship/bin/battleship start
