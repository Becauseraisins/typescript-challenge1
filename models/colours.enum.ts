export enum Colours {
  Red,
  Blue,
  Yellow,
  Green
}

//implement a ColoursHelper class as shown in Colours
export class ColoursHelper {

  static Colours: Colours[] = [
    Colours.Red,
    Colours.Blue,
    Colours.Yellow,
    Colours.Green
  ];

  constructor() {}

  static get(key: string): Colours {
    switch (key) {
      case "Blue":
        return Colours.Blue;
      case "Green":
          return Colours.Green;
      case "Red":
        return Colours.Red;
      case "Yellow":
        return Colours.Yellow;
    }
  }
}