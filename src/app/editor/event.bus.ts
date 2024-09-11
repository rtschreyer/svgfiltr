
export interface Observer {
    notify(data: any): any;
}


interface Subject {
    registerObserver(eventType:string, obs:Observer): any;
    unregisterObserver(eventType:string, obs:Observer): any;
    notifyObservers(eventType:string, data:any): any;
}

class EventBus implements Subject {

    private observers: {[key:string]: Observer[]} = {};

    registerObserver(eventType:string, obs:Observer){
        this.observersPerEventType(eventType).push(obs);
    }
    unregisterObserver(eventType:string, obs:Observer){
        let o = this.observersPerEventType(eventType).indexOf(obs);
        this.observersPerEventType(eventType).splice(o,1);
    }
    notifyObservers(eventType:string, data:any){
        this.observersPerEventType(eventType).forEach(obs => obs.notify(data));
    }

    private observersPerEventType(eventType:string):Observer[]{
        const observersPerType = this.observers[eventType];
        if (!observersPerType){
            this.observers[eventType] = [];
        }
        return this.observers[eventType];
    }
}

export const globalEventBus = new EventBus();