type MyLength<T extends any[]>  = T['length']
type teslaLengthDemo = MyLength<['tesla', 'model 3', 'model X', 'model Y']>  // expected 4
type spaceXLengthDemo = MyLength<['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']> // expected 5