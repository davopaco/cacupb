import TimeInterface from "./types/TimeInterface";

export default class Time {
  constructor(private time: string) {}

  public getTime(): TimeInterface {
    const time = this.time.split(":");
    return {
      hours: parseInt(time[0]),
      minutes: parseInt(time[1]),
      seconds: parseInt(time[2]),
    };
  }

  public toString(): string {
    return this.time;
  }
}
