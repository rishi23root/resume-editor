// json template

type BasicsT = {
  name: string;
  label: string;
  phone: string;
  image:string;
  email: string;
  url: string;
  summary: string;
  location: {
    address: string;
    postalCode: string;
    city: string;
    countryCode: string;
    region: string;
  };
  profiles: {
    network: string;
    username: string;
    url: string;
  }[];
};


// export type Inputs = BasicT;
export type Inputs = {
  basics:BasicsT
};
