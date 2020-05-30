import { createSecureContext } from "tls";

export class Gravity {
          private gravity_acc: number;          // g = 10 m/s^2; 1000 should be choosen
          private roll_coefficent: number;        // between 0.01 and 0.2
          private angle_threshold = 0.5;
          
          constructor(gravity_acc: number, roll_coefficient: number) {
                    this.gravity_acc = gravity_acc;
                    this.roll_coefficent = roll_coefficient;
          }

          public setRoll_coefficient(value: number)
          {
                    this.roll_coefficent = value;
          }

          private calcAcceleration(angle: number, current_velocity: number)
          {
                    let forward_acc = this.gravity_acc * Math.sin(Math.abs(angle)*Math.PI/180);
                    let roll_resistance_acc = this.gravity_acc * this.roll_coefficent * Math.cos(Math.abs(angle)*Math.PI/180);

                    // roll_resistance_acc zeigt immer entgegen der roll_geschwindigkeits_richtung NICHT entgegen der forward_acc!!!

                    if (angle < 0)
                    {
                              forward_acc *= -1;
                    }

                    if (current_velocity > 0)
                              roll_resistance_acc *= -1;

                    // if (current_velocity == 0)
                    //           roll_resistance_acc = 0;

                    if (current_velocity == 0)
                    {
                              if (Math.abs(forward_acc) < Math.abs(roll_resistance_acc))
                                        return 0;
                    }    

                    return forward_acc-roll_resistance_acc;
          }

          public calcVelocity(angle: number, current_velocity: number, delta_time: number)
          {
                    let current_acc = this.calcAcceleration(angle, current_velocity);
                    let delta_velocity = current_acc * delta_time;
                    let new_velocity = current_velocity + delta_velocity;

                    // if axis/angle is (almost) horizontal
                    if (Math.abs(angle) < this.angle_threshold)
                    {
                              // check if "umkehrpunkt"
                              if ((Math.sign(new_velocity) != Math.sign(current_velocity)) && Math.sign(current_velocity) != 0)
                              {
                                        new_velocity = 0;
                              }
                    }

                    return new_velocity;
          }

          public calcDeltaPosition(current_velocity: number, delta_time: number)
          {
                    return current_velocity * delta_time;
          }

          public calcNewPosition(current_position: number, current_velocity: number, delta_time: number)
          {
                    return current_position + this.calcDeltaPosition(current_velocity, delta_time);
          }
}
