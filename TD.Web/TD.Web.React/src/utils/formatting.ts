import moment from 'moment';

export const formatDate = (n?: Date): string =>
   n && moment(n).isValid() ? moment(n).format('Do MMMM  YYYY') : '';

export const isDatePassed = (n?: Date): boolean => moment(n).isBefore(moment(), 'day');

export const stringToDate = (n?: string): Date => moment(n).toDate();
