import { UserDTO } from './UserDTO';

export interface LoginResponseDTO {
  accessToken: string;
  expiresIn: number;
  userDTO: UserDTO;
}
