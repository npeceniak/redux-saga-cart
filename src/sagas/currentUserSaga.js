import { delay } from 'redux-saga';

export function* currentUserSaga() {
    let scopeTest = 0;
    while(true){
        yield delay(1000);
        console.log("User Saga Loop.");
        scopeTest++;
        console.log(scopeTest);
    }

};