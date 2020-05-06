const handler = {
    set: function (target, prop, value) {
        const houses = ['Stark', 'Lannister'];
        if (prop === 'house' && !(houses.includes(value))) {
            throw new Error(`House ${value} does not belong to allowed ${houses}`)
        }
        target[prop] = value
    }
};

const gotCharacter = new Proxy({}, handler);

gotCharacter.name = "Jamie";
gotCharacter.house = "Lannister";

console.log(gotCharacter);

gotCharacter.name = "Oberyn";
gotCharacter.house = "Martell";