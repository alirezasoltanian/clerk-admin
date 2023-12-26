import { z } from "zod";

export interface UserInformation {
    name: string;
    accessToken: string | unknown;
    image: string
    email: string;
    username: string;
    
  }
  