export interface UserData {
    [key: string]: {
      id?:string
      mail: string;
      name: string;
      disabled: boolean;
      roles: string[];
    };
  }