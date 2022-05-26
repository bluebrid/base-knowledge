function singleton(name) {
    this.name = name;
    this.instance = null;
}
singleton.prototype.getName = function(){
    return this.name;
}
singleton.createInstance = function(name) {
    if(!this.instance) {
        this.instance = new singleton(name);
    }
    return this.instance;
}

var ins1 = singleton.createInstance('ivan');
var ins2 = singleton.createInstance('jack');
console.log(ins1 === ins2)