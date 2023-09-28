import moment from 'moment'

export const formatDate = (n?: Date): string => moment(n).format("Do MMMM  YYYY");

export const isDatePassed = (n?: Date): boolean => moment(n).isBefore(moment());