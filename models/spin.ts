import { BodyParts } from "./bodyParts.enum";
import { Colours } from "./colours.enum";

export interface ISpin {
  colour: Colours;
  bodyPart: BodyParts;
}

// TODO: create a SpinRecord class which implements ISpin and adds a new attribute num:number
export class SpinRecord implements ISpin {
num : number;
colour: Colours;
bodyPart: BodyParts;

constructor(_num, _colour, _bodypart){
  this.num =_num;
  this.bodyPart=_bodypart;
  this.colour=_colour;
}
}