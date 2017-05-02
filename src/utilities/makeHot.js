import { Observable } from '../Observable';
import { Subject } from '../Subject';

export const makeHot = (cold) => {
  const subject = new Subject();
  const mainSub = cold.subscribe(subject);
  let refs = 0;
  
  return new Observable((observer) => {
    refs++;
    let sub = subject.subscribe(observer);
    
    return () => {
      refs--;
      if (refs === 0) mainSub.unsubscribe();
      sub.unsubscribe();
    };
  });
};

Observable.prototype.makeHot = function () {
  return makeHot(this);
};
