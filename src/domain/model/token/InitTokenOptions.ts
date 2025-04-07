import { CurveType } from '@heliofi/launchpad-common';
import { Moonit } from '../moonit';

export interface InitTokenOptions {
  mintAddress: string;
  moonit: Moonit;
  curveType?: CurveType;
}
