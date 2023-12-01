export enum STATUS_ACTIONS {
    POST_LOADING = 'posts-loading',
    POST_SUCCESS = 'posts-success',
    POST_FAILURE = 'posts-failure',
    RESET_STATUS = 'reset-status'
}

export const loadingAction = () => {
    return {
        type: STATUS_ACTIONS.POST_LOADING,
    }
}

export const successAction = () => {
    console.log('dispatching success')
    return {
        type: STATUS_ACTIONS.POST_SUCCESS,
    }
}

export const failureAction = (errorMessage?: string) => {
    console.log('dispatching error')
    return {
        type: STATUS_ACTIONS.POST_FAILURE,
        payload: errorMessage
    }
}

export const resetStatus = () => {
    return {
        type: STATUS_ACTIONS.RESET_STATUS
    }
}