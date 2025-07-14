import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excelDatePipe'
})
export class ExcelDatePipePipe implements PipeTransform {

  transform(serial: number | string | null | undefined): string | null {
    if (serial === null || serial === undefined) {
      return null;
    }

    let serialNumber: number;

    if (typeof serial === 'string') {
      const date = new Date(serial);
      if (isNaN(date.getTime())) {
        return null; // invalid date string
      }
      serialNumber = ExcelDatePipePipe.dateToSerial(date);
    } else if (typeof serial === 'number') {
      serialNumber = serial;
    } else {
      return null;
    }

    const excelStartDate = new Date(1899, 11, 30);
    excelStartDate.setDate(excelStartDate.getDate() + serialNumber);

    const day = ExcelDatePipePipe.formatNumber(excelStartDate.getDate());
    const month = ExcelDatePipePipe.getMonthName(excelStartDate.getMonth());
    const year = excelStartDate.getFullYear();

    return `${day}-${month}-${year}`;
  }

  private static formatNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  private static getMonthName(monthIndex: number): string {
    const months: readonly string[] = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return months[monthIndex] ?? '';
  }

  private static dateToSerial(date: Date): number {
    const excelStartDate = new Date(1899, 11, 30);
    const diffInTime = date.getTime() - excelStartDate.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    return Math.floor(diffInDays);
  }

}
