// implementation of an observable pattern

class Observer {
  constructor() {
    this.observers = [];
  }

  subsctriber(func) {
    this.observers.push(func);
  }

  unsubscribe(func) {
    this.observers = this.observers.filter((ob) => ob !== func);
  }

  notify(data, thisObj) {
    this.observers.forEach((ob) => ob(data));
    // const scope = thisObj||window;
    // this.observers.forEach((item)=>{
    //     item.call(scope, data);
    // })
  }
}

const event1 = function(item){
    console.log("fired: "+ item);
}

const event2 = function(item){
    console.log("Moved: "+item);
}

const observer = new Observer();


observer.subsctriber(event1);
observer.notify("event #1");


observer.unsubscribe(event1);
observer.notify("event #2");

observer.subsctriber(event1);
observer.subsctriber(event2);

observer.notify("event #3");



//console.log(observer);

