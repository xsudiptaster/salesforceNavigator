import { Children } from 'react';

const EachElement: any = ({ render, of }: any) =>
  Children.toArray(
    of && of.length > 0
      ? of.map((item: any, index: any) => render(item, index))
      : [],
  );
export default EachElement;
