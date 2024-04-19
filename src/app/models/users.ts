export interface UserData {
    [key: string]: {
      mail: string;
      name: string;
      disabled: boolean;
      roles: string[];
    };
  }