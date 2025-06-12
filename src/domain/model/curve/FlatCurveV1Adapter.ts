import { FlatCurveV1 } from '@heliofi/launchpad-common';
import { BaseFlatCurveAdapter } from './BaseFlatCurveV1Adapter';

export class FlatCurveV1Adapter extends BaseFlatCurveAdapter<FlatCurveV1> {
  protected createCurve(collateralCollected: bigint): FlatCurveV1 {
    return new FlatCurveV1(collateralCollected);
  }
}
