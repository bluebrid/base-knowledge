/*
3.小贤是一条可爱的小狗(Dog)，它的叫声很好听(wow)，
每次看到主人的时候就会乖乖叫一声(yelp)。从这段描述可以得到以下对象
 */
function Dog(name) {
    this.name = name;
    // this.wow = function() {
    //     console.log(`i am ${this.name},wow wow.`);
    // }
    // this.yelp = function() {
    //     console.log(`Master,i am hunger,i want bone.`);
    // }
}
Dog.prototype.wow=function(){
     console.log(`i am ${this.name},wow wow.`);
}
Dog.prototype.yelp=function(){
    console.log(`Master,i am hunger,i want bone.`);
}
/*
小芒和小贤一样，原来也是一条可爱的小狗，可是突然有一天疯了(MadDog)，
一看到人就会每隔半秒叫一声(wow)地不停叫唤(yelp)。
请根据描述，按示例的形式用代码来实。（继承，原型，setInterval）
 */
function MadDog(name) {
    Dog.call(this, name);
}
MadDog.prototype = Object.create(Dog.prototype);
MadDog.prototype.constructor = Dog;

MadDog.prototype.crazyWow = function() {
    setInterval(function() {
        console.log('i am mad dog ,so i wow always')
    }, 500)

}
var xiaomang = new MadDog('小忙');
xiaomang.wow();
xiaomang.yelp();
xiaomang.crazyWow();
var xiaoxian = new Dog("小闲");
xiaoxian.wow();
// xiaoxian.crazyWow();
