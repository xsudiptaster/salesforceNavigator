import { LoadingOverlay, Progress } from '@mantine/core';
import React from 'react';
import { useLoadingInfoStore } from '../../stores/stores';

interface ILoadingViewProps {
  children?: React.ReactNode;
}

const LoadingView: React.FC<ILoadingViewProps> = () => {
  const loadingInfo = useLoadingInfoStore((state: any) => state.loadingInfo);
  return (
    <LoadingOverlay
      visible={loadingInfo.loading}
      zIndex={1000}
      style={{ height: '100dvh !important' }}
      overlayProps={
        loadingInfo.showBar
          ? {
              children: (
                <Progress
                  radius="xl"
                  value={loadingInfo.value}
                  striped
                  animated
                />
              ),
            }
          : { radius: 'sm', blur: 2 }
      }
    />
  );
};

export default LoadingView;
