export interface NewSettings {
  brands: Brand[];
  categories: [
    {
      _id: string;
      name_fr: string;
      icon: string;
    }
  ];
  energies: [
    {
      _id: string;
      name_fr: string;
    }
  ];
}

export interface Brand {
  name: string;
  icon: string;
}

export interface Model {
  brand: string;
  model: string;
  preview?: string;
  min_price?: number;
  top_acceleration?: string;
  top_autonomy?: string;
  top_speed?: string;
  new?: boolean;
  promo?: boolean;
  versions: Version[];
}

export interface Version {
  _id?: string;
  price: number;
  version: string;
  category: string;
  fuel_type: string;
  seats?: number;
  horsepower?: number;
  power_kw?: number;
  autonomy_wltp_km?: number;
  technical_sheet: TechnicalSheet;
  preview: string;
  photos: string[];
  promo?: boolean;
  new?: boolean;
}

export interface TechnicalSheet {
  features: { [key: string]: any };
  motor: { [key: string]: any };
  transmission: { [key: string]: any };
  dimensions: { [key: string]: any };
  performance: { [key: string]: any };
  consumption: { [key: string]: any };
  safety_equipment: { [key: string]: any };
  driving_aids: { [key: string]: any };
  outdoor_equipment: { [key: string]: any };
  multimedia: { [key: string]: any };
  indoor_equipment: { [key: string]: any };
  functional_equipment: { [key: string]: any };
}

export interface NewAdComment {
  _id: string;
  uid: string;
  user: any;
  adId: string;
  content: string;
  answerTo: string;
  createdAt?: Date;
  updatedAt?: Date;
  replies: NewAdComment[];
}
