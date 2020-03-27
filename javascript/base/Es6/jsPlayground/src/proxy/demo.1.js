//movie is a target
const movie = {
    name: "Pulp Fiction",
    director: "Quentin Tarantino"
};

//this is a handler
const handler = {
    //get is a trap
    get: (target, prop) => {
        if (prop === 'director') {
            return 'God'
        }
        return target[prop]
    },

    set: function (target, prop, value) {
        if (prop === 'actor') {
            target[prop] = 'John Travolta'
        } else {
            target[prop] = value
        }
    }
};

const movieProxy = new Proxy(movie, handler);

console.log(movieProxy.director); //God

movieProxy.actor = "Tim Roth";
movieProxy.actress = "Uma Thurman";

console.log(movieProxy.actor); //John Travolta
console.log(movieProxy.actress); //Uma Thurman