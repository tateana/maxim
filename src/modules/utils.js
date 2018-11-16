import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/index';

export const epicErrorHandler = catchError(err => {
    console.log(err)
    return of({ type: 'APP_ERROR', payload: err.message })
})