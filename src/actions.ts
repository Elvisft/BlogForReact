
export const SignA = (type: string, data: string) => {

    return {
        type: 'Sign',
        isSign: type,
        data: data
    };
};