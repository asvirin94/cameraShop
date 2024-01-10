import dayjs from 'dayjs';

dayjs.locale('ru');

export const makeMachineDate = (date: string) => dayjs(date).format('YYYY-MM-DD');
export const makeHumanDate = (date: string) => dayjs(date).format('DD MMMM');
