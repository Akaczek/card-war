import { FC } from 'react';

import { AdWrapper, AdImg } from './Ad.styles';

const Ad: FC<{img: string}> = ({img}) => {
  return (
    <AdWrapper>
      <AdImg src={img} alt='ad'/>
    </AdWrapper>
  );
};

export default Ad;
