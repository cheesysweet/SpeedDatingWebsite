/**
 * Class that will contain information regarding what is sent from the SOcket
 * @author Sven Englsperger Raswill
 */
export interface Message {
  name: string;
  message: string;
  stage: number;
  code: number;
}
