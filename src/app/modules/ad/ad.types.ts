export interface Ad {
  _id: string;
  uid: any;
  title?: string;
  description?: string;
  price: number;
  type: 'new' | 'used';
  brand: string;
  model: string;
  version?: string;
  category: string;
  mileage: number;
  first_registration: {
    month?: number;
    year: number;
  };
  fuel_type: string;
  seats?: number;
  color?: string;
  crit_air?: string;
  horsepower?: number;
  power_kw?: number;
  region?: string;
  autonomy_wltp_km?: number;
  equipments: {
    safety: {
      type: string[];
      default: [];
    };
    outdoor: {
      type: string[];
      default: [];
    };
    indoor: {
      type: string[];
      default: [];
    };
    functional: {
      type: string[];
      default: [];
    };
  };
  options_vehicule: {
    non_smoker?: boolean;
    first_hand?: boolean;
    manufacturer_warranty?: boolean;
    others?: string[];
  };
  courant: {
    AC?: string;
    DC?: string;
  };
  photos: string[];
  interior_video?: string;
  exterior_video?: string;
  address?: string;
  phone_number?: string;
  mask_phone: boolean;
  active: boolean;
  sold: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  views?: number;
  pro?: boolean;
}
export interface Settings {
  brands: [
    {
      _id: string;
      name: string;
      icon: string;
    }
  ];
  categories: [
    {
      _id: string;
      name_fr: string;
      icon: string;
    }
  ];
  colors: [
    {
      _id: string;
      name_fr: string;
    }
  ];
  energies: [
    {
      _id: string;
      name_fr: string;
    }
  ];
  models: [
    {
      _id: string;
      name: string;
      brandId: string;
    }
  ];
  regions: [
    {
      _id: string;
      name_fr: string;
    }
  ];
}
