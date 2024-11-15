import React from 'react';

interface IRenderIfProps {
  children: React.ReactNode;
  rIf: boolean;
}

const RenderIf: React.FC<IRenderIfProps> = (props) => {
  const { rIf, children } = props;
  return <>{rIf ? children : null}</>;
};

export default RenderIf;
