/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { IIndexPattern } from '../../../../../src/plugins/data/common/index_patterns';
import {
  EmbeddableInput,
  EmbeddableOutput,
  SavedObjectEmbeddableInput,
} from '../../../../../src/plugins/embeddable/public';
import { RefreshInterval } from '../../../../../src/plugins/data/common';
import { MapCenterAndZoom } from '../../common/descriptor_types';
import { MapSavedObjectAttributes } from '../../common/map_saved_object_type';

export interface MapEmbeddableConfig {
  editable: boolean;
}

interface MapEmbeddableState {
  refreshConfig?: RefreshInterval;
  isLayerTOCOpen?: boolean;
  openTOCDetails?: string[];
  disableTooltipControl?: boolean;
  disableInteractive?: boolean;
  hideToolbarOverlay?: boolean;
  hideLayerControl?: boolean;
  hideViewControl?: boolean;
  mapCenter?: MapCenterAndZoom;
  hiddenLayers?: string[];
  hideFilterActions?: boolean;
}
export type MapByValueInput = {
  attributes: MapSavedObjectAttributes;
} & EmbeddableInput &
  MapEmbeddableState;
export type MapByReferenceInput = SavedObjectEmbeddableInput & MapEmbeddableState;
export type MapEmbeddableInput = MapByValueInput | MapByReferenceInput;

export type MapEmbeddableOutput = EmbeddableOutput & {
  indexPatterns: IIndexPattern[];
};
