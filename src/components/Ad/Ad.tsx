import { FC } from 'react';

import { AdWrapper, AdImg } from './Ad.styles';
import ad from '../../assets/ad.png';

const Ad: FC = () => {
  return (
    <AdWrapper>
      <AdImg src={ad} alt='ad'/>
    </AdWrapper>
  );
};

export default Ad;
