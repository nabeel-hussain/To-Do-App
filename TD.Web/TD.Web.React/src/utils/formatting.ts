import moment from 'moment';
import { isNull } from './utility';

export const formatDate = (n?: Date): string =>
   !isNull(n) && moment(n).isValid() ? moment(n).format('Do MMMM  YYYY') : '';

export const isDatePassed = (n?: Date): boolean => moment(n).isBefore(moment(), 'day');

export const stringToDate = (n?: string): Date => moment(n).toDate();

export const getCurrentDate = (): string => moment().format('YYYY-MM-DD');
