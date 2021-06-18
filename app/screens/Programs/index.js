import React from 'react';
import MobilePrograms from './index.mobile';
import TabletPrograms from './index.tablet';

import Renderer from 'app/components/Renderer';

export default function Programs(props) {
  return <Renderer Mobile={MobilePrograms} Tablet={TabletPrograms} />;
}
