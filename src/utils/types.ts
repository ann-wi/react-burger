export type TIngredient = {
  _id: string;
  id?: string;
  name: string;
  type: string;
  price: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  image: string;
  image_large: string;
  image_mobile: string;
  uuid: string;
  counter: number;
};

export type IBurgerComponent = {
  ingredients: IIngredient[];
};

export type TOrder = {
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
};

export interface IIngredient {
  ingredient: TIngredient;
}

export type TOrders = {
  orders: TOrder[];
};

export interface IOrderNumber {
  number: string | undefined;
}

export type TGetUser = {
  name: string;
  email: string;
  password: string;
};

export type TLogin = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    name: string;
    email: string;
  };
};

export type TResetPassword = {
  password: string;
  code: string;
};

export type TUpdateAccessToken = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type TLoginUser = {
  email: string;
  password: string;
};

export type TUser = {
  name: string;
  email: string;
};

export type TFetchWithRefresh = {
  response: (data: TGetUser) => Promise<any>;
  data: TGetUser | null;
};
