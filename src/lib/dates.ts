import dayjs, { Dayjs } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

// Configure dayjs plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

type TimeZoneType = 'UTC' | 'TZ';

class DateJS {
  private readonly timeZone: string;
  private readonly date: string;
  private readonly parseTo: TimeZoneType;

  constructor(date: string, parseTo: TimeZoneType = 'TZ') {
    this.timeZone = dayjs.tz.guess();
    this.date = date;
    this.parseTo = parseTo;
  }

  private toTimeZone(): Dayjs {
    return dayjs.utc(this.date).tz(this.timeZone);
  }

  private toUTC(): Dayjs {
    return dayjs(this.date, this.timeZone).utc();
  }

  private convertDate(): Dayjs {
    return this.parseTo === 'UTC' ? this.toUTC() : this.toTimeZone();
  }

  public forDateInput(): string {
    return this.convertDate().format('YYYY-MM-DD HH:mm:ss');
  }

  public hoursOnly(): string {
    return this.convertDate().format('HH:mm A');
  }

  public timeTag(): string {
    return this.convertDate().format('YYYY-MM-DDTHH:mm');
  }

  // Static factory method
  public static create(date: string, parseTo: TimeZoneType = 'TZ'): DateJS {
    return new DateJS(date, parseTo);
  }
}

// Export the factory function
export const createDateJS = DateJS.create;

// Usage example:
// createDateJS('2024-01-01').forDateInput()
// createDateJS('2024-01-01', 'UTC').hoursOnly()
