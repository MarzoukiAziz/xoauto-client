import { Model } from 'src/app/modules/new/new.types';

export const formatModelToPreview = (model: Model) => {
  const versions = model.versions;
  const min_price = Math.min(...versions.map((version) => version.price));
  const top_acceleration = Math.max(
    ...versions.map(
      (version) => version.technical_sheet.performance['0-100 Km/h'] || 0
    )
  );

  const top_autonomy = Math.max(
    ...versions.map((version) => version.autonomy_wltp_km || 0)
  );
  const top_speed = Math.max(
    ...versions.map(
      (version) => version.technical_sheet.performance['Vitesse maxi'] || 0
    )
  );

  const is_promo = model.versions.some((version) => version.promo === true);
  const is_new = model.versions.some((version) => version.new === true);

  // Construct the Model object
  const newModel: Model = {
    brand: model.brand,
    modele: model.modele,
    min_price,
    top_acceleration: top_acceleration > 0 ? top_acceleration + 's' : 'NaN',
    top_autonomy: top_autonomy > 0 ? top_autonomy + 'km' : 'NaN',
    top_speed: top_speed > 0 ? top_speed + 'km' : 'NaN',
    versions,
    new: is_new,
    promo: is_promo,
    preview: versions[0].preview,
  };

  return newModel;
};
